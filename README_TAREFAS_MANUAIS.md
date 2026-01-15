# Tarefas Manuais - Checklist de Implementação

Este documento lista todas as tarefas que você (humano) precisa executar para que o backend e as novas funcionalidades funcionem corretamente.

## ✅ Checklist de Implementação

### 1. Firebase Admin SDK

- [ ] Acessar [Firebase Console](https://console.firebase.google.com/)
- [ ] Ir em **Project Settings** → **Service Accounts**
- [ ] Clicar em **Generate New Private Key**
- [ ] Baixar o arquivo JSON
- [ ] Salvar como `backend/firebase-admin-key.json`
- [ ] Confirmar que o arquivo está no `.gitignore`

**Status**: ⏳ Pendente

---

### 2. Variáveis de Ambiente

#### Backend (`backend/.env`)

- [ ] Copiar `backend/.env.example` para `backend/.env`
- [ ] Preencher variáveis:
  ```env
  FIREBASE_ADMIN_KEY_PATH=./firebase-admin-key.json
  FRONTEND_URL=http://localhost:5173
  PORT=8000
  ENVIRONMENT=development
  ```

#### Frontend (`.env.local`)

- [ ] Copiar `.env.example` para `.env.local`
- [ ] Preencher credenciais do Firebase:
  ```env
  VITE_FIREBASE_API_KEY=...
  VITE_FIREBASE_AUTH_DOMAIN=...
  VITE_FIREBASE_PROJECT_ID=...
  VITE_FIREBASE_STORAGE_BUCKET=...
  VITE_FIREBASE_MESSAGING_SENDER_ID=...
  VITE_FIREBASE_APP_ID=...
  VITE_API_URL=http://localhost:8000
  ```

**Onde encontrar**: Firebase Console → Project Settings → General

**Status**: ⏳ Pendente

---

### 3. Deploy das Firestore Rules

- [ ] Instalar Firebase CLI (se não tiver):
  ```bash
  npm install -g firebase-tools
  firebase login
  ```

- [ ] Inicializar projeto Firebase (na raiz):
  ```bash
  firebase init firestore
  # Selecionar projeto existente
  # Usar firestore.rules como arquivo de rules
  ```

- [ ] Deploy das rules:
  ```bash
  firebase deploy --only firestore:rules
  ```

**Status**: ⏳ Pendente

---

### 4. Configurar Firebase Storage Rules

- [ ] Ir ao Firebase Console → Storage → Rules
- [ ] Copiar o conteúdo de `backend/storage.rules`
- [ ] Colar no editor de rules do Firebase Console
- [ ] Publicar as rules

**Ou via CLI:**

```bash
firebase deploy --only storage
```

**Status**: ⏳ Pendente

---

### 5. Definir Primeiro Usuário Admin

- [ ] Cadastrar um usuário na plataforma (via interface)
- [ ] No backend, executar:
  ```bash
  cd backend
  python -m scripts.set_admin seu-email@exemplo.com
  ```

**Saída esperada**:
```
📧 Usuário encontrado: seu-email@exemplo.com (UID: ...)
✅ Perfil criado com role ADMIN
🎉 seu-email@exemplo.com agora é ADMIN!
```

**Status**: ⏳ Pendente

---

### 6. Migrar Podcasts para Firebase Storage

- [ ] Verificar se existem arquivos MP3 em `public/audio/podcasts/`
- [ ] Executar script de migração:
  ```bash
  cd backend
  python -m scripts.migrate_podcasts
  ```

- [ ] Anotar as URLs geradas
- [ ] Atualizar os documentos no Firestore com as novas URLs (se necessário)

**Status**: ⏳ Pendente

---

### 7. Testar Backend

- [ ] Iniciar o backend:
  ```bash
  cd backend
  ./start.sh
  # Ou: uvicorn main:app --reload
  ```

- [ ] Verificar se iniciou sem erros
- [ ] Acessar http://localhost:8000/docs
- [ ] Testar endpoint de health: http://localhost:8000/api/health

**Esperado**: `{"status": "healthy", ...}`

**Status**: ⏳ Pendente

---

### 8. Testar Frontend com Backend

- [ ] Iniciar frontend:
  ```bash
  npm run dev
  ```

- [ ] Fazer login na plataforma
- [ ] Verificar se aparece botão "Admin" no header
- [ ] Acessar `/admin`
- [ ] Tentar criar um post de blog de teste
- [ ] Tentar fazer upload de um podcast de teste

**Status**: ⏳ Pendente

---

### 9. Testar Sistema de Roles

- [ ] Criar um segundo usuário (via signup)
- [ ] No painel admin, ir em "Usuários"
- [ ] Alterar role do segundo usuário para "editor"
- [ ] Fazer logout e login com o segundo usuário
- [ ] Verificar se ele vê o botão "Admin"
- [ ] Verificar se ele NÃO vê a opção "Usuários"

**Status**: ⏳ Pendente

---

### 10. Testar Formulário de Diagnóstico

- [ ] Acessar `/diagnostico`
- [ ] Criar um novo diagnóstico
- [ ] Preencher todas as 7 etapas:
  1. Descoberta & Alinhamento
  2. Dados & Contexto
  3. Arquitetura & Desenho
  4. Implementação
  5. Avaliação & Testes
  6. Deploy & Observabilidade
  7. Governança & Melhoria Contínua

- [ ] Verificar se a navegação entre etapas funciona
- [ ] Verificar se o progresso é salvo
- [ ] Verificar se as etapas completadas aparecem marcadas
- [ ] Clicar em etapas anteriores para navegar livremente
- [ ] Finalizar o diagnóstico
- [ ] Ver o resultado

**Status**: ⏳ Pendente

---

### 11. Deploy em Produção (Opcional)

#### Opção A: Docker Compose

- [ ] Configurar variáveis de ambiente de produção
- [ ] Build e start:
  ```bash
  docker-compose up -d
  ```
- [ ] Verificar logs:
  ```bash
  docker-compose logs -f
  ```

#### Opção B: Deploy Manual

- [ ] Backend: Deploy em servidor Python (Heroku, Railway, etc.)
- [ ] Frontend: Build e deploy estático
  ```bash
  npm run build
  # Upload da pasta 'dist' para hosting
  ```

**Status**: ⏳ Pendente

---

## 📊 Resumo de Status

| Tarefa | Status |
|--------|--------|
| 1. Firebase Admin SDK | ⏳ Pendente |
| 2. Variáveis de Ambiente | ⏳ Pendente |
| 3. Firestore Rules | ⏳ Pendente |
| 4. Storage Rules | ⏳ Pendente |
| 5. Primeiro Admin | ⏳ Pendente |
| 6. Migrar Podcasts | ⏳ Pendente |
| 7. Testar Backend | ⏳ Pendente |
| 8. Testar Frontend | ⏳ Pendente |
| 9. Testar Roles | ⏳ Pendente |
| 10. Testar Diagnóstico | ⏳ Pendente |
| 11. Deploy Produção | ⏳ Pendente |

---

## 🆘 Se Algo Der Errado

### Backend não inicia

1. Verifique se `firebase-admin-key.json` existe
2. Confirme que todas as dependências foram instaladas
3. Veja os logs de erro completos

### Frontend não conecta ao backend

1. Confirme que `VITE_API_URL` está correto no `.env.local`
2. Verifique se o backend está rodando
3. Abra o Network tab do navegador para ver erros de API

### Permissão negada no Firestore

1. Faça deploy das rules: `firebase deploy --only firestore:rules`
2. Verifique se o usuário tem role no Firestore (`/users/{uid}`)
3. Use o Firebase Console para verificar as rules

### Podcasts não carregam

1. Execute o script de migração
2. Verifique se as URLs no Firestore estão corretas
3. Confirme que as Storage Rules permitem leitura pública

---

## 📚 Documentação Adicional

- [BACKEND_SETUP.md](docs/BACKEND_SETUP.md) - Guia completo do backend
- [Firebase Console](https://console.firebase.google.com/)
- [FastAPI Docs](http://localhost:8000/docs) - Após iniciar o backend

---

**Última atualização**: Novembro 2025


