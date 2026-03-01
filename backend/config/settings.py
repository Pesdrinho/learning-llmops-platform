from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Configurações da aplicação"""
    
    # Firebase
    firebase_admin_key_path: str = "./firebase-admin-key.json"
    
    # API
    port: int = 8000
    host: str = "0.0.0.0"
    
    # CORS
    frontend_url: str = "http://localhost:5173"
    
    # Environment
    environment: str = "development"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()


