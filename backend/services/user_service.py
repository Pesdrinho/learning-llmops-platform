from config.firebase import get_firestore, get_auth
from models.user import UserRole, UserCreate, UserUpdate, UserRoleUpdate
from datetime import datetime
from typing import List, Optional


class UserService:
    """Serviço para gerenciar usuários"""
    
    def __init__(self):
        self.db = get_firestore()
        self.auth = get_auth()
    
    async def get_user(self, uid: str) -> Optional[dict]:
        """Busca um usuário pelo UID"""
        doc = self.db.collection('users').document(uid).get()
        if doc.exists:
            data = doc.to_dict()
            data['uid'] = uid
            return data
        return None
    
    async def list_users(self, limit: int = 100) -> List[dict]:
        """Lista todos os usuários"""
        users = []
        
        # Lista usuários do Firebase Auth
        page = self.auth.list_users(max_results=limit)
        
        for user in page.users:
            # Busca dados adicionais do Firestore
            user_doc = self.db.collection('users').document(user.uid).get()
            
            user_data = {
                'uid': user.uid,
                'email': user.email,
                'display_name': user.display_name,
                'role': UserRole.USER,
                'created_at': user.user_metadata.creation_timestamp
            }
            
            if user_doc.exists:
                firestore_data = user_doc.to_dict()
                user_data['role'] = firestore_data.get('role', UserRole.USER)
                user_data['created_at'] = firestore_data.get('created_at', user_data['created_at'])
            
            users.append(user_data)
        
        return users
    
    async def create_user_profile(self, uid: str, user_data: UserCreate) -> dict:
        """Cria perfil do usuário no Firestore"""
        profile_data = {
            'email': user_data.email,
            'display_name': user_data.display_name,
            'role': user_data.role,
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        self.db.collection('users').document(uid).set(profile_data)
        
        return {
            'uid': uid,
            **profile_data
        }
    
    async def update_user(self, uid: str, user_data: UserUpdate) -> dict:
        """Atualiza dados do usuário"""
        update_data = {}
        
        if user_data.display_name is not None:
            update_data['display_name'] = user_data.display_name
        
        if user_data.role is not None:
            update_data['role'] = user_data.role
        
        update_data['updated_at'] = datetime.utcnow().isoformat()
        
        self.db.collection('users').document(uid).update(update_data)
        
        return await self.get_user(uid)
    
    async def update_user_role(self, uid: str, role: UserRole) -> dict:
        """Atualiza apenas a role do usuário"""
        update_data = {
            'role': role,
            'updated_at': datetime.utcnow().isoformat()
        }
        
        # Verifica se o documento existe, se não, cria
        doc = self.db.collection('users').document(uid).get()
        
        if not doc.exists:
            # Busca info do Auth para criar perfil
            try:
                user = self.auth.get_user(uid)
                update_data['email'] = user.email
                update_data['display_name'] = user.display_name
                update_data['created_at'] = datetime.utcnow().isoformat()
                self.db.collection('users').document(uid).set(update_data)
            except Exception as e:
                raise Exception(f"Usuário não encontrado: {str(e)}")
        else:
            self.db.collection('users').document(uid).update(update_data)
        
        return await self.get_user(uid)
    
    async def delete_user(self, uid: str) -> bool:
        """Remove usuário (apenas do Firestore, não do Auth)"""
        self.db.collection('users').document(uid).delete()
        return True


# Instância global do serviço
user_service = UserService()


