from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from typing import List, Optional
from models.podcast import PodcastCreate, PodcastUpdate, PodcastResponse
from services.podcast_service import podcast_service
from services.storage_service import storage_service
from middleware.auth import require_editor, require_admin
import json


router = APIRouter(prefix="/api/podcasts", tags=["podcasts"])


@router.get("/", response_model=List[PodcastResponse])
async def list_podcasts(limit: int = 100):
    """Lista todos os episódios (público)"""
    podcasts = await podcast_service.list_podcasts(limit=limit)
    return [PodcastResponse(**podcast) for podcast in podcasts]


@router.get("/{podcast_id}", response_model=PodcastResponse)
async def get_podcast(podcast_id: str):
    """Busca um episódio específico (público)"""
    podcast = await podcast_service.get_podcast(podcast_id)
    
    if not podcast:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Episódio não encontrado"
        )
    
    return PodcastResponse(**podcast)


@router.get("/slug/{slug}", response_model=PodcastResponse)
async def get_podcast_by_slug(slug: str):
    """Busca um episódio pelo slug (público)"""
    podcast = await podcast_service.get_podcast_by_slug(slug)
    
    if not podcast:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Episódio não encontrado"
        )
    
    return PodcastResponse(**podcast)


@router.post("/", response_model=PodcastResponse, status_code=status.HTTP_201_CREATED)
async def create_podcast(
    audio_file: UploadFile = File(...),
    podcast_data: str = Form(...),
    current_user: dict = Depends(require_editor)
):
    """
    Cria um novo episódio com upload de áudio (apenas editor/admin)
    podcast_data deve ser uma string JSON com os dados do episódio
    """
    try:
        # Parse dos dados do podcast
        podcast_dict = json.loads(podcast_data)
        podcast_obj = PodcastCreate(**podcast_dict)
        
        # Validar arquivo de áudio
        if not audio_file.content_type.startswith('audio/'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Apenas arquivos de áudio são permitidos"
            )
        
        # Upload do áudio
        file_data = await audio_file.read()
        if len(file_data) > 500 * 1024 * 1024:  # 500MB
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Arquivo muito grande. Máximo: 500MB"
            )
        
        audio_url = await storage_service.upload_podcast(
            file_data=file_data,
            slug=podcast_obj.slug,
            original_filename=audio_file.filename
        )
        
        # Cria episódio
        podcast = await podcast_service.create_podcast(podcast_obj, audio_url)
        return PodcastResponse(**podcast)
    
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dados do podcast inválidos (JSON)"
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao criar episódio: {str(e)}"
        )


@router.put("/{podcast_id}", response_model=PodcastResponse)
async def update_podcast(
    podcast_id: str,
    podcast_data: str = Form(...),
    audio_file: Optional[UploadFile] = File(None),
    current_user: dict = Depends(require_editor)
):
    """
    Atualiza um episódio existente (apenas editor/admin)
    Se audio_file for fornecido, faz novo upload
    """
    try:
        # Parse dos dados do podcast
        podcast_dict = json.loads(podcast_data)
        podcast_obj = PodcastUpdate(**podcast_dict)
        
        audio_url = None
        
        # Se forneceu novo áudio, faz upload
        if audio_file:
            if not audio_file.content_type.startswith('audio/'):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Apenas arquivos de áudio são permitidos"
                )
            
            file_data = await audio_file.read()
            if len(file_data) > 500 * 1024 * 1024:  # 500MB
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Arquivo muito grande. Máximo: 500MB"
                )
            
            # Usa o slug atualizado ou o existente
            existing = await podcast_service.get_podcast(podcast_id)
            slug_to_use = podcast_obj.slug or existing.get('slug')
            
            audio_url = await storage_service.upload_podcast(
                file_data=file_data,
                slug=slug_to_use,
                original_filename=audio_file.filename
            )
        
        # Atualiza episódio
        podcast = await podcast_service.update_podcast(podcast_id, podcast_obj, audio_url)
        return PodcastResponse(**podcast)
    
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dados do podcast inválidos (JSON)"
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao atualizar episódio: {str(e)}"
        )


@router.delete("/{podcast_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_podcast(
    podcast_id: str,
    current_user: dict = Depends(require_admin)
):
    """Remove um episódio (apenas admin)"""
    try:
        await podcast_service.delete_podcast(podcast_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao deletar episódio: {str(e)}"
        )


