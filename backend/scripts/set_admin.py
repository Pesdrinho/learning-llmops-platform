"""
Script para definir um usuário como admin
Uso: python -m scripts.set_admin email@exemplo.com
"""

import sys
import os
from pathlib import Path

# Adiciona o diretório pai ao path
sys.path.insert(0, str(Path(__file__).parent.parent))

from config.firebase import get_firestore, get_auth
from models.user import UserRole
from datetime import datetime


def set_user_admin(email: str):
    """Define um usuário como admin baseado no email"""
    try:
        auth = get_auth()
        db = get_firestore()
        
        # Busca usuário por email
        user = auth.get_user_by_email(email)
        uid = user.uid
        
        print(f"📧 Usuário encontrado: {email} (UID: {uid})")
        
        # Verifica se já existe no Firestore
        user_doc = db.collection('users').document(uid).get()
        
        if user_doc.exists:
            # Atualiza role existente
            db.collection('users').document(uid).update({
                'role': UserRole.ADMIN,
                'updated_at': datetime.utcnow().isoformat()
            })
            print(f"✅ Role atualizada para ADMIN")
        else:
            # Cria novo documento
            db.collection('users').document(uid).set({
                'email': email,
                'display_name': user.display_name or email.split('@')[0],
                'role': UserRole.ADMIN,
                'created_at': datetime.utcnow().isoformat(),
                'updated_at': datetime.utcnow().isoformat()
            })
            print(f"✅ Perfil criado com role ADMIN")
        
        print(f"\n🎉 {email} agora é ADMIN!")
        
    except Exception as e:
        print(f"❌ Erro: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python -m scripts.set_admin email@exemplo.com")
        sys.exit(1)
    
    email = sys.argv[1]
    set_user_admin(email)


