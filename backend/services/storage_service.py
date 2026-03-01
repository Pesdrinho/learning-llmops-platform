from config.firebase import get_storage
import uuid
from typing import Optional
import mimetypes


class StorageService:
    """Serviço para gerenciar uploads no Firebase Storage"""
    
    def __init__(self):
        self.bucket = get_storage()
    
    async def upload_file(
        self,
        file_data: bytes,
        filename: str,
        folder: str = '',
        content_type: Optional[str] = None
    ) -> str:
        """
        Faz upload de um arquivo para o Firebase Storage
        
        Args:
            file_data: Dados binários do arquivo
            filename: Nome do arquivo
            folder: Pasta de destino (ex: 'podcasts', 'images')
            content_type: Tipo MIME do arquivo
            
        Returns:
            URL pública do arquivo
        """
        # Gera um nome único para o arquivo
        file_extension = filename.split('.')[-1] if '.' in filename else ''
        unique_filename = f"{uuid.uuid4()}.{file_extension}" if file_extension else str(uuid.uuid4())
        
        # Define o path completo
        blob_path = f"{folder}/{unique_filename}" if folder else unique_filename
        
        # Cria blob
        blob = self.bucket.blob(blob_path)
        
        # Define content type se não fornecido
        if not content_type:
            content_type = mimetypes.guess_type(filename)[0] or 'application/octet-stream'
        
        # Upload
        blob.upload_from_string(file_data, content_type=content_type)
        
        # Torna público
        blob.make_public()
        
        return blob.public_url
    
    async def upload_podcast(
        self,
        file_data: bytes,
        slug: str,
        original_filename: str
    ) -> str:
        """
        Faz upload de um arquivo de podcast
        
        Args:
            file_data: Dados do arquivo MP3
            slug: Slug do podcast (usado como nome do arquivo)
            original_filename: Nome original do arquivo
            
        Returns:
            URL pública do arquivo
        """
        file_extension = original_filename.split('.')[-1]
        filename = f"{slug}.{file_extension}"
        
        return await self.upload_file(
            file_data=file_data,
            filename=filename,
            folder='podcasts',
            content_type='audio/mpeg'
        )
    
    async def upload_image(
        self,
        file_data: bytes,
        filename: str,
        subfolder: str = ''
    ) -> str:
        """
        Faz upload de uma imagem
        
        Args:
            file_data: Dados da imagem
            filename: Nome do arquivo
            subfolder: Subpasta dentro de 'images' (ex: 'blog', 'podcast')
            
        Returns:
            URL pública da imagem
        """
        folder = f"images/{subfolder}" if subfolder else "images"
        
        return await self.upload_file(
            file_data=file_data,
            filename=filename,
            folder=folder
        )
    
    async def delete_file(self, file_url: str) -> bool:
        """
        Remove um arquivo do Storage baseado na URL
        
        Args:
            file_url: URL pública do arquivo
            
        Returns:
            True se removido com sucesso
        """
        try:
            # Extrai o path do arquivo da URL
            # Formato: https://storage.googleapis.com/bucket-name/path/to/file
            parts = file_url.split(f"{self.bucket.name}/")
            if len(parts) < 2:
                return False
            
            file_path = parts[1]
            blob = self.bucket.blob(file_path)
            blob.delete()
            
            return True
        except Exception as e:
            print(f"Erro ao deletar arquivo: {e}")
            return False


# Instância global do serviço
storage_service = StorageService()


