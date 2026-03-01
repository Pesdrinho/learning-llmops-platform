from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class BlogPostBase(BaseModel):
    """Modelo base de post do blog"""
    titulo: str = Field(..., min_length=1, max_length=200)
    slug: str = Field(..., min_length=1, max_length=200)
    descricao: str = Field(..., min_length=1, max_length=500)
    conteudo: str = Field(..., min_length=1)
    tags: List[str] = Field(default_factory=list)
    imagem_capa: str
    autor: str
    tempo_leitura: str = Field(..., pattern=r'^\d+\s+min$')
    publico_alvo: str
    dificuldade: str


class BlogPostCreate(BlogPostBase):
    """Modelo para criação de post"""
    pass


class BlogPostUpdate(BaseModel):
    """Modelo para atualização de post"""
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    slug: Optional[str] = Field(None, min_length=1, max_length=200)
    descricao: Optional[str] = Field(None, min_length=1, max_length=500)
    conteudo: Optional[str] = Field(None, min_length=1)
    tags: Optional[List[str]] = None
    imagem_capa: Optional[str] = None
    autor: Optional[str] = None
    tempo_leitura: Optional[str] = Field(None, pattern=r'^\d+\s+min$')
    publico_alvo: Optional[str] = None
    dificuldade: Optional[str] = None


class BlogPostResponse(BlogPostBase):
    """Modelo de resposta de post"""
    id: str
    data: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    
    class Config:
        from_attributes = True


