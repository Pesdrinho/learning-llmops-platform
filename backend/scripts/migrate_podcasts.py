"""
Script para migrar podcasts locais para o Firebase Storage
Uso: python -m scripts.migrate_podcasts
"""

import sys
import os
from pathlib import Path

# Adiciona o diretório pai ao path
sys.path.insert(0, str(Path(__file__).parent.parent))

from config.firebase import get_storage
from datetime import datetime
import asyncio


async def migrate_podcasts():
    """Migra arquivos de podcast para o Firebase Storage"""
    
    # Path para os arquivos locais
    podcasts_dir = Path(__file__).parent.parent.parent / 'public' / 'audio' / 'podcasts'
    
    if not podcasts_dir.exists():
        print(f"❌ Diretório não encontrado: {podcasts_dir}")
        return
    
    bucket = get_storage()
    
    # Lista arquivos MP3
    podcast_files = list(podcasts_dir.glob('*.mp3'))
    
    if not podcast_files:
        print("⚠️ Nenhum arquivo MP3 encontrado")
        return
    
    print(f"📦 Encontrados {len(podcast_files)} arquivos para migrar\n")
    
    for file_path in podcast_files:
        filename = file_path.name
        print(f"📤 Fazendo upload de {filename}...")
        
        try:
            # Lê o arquivo
            with open(file_path, 'rb') as f:
                file_data = f.read()
            
            # Define o path no Storage
            blob_path = f"podcasts/{filename}"
            blob = bucket.blob(blob_path)
            
            # Faz upload
            blob.upload_from_string(file_data, content_type='audio/mpeg')
            
            # Torna público
            blob.make_public()
            
            print(f"   ✅ URL: {blob.public_url}")
            print(f"   📊 Tamanho: {len(file_data) / 1024 / 1024:.2f} MB\n")
            
        except Exception as e:
            print(f"   ❌ Erro: {str(e)}\n")
    
    print("🎉 Migração concluída!")
    print("\n📝 Próximos passos:")
    print("1. Verifique os URLs no Firebase Storage Console")
    print("2. Atualize os episódios no Firestore com os novos URLs")
    print("3. Teste o player de áudio na plataforma")


if __name__ == "__main__":
    asyncio.run(migrate_podcasts())


