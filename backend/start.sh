#!/bin/bash

# Script para iniciar o backend em desenvolvimento

echo "🚀 Iniciando backend LLMOps Platform..."

# Verifica se o arquivo .env existe
if [ ! -f ".env" ]; then
    echo "⚠️  Arquivo .env não encontrado!"
    echo "📝 Copiando .env.example para .env..."
    cp .env.example .env
    echo "✅ Arquivo .env criado. Por favor, configure as variáveis de ambiente."
    exit 1
fi

# Verifica se o arquivo de credenciais do Firebase existe
if [ ! -f "firebase-admin-key.json" ]; then
    echo "❌ Arquivo firebase-admin-key.json não encontrado!"
    echo "📖 Por favor, baixe as credenciais do Firebase Console e salve como firebase-admin-key.json"
    exit 1
fi

# Verifica se o Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 não está instalado!"
    exit 1
fi

# Verifica se as dependências estão instaladas
if [ ! -d "venv" ]; then
    echo "📦 Criando ambiente virtual..."
    python3 -m venv venv
fi

echo "📦 Ativando ambiente virtual..."
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null

echo "📦 Instalando dependências..."
pip install -r requirements.txt

echo "✅ Backend pronto!"
echo "🌐 Iniciando servidor em http://localhost:8000"
echo ""

# Inicia o servidor com reload automático
uvicorn main:app --reload --host 0.0.0.0 --port 8000


