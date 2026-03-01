from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models.user import UserResponse, UserRoleUpdate, UserRole
from services.user_service import user_service
from middleware.auth import get_current_user, require_admin


router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Retorna informações do usuário autenticado"""
    user_data = await user_service.get_user(current_user['uid'])
    
    if not user_data:
        # Se não existe no Firestore, cria perfil básico
        user_data = {
            'uid': current_user['uid'],
            'email': current_user['email'],
            'display_name': current_user.get('display_name'),
            'role': current_user.get('role', UserRole.USER)
        }
    
    return UserResponse(**user_data)


@router.get("/", response_model=List[UserResponse])
async def list_users(
    current_user: dict = Depends(require_admin),
    limit: int = 100
):
    """Lista todos os usuários (apenas admin)"""
    users = await user_service.list_users(limit=limit)
    return [UserResponse(**user) for user in users]


@router.get("/{uid}", response_model=UserResponse)
async def get_user(
    uid: str,
    current_user: dict = Depends(require_admin)
):
    """Busca um usuário específico (apenas admin)"""
    user = await user_service.get_user(uid)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    return UserResponse(**user)


@router.patch("/{uid}/role", response_model=UserResponse)
async def update_user_role(
    uid: str,
    role_update: UserRoleUpdate,
    current_user: dict = Depends(require_admin)
):
    """Atualiza a role de um usuário (apenas admin)"""
    try:
        user = await user_service.update_user_role(uid, role_update.role)
        return UserResponse(**user)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


