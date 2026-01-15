from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum


class UserRole(str, Enum):
    """Roles disponíveis para usuários"""
    USER = "user"
    EDITOR = "editor"
    ADMIN = "admin"


class UserBase(BaseModel):
    """Modelo base de usuário"""
    email: EmailStr
    display_name: Optional[str] = None
    role: UserRole = UserRole.USER


class UserCreate(UserBase):
    """Modelo para criação de usuário"""
    pass


class UserUpdate(BaseModel):
    """Modelo para atualização de usuário"""
    display_name: Optional[str] = None
    role: Optional[UserRole] = None


class UserResponse(UserBase):
    """Modelo de resposta de usuário"""
    uid: str
    created_at: Optional[str] = None
    
    class Config:
        from_attributes = True


class UserRoleUpdate(BaseModel):
    """Modelo para atualizar role de usuário"""
    role: UserRole


