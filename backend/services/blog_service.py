from config.firebase import get_firestore
from models.blog import BlogPostCreate, BlogPostUpdate
from datetime import datetime
from typing import List, Optional


class BlogService:
    """Serviço para gerenciar posts do blog"""
    
    def __init__(self):
        self.db = get_firestore()
        self.collection = 'blog_posts'
    
    async def list_posts(self, limit: int = 100) -> List[dict]:
        """Lista todos os posts do blog"""
        posts = []
        docs = self.db.collection(self.collection).limit(limit).stream()
        
        for doc in docs:
            post_data = doc.to_dict()
            post_data['id'] = doc.id
            posts.append(post_data)
        
        # Ordena por data (mais recentes primeiro)
        posts.sort(key=lambda x: x.get('data', ''), reverse=True)
        
        return posts
    
    async def get_post(self, post_id: str) -> Optional[dict]:
        """Busca um post específico"""
        doc = self.db.collection(self.collection).document(post_id).get()
        
        if doc.exists:
            post_data = doc.to_dict()
            post_data['id'] = doc.id
            return post_data
        
        return None
    
    async def get_post_by_slug(self, slug: str) -> Optional[dict]:
        """Busca um post pelo slug"""
        docs = self.db.collection(self.collection).where('slug', '==', slug).limit(1).stream()
        
        for doc in docs:
            post_data = doc.to_dict()
            post_data['id'] = doc.id
            return post_data
        
        return None
    
    async def create_post(self, post_data: BlogPostCreate) -> dict:
        """Cria um novo post"""
        # Verifica se o slug já existe
        existing = await self.get_post_by_slug(post_data.slug)
        if existing:
            raise ValueError(f"Já existe um post com o slug '{post_data.slug}'")
        
        # Prepara dados
        post_dict = post_data.model_dump()
        post_dict['data'] = datetime.utcnow().strftime('%Y-%m-%d')
        post_dict['created_at'] = datetime.utcnow().isoformat()
        post_dict['updated_at'] = datetime.utcnow().isoformat()
        
        # Cria documento
        doc_ref = self.db.collection(self.collection).document()
        doc_ref.set(post_dict)
        
        post_dict['id'] = doc_ref.id
        return post_dict
    
    async def update_post(self, post_id: str, post_data: BlogPostUpdate) -> dict:
        """Atualiza um post existente"""
        # Verifica se existe
        existing = await self.get_post(post_id)
        if not existing:
            raise ValueError(f"Post não encontrado: {post_id}")
        
        # Verifica slug duplicado se estiver sendo alterado
        if post_data.slug and post_data.slug != existing.get('slug'):
            slug_check = await self.get_post_by_slug(post_data.slug)
            if slug_check:
                raise ValueError(f"Já existe um post com o slug '{post_data.slug}'")
        
        # Prepara dados para atualização
        update_dict = post_data.model_dump(exclude_unset=True)
        update_dict['updated_at'] = datetime.utcnow().isoformat()
        
        # Atualiza
        self.db.collection(self.collection).document(post_id).update(update_dict)
        
        return await self.get_post(post_id)
    
    async def delete_post(self, post_id: str) -> bool:
        """Remove um post"""
        # Verifica se existe
        existing = await self.get_post(post_id)
        if not existing:
            raise ValueError(f"Post não encontrado: {post_id}")
        
        self.db.collection(self.collection).document(post_id).delete()
        return True


# Instância global do serviço
blog_service = BlogService()


