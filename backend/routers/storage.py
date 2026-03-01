from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from services.storage_service import storage_service
from middleware.auth import require_editor
from typing import Optional


router = APIRouter(prefix="/api/storage", tags=["storage"])


@router.post("/upload/podcast")
async def upload_podcast_audio(
    file: UploadFile = File(...),
    slug: str = None,
    current_user: dict = Depends(require_editor)
):
    """
    Faz upload de um arquivo de áudio para podcast (apenas editor/admin)
    """
    # Validar tipo de arquivo
    if not file.content_type.startswith('audio/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Apenas arquivos de áudio são permitidos"
        )
    
    # Validar tamanho (máx 500MB)
    file_data = await file.read()
    if len(file_data) > 500 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Arquivo muito grande. Máximo: 500MB"
        )
    
    # Usa slug ou nome do arquivo
    podcast_slug = slug or file.filename.split('.')[0]
    
    try:
        audio_url = await storage_service.upload_podcast(
            file_data=file_data,
            slug=podcast_slug,
            original_filename=file.filename
        )
        
        return {
            "audio_url": audio_url,
            "message": "Upload realizado com sucesso",
            "slug": podcast_slug
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao fazer upload: {str(e)}"
        )


@router.post("/upload/image")
async def upload_image(
    file: UploadFile = File(...),
    subfolder: Optional[str] = None,
    current_user: dict = Depends(require_editor)
):
    """
    Faz upload de uma imagem (apenas editor/admin)
    """
    # Validar tipo de arquivo
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Apenas arquivos de imagem são permitidos"
        )
    
    # Validar tamanho (máx 10MB)
    file_data = await file.read()
    if len(file_data) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Arquivo muito grande. Máximo: 10MB"
        )
    
    try:
        image_url = await storage_service.upload_image(
            file_data=file_data,
            filename=file.filename,
            subfolder=subfolder or ''
        )
        
        return {
            "image_url": image_url,
            "message": "Upload realizado com sucesso"
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao fazer upload: {str(e)}"
        )


@router.post("/upload/generic")
async def upload_generic_file(
    file: UploadFile = File(...),
    folder: Optional[str] = None,
    current_user: dict = Depends(require_editor)
):
    """
    Faz upload de um arquivo genérico (apenas editor/admin)
    """
    # Validar tamanho (máx 100MB)
    file_data = await file.read()
    if len(file_data) > 100 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Arquivo muito grande. Máximo: 100MB"
        )
    
    try:
        file_url = await storage_service.upload_file(
            file_data=file_data,
            filename=file.filename,
            folder=folder or 'uploads'
        )
        
        return {
            "file_url": file_url,
            "message": "Upload realizado com sucesso"
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao fazer upload: {str(e)}"
        )


