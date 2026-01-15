# Configuração do Backend - LLMOps Platform

Este guia detalha todos os passos necessários para configurar e executar o backend da plataforma.

## Arquitetura

- **Backend**: FastAPI (Python)
- **Autenticação**: Firebase Auth
- **Banco de Dados**: Firestore
- **Storage**: Firebase Storage
- **Deploy**: Docker + Docker Compose

## Pré-requisitos

- Python 3.11 ou superior
- Node.js 18 ou superior (para o frontend)
- Conta Firebase com projeto configurado
- Docker e Docker Compose (opcional, para deploy)

## 1. Configuração do Firebase

### 1.1 Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative **Authentication**, **Firestore** e **Storage**

### 1.2 Baixar Credenciais do Admin SDK

1. No Firebase Console, vá em **Project Settings** → **Service Accounts**
2. Clique em **Generate New Private Key**
3. Salve o arquivo JSON como `backend/firebase-admin-key.json`
4. **IMPORTANTE**: Adicione este arquivo ao `.gitignore` (já está configurado)

### 1.3 Configurar Storage Bucket

No Firebase Console → Storage:
1. Ative o Firebase Storage
2. Anote o nome do bucket (geralmente `[PROJECT_ID].appspot.com`)
3. Configure as regras de segurança (arquivo `backend/storage.rules`)

```bash
# Deploy das Storage Rules
firebase deploy --only storage
```

### 1.4 Deploy das Firestore Rules

```bash
# Deploy das Firestore Rules
firebase deploy --only firestore:rules
```

## 2. Configuração do Backend

### 2.1 Criar Arquivo de Ambiente

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env`:

```env
FIREBASE_ADMIN_KEY_PATH=./firebase-admin-key.json
FRONTEND_URL=http://localhost:5173
PORT=8000
ENVIRONMENT=development
```

### 2.2 Instalar Dependências

**Opção 1: Usando venv (recomendado para desenvolvimento)**

```bash
python3 -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Opção 2: Usando o script automático**

```bash
chmod +x start.sh
./start.sh
```

### 2.3 Iniciar o Backend

**Desenvolvimento:**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Ou use o script:

```bash
./start.sh
```

**Produção (Docker):**

```bash
# Na raiz do projeto
docker-compose up -d backend
```

## 3. Configuração do Frontend

### 3.1 Criar Arquivo de Ambiente

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
# Firebase Configuration (Frontend)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API URL
VITE_API_URL=http://localhost:8000
```

Você pode encontrar essas informações no Firebase Console → Project Settings → General.

### 3.2 Iniciar Frontend

```bash
npm install
npm run dev
```

## 4. Configurar Primeiro Usuário Admin

Após cadastrar um usuário na plataforma, defina-o como admin:

```bash
cd backend
python -m scripts.set_admin seu-email@exemplo.com
```

## 5. Migrar Podcasts para Firebase Storage

Se você tem podcasts locais em `public/audio/podcasts/`:

```bash
cd backend
python -m scripts.migrate_podcasts
```

Este script irá:
- Fazer upload dos arquivos MP3 para o Firebase Storage
- Exibir as URLs públicas para atualização no Firestore

## 6. Deploy em Produção

### 6.1 Usando Docker Compose

```bash
# Build e iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### 6.2 Build Manual

**Backend:**

```bash
cd backend
docker build -t llmops-backend .
docker run -p 8000:8000 --env-file .env llmops-backend
```

**Frontend:**

```bash
npm run build
# Servir a pasta 'dist' com nginx ou outro servidor web
```

## 7. Endpoints da API

Com o backend rodando, acesse a documentação interativa:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Principais Endpoints

#### Usuários
- `GET /api/users/me` - Info do usuário atual
- `GET /api/users` - Listar usuários (admin)
- `PATCH /api/users/{uid}/role` - Atualizar role (admin)

#### Blog
- `GET /api/blog` - Listar posts
- `POST /api/blog` - Criar post (editor/admin)
- `PUT /api/blog/{id}` - Editar post (editor/admin)
- `DELETE /api/blog/{id}` - Deletar post (admin)

#### Podcasts
- `GET /api/podcasts` - Listar episódios
- `POST /api/podcasts` - Criar episódio com upload (editor/admin)
- `PUT /api/podcasts/{id}` - Editar episódio (editor/admin)
- `DELETE /api/podcasts/{id}` - Deletar episódio (admin)

#### Storage
- `POST /api/storage/upload/podcast` - Upload de áudio (editor/admin)
- `POST /api/storage/upload/image` - Upload de imagem (editor/admin)

## 8. Solução de Problemas

### Erro: "Firebase não inicializado"

- Verifique se o arquivo `firebase-admin-key.json` existe
- Confirme que o path no `.env` está correto
- Verifique as permissões do arquivo

### Erro: "CORS policy"

- Certifique-se que `FRONTEND_URL` no `.env` do backend está correto
- Reinicie o backend após alterar configurações

### Erro: "Permission denied" no Firestore

- Faça deploy das rules: `firebase deploy --only firestore:rules`
- Verifique se o usuário tem a role correta no documento `/users/{uid}`

### Podcasts não reproduzem

- Verifique se os arquivos estão no Firebase Storage
- Execute o script de migração: `python -m scripts.migrate_podcasts`
- Confirme que as URLs no Firestore estão corretas

## 9. Estrutura de Diretórios

```
backend/
├── config/           # Configurações (Firebase, settings)
├── middleware/       # Auth middleware
├── models/          # Modelos Pydantic
├── routers/         # Endpoints da API
├── services/        # Lógica de negócio
├── scripts/         # Scripts utilitários
├── main.py          # Aplicação FastAPI
├── requirements.txt # Dependências Python
└── Dockerfile       # Container Docker
```

## 10. Próximos Passos

1. ✅ Configure o Firebase e credenciais
2. ✅ Inicie o backend
3. ✅ Configure o primeiro usuário admin
4. ✅ Teste os endpoints na documentação Swagger
5. ✅ Migre podcasts para o Storage
6. ✅ Acesse o painel admin em `/admin`

## Suporte

Se encontrar problemas, verifique:
- Logs do backend: `docker-compose logs backend`
- Console do Firebase para erros de autenticação
- Network tab do navegador para erros de API


