from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from config.firebase import get_auth, get_firestore
from models.user import UserRole


security = HTTPBearer()


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    Verifica o token Firebase e retorna informações do usuário
    """
    try:
        token = credentials.credentials
        auth_service = get_auth()
        
        # Verifica o token
        decoded_token = auth_service.verify_id_token(token)
        uid = decoded_token['uid']
        
        # Busca informações adicionais do usuário no Firestore
        db = get_firestore()
        user_doc = db.collection('users').document(uid).get()
        
        user_data = {
            'uid': uid,
            'email': decoded_token.get('email'),
            'role': UserRole.USER  # Default
        }
        
        if user_doc.exists:
            user_info = user_doc.to_dict()
            user_data['role'] = user_info.get('role', UserRole.USER)
            user_data['display_name'] = user_info.get('display_name')
        
        return user_data
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token inválido ou expirado: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def require_role(
    required_role: UserRole,
    user: dict = Depends(get_current_user)
) -> dict:
    """
    Verifica se o usuário possui a role necessária
    """
    user_role = user.get('role')
    
    # Hierarquia de roles: admin > editor > user
    role_hierarchy = {
        UserRole.USER: 1,
        UserRole.EDITOR: 2,
        UserRole.ADMIN: 3
    }
    
    if role_hierarchy.get(user_role, 0) < role_hierarchy.get(required_role, 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Permissão negada. Role necessária: {required_role}"
        )
    
    return user


def require_editor(user: dict = Depends(get_current_user)) -> dict:
    """Requer role de editor ou superior"""
    return require_role(UserRole.EDITOR, user)


def require_admin(user: dict = Depends(get_current_user)) -> dict:
    """Requer role de admin"""
    return require_role(UserRole.ADMIN, user)


