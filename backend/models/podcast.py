from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List


class PodcastConvidado(BaseModel):
    """Modelo de convidado do podcast"""
    nome: str
    cargo: str
    empresa: Optional[str] = None
    linkedin: Optional[str] = None


class PodcastAudiencia(BaseModel):
    """Modelo de audiência do podcast"""
    publico_alvo: str
    objetivos_aprendizado: List[str]
    tempo_estimado: str


class PodcastNota(BaseModel):
    """Modelo de nota/timestamp do podcast"""
    tempo: str
    descricao: str


class PodcastRecurso(BaseModel):
    """Modelo de recurso relacionado"""
    titulo: str
    link: str
    tipo: str


class PodcastBase(BaseModel):
    """Modelo base de episódio de podcast"""
    slug: str = Field(..., min_length=1)
    numero: int = Field(..., gt=0)
    titulo: str = Field(..., min_length=1)
    descricao: str = Field(..., min_length=1)
    data: str
    duracao: str = Field(..., pattern=r'^\d+:\d{2}$')
    temas: List[str]
    convidado: PodcastConvidado
    thumbnail: str
    audiencia: PodcastAudiencia
    notas: List[PodcastNota] = Field(default_factory=list)
    recursos_relacionados: List[PodcastRecurso] = Field(default_factory=list)


class PodcastCreate(PodcastBase):
    """Modelo para criação de podcast"""
    pass


class PodcastUpdate(BaseModel):
    """Modelo para atualização de podcast"""
    slug: Optional[str] = None
    numero: Optional[int] = None
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    data: Optional[str] = None
    duracao: Optional[str] = None
    temas: Optional[List[str]] = None
    convidado: Optional[PodcastConvidado] = None
    thumbnail: Optional[str] = None
    audiencia: Optional[PodcastAudiencia] = None
    notas: Optional[List[PodcastNota]] = None
    recursos_relacionados: Optional[List[PodcastRecurso]] = None


class PodcastResponse(PodcastBase):
    """Modelo de resposta de podcast"""
    id: str
    audio_url: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    
    class Config:
        from_attributes = True


class PodcastUploadResponse(BaseModel):
    """Resposta de upload de áudio"""
    audio_url: str
    message: str


