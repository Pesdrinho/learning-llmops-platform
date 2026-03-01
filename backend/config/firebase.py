import firebase_admin
from firebase_admin import credentials, firestore, storage, auth
from .settings import settings
import os


def initialize_firebase():
    """Inicializa Firebase Admin SDK"""
    try:
        if not firebase_admin._apps:
            key_path = settings.firebase_admin_key_path
            
            if not os.path.exists(key_path):
                raise FileNotFoundError(
                    f"Arquivo de credenciais do Firebase não encontrado: {key_path}"
                )
            
            cred = credentials.Certificate(key_path)
            firebase_admin.initialize_app(cred, {
                'storageBucket': 'learning-llmops-platform.appspot.com'
            })
            
            print("✅ Firebase Admin SDK inicializado com sucesso")
        
        return {
            'db': firestore.client(),
            'bucket': storage.bucket(),
            'auth': auth
        }
    
    except Exception as e:
        print(f"❌ Erro ao inicializar Firebase: {e}")
        raise


# Instâncias globais
firebase_services = None


def get_firebase_services():
    """Retorna instâncias dos serviços Firebase"""
    global firebase_services
    if firebase_services is None:
        firebase_services = initialize_firebase()
    return firebase_services


def get_firestore():
    """Retorna instância do Firestore"""
    return get_firebase_services()['db']


def get_storage():
    """Retorna instância do Storage"""
    return get_firebase_services()['bucket']


def get_auth():
    """Retorna instância do Auth"""
    return get_firebase_services()['auth']


