from config.firebase import get_firestore
from models.podcast import PodcastCreate, PodcastUpdate
from datetime import datetime
from typing import List, Optional


class PodcastService:
    """Serviço para gerenciar episódios de podcast"""
    
    def __init__(self):
        self.db = get_firestore()
        self.collection = 'podcasts'
    
    async def list_podcasts(self, limit: int = 100) -> List[dict]:
        """Lista todos os episódios"""
        podcasts = []
        docs = self.db.collection(self.collection).limit(limit).stream()
        
        for doc in docs:
            podcast_data = doc.to_dict()
            podcast_data['id'] = doc.id
            podcasts.append(podcast_data)
        
        # Ordena por número (mais recentes primeiro)
        podcasts.sort(key=lambda x: x.get('numero', 0), reverse=True)
        
        return podcasts
    
    async def get_podcast(self, podcast_id: str) -> Optional[dict]:
        """Busca um episódio específico"""
        doc = self.db.collection(self.collection).document(podcast_id).get()
        
        if doc.exists:
            podcast_data = doc.to_dict()
            podcast_data['id'] = doc.id
            return podcast_data
        
        return None
    
    async def get_podcast_by_slug(self, slug: str) -> Optional[dict]:
        """Busca um episódio pelo slug"""
        docs = self.db.collection(self.collection).where('slug', '==', slug).limit(1).stream()
        
        for doc in docs:
            podcast_data = doc.to_dict()
            podcast_data['id'] = doc.id
            return podcast_data
        
        return None
    
    async def get_podcast_by_numero(self, numero: int) -> Optional[dict]:
        """Busca um episódio pelo número"""
        docs = self.db.collection(self.collection).where('numero', '==', numero).limit(1).stream()
        
        for doc in docs:
            podcast_data = doc.to_dict()
            podcast_data['id'] = doc.id
            return podcast_data
        
        return None
    
    async def create_podcast(self, podcast_data: PodcastCreate, audio_url: str) -> dict:
        """Cria um novo episódio"""
        # Verifica se o slug já existe
        existing = await self.get_podcast_by_slug(podcast_data.slug)
        if existing:
            raise ValueError(f"Já existe um episódio com o slug '{podcast_data.slug}'")
        
        # Verifica se o número já existe
        existing_numero = await self.get_podcast_by_numero(podcast_data.numero)
        if existing_numero:
            raise ValueError(f"Já existe um episódio com o número {podcast_data.numero}")
        
        # Prepara dados
        podcast_dict = podcast_data.model_dump()
        podcast_dict['audio_url'] = audio_url
        podcast_dict['created_at'] = datetime.utcnow().isoformat()
        podcast_dict['updated_at'] = datetime.utcnow().isoformat()
        
        # Cria documento
        doc_ref = self.db.collection(self.collection).document()
        doc_ref.set(podcast_dict)
        
        podcast_dict['id'] = doc_ref.id
        return podcast_dict
    
    async def update_podcast(
        self,
        podcast_id: str,
        podcast_data: PodcastUpdate,
        audio_url: Optional[str] = None
    ) -> dict:
        """Atualiza um episódio existente"""
        # Verifica se existe
        existing = await self.get_podcast(podcast_id)
        if not existing:
            raise ValueError(f"Episódio não encontrado: {podcast_id}")
        
        # Verifica slug duplicado se estiver sendo alterado
        if podcast_data.slug and podcast_data.slug != existing.get('slug'):
            slug_check = await self.get_podcast_by_slug(podcast_data.slug)
            if slug_check:
                raise ValueError(f"Já existe um episódio com o slug '{podcast_data.slug}'")
        
        # Verifica número duplicado se estiver sendo alterado
        if podcast_data.numero and podcast_data.numero != existing.get('numero'):
            numero_check = await self.get_podcast_by_numero(podcast_data.numero)
            if numero_check:
                raise ValueError(f"Já existe um episódio com o número {podcast_data.numero}")
        
        # Prepara dados para atualização
        update_dict = podcast_data.model_dump(exclude_unset=True)
        
        if audio_url:
            update_dict['audio_url'] = audio_url
        
        update_dict['updated_at'] = datetime.utcnow().isoformat()
        
        # Atualiza
        self.db.collection(self.collection).document(podcast_id).update(update_dict)
        
        return await self.get_podcast(podcast_id)
    
    async def delete_podcast(self, podcast_id: str) -> bool:
        """Remove um episódio"""
        # Verifica se existe
        existing = await self.get_podcast(podcast_id)
        if not existing:
            raise ValueError(f"Episódio não encontrado: {podcast_id}")
        
        self.db.collection(self.collection).document(podcast_id).delete()
        return True


# Instância global do serviço
podcast_service = PodcastService()


