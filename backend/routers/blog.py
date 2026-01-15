from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse
from services.blog_service import blog_service
from middleware.auth import get_current_user, require_editor, require_admin


router = APIRouter(prefix="/api/blog", tags=["blog"])


@router.get("/", response_model=List[BlogPostResponse])
async def list_posts(limit: int = 100):
    """Lista todos os posts do blog (público)"""
    posts = await blog_service.list_posts(limit=limit)
    return [BlogPostResponse(**post) for post in posts]


@router.get("/{post_id}", response_model=BlogPostResponse)
async def get_post(post_id: str):
    """Busca um post específico (público)"""
    post = await blog_service.get_post(post_id)
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post não encontrado"
        )
    
    return BlogPostResponse(**post)


@router.get("/slug/{slug}", response_model=BlogPostResponse)
async def get_post_by_slug(slug: str):
    """Busca um post pelo slug (público)"""
    post = await blog_service.get_post_by_slug(slug)
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post não encontrado"
        )
    
    return BlogPostResponse(**post)


@router.post("/", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    post_data: BlogPostCreate,
    current_user: dict = Depends(require_editor)
):
    """Cria um novo post (apenas editor/admin)"""
    try:
        post = await blog_service.create_post(post_data)
        return BlogPostResponse(**post)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao criar post: {str(e)}"
        )


@router.put("/{post_id}", response_model=BlogPostResponse)
async def update_post(
    post_id: str,
    post_data: BlogPostUpdate,
    current_user: dict = Depends(require_editor)
):
    """Atualiza um post existente (apenas editor/admin)"""
    try:
        post = await blog_service.update_post(post_id, post_data)
        return BlogPostResponse(**post)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao atualizar post: {str(e)}"
        )


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    post_id: str,
    current_user: dict = Depends(require_admin)
):
    """Remove um post (apenas admin)"""
    try:
        await blog_service.delete_post(post_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao deletar post: {str(e)}"
        )


