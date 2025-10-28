# Instruções de Deploy - Cloud Run via GitHub Actions

Este documento descreve os passos necessários para configurar o deploy automático da plataforma Learning LLMOps no Google Cloud Run.

## Pré-requisitos

- Conta no Google Cloud Platform (GCP)
- Projeto GCP criado
- Domínio próprio (opcional, mas recomendado)
- Repositório GitHub com o código da plataforma

## Configuração no GCP

### 1. Habilitar APIs necessárias

```bash
# Autenticar no GCP
gcloud auth login

# Definir projeto
gcloud config set project SEU_PROJECT_ID

# Habilitar APIs
gcloud services enable containerregistry.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable iam.googleapis.com
```

### 2. Criar Service Account

```bash
# Criar service account
gcloud iam service-accounts create github-actions-sa \
  --display-name="GitHub Actions Service Account" \
  --description="Service account para CI/CD via GitHub Actions"
```

### 3. Atribuir Permissões

```bash
# Substituir PROJECT_ID pelo ID real do projeto
export PROJECT_ID="seu-project-id"

# Cloud Run Admin
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

# Storage Admin (para Container Registry)
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

# Service Account User
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

### 4. Gerar Chave JSON

```bash
# Gerar chave
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com

# ⚠️ IMPORTANTE: A chave key.json contém credenciais sensíveis!
# Mantenha-a segura e nunca faça commit dela no repositório
```

## Configuração no GitHub

### 1. Adicionar Secrets

Vá para: **Repositório → Settings → Secrets and variables → Actions → New repository secret**

Adicione os seguintes secrets:

| Nome | Valor | Descrição |
|------|-------|-----------|
| `GCP_PROJECT_ID` | seu-project-id | ID do projeto no GCP |
| `GCP_SA_KEY` | conteúdo do key.json | Conteúdo completo do arquivo key.json |
| `GCP_REGION` | us-central1 | Região do Cloud Run (ou sua preferida) |

**Como copiar o conteúdo do key.json:**
```bash
# macOS/Linux
cat key.json | pbcopy

# Windows (PowerShell)
Get-Content key.json | Set-Clipboard

# Ou simplesmente:
cat key.json
# Copie todo o output manualmente
```

### 2. Verificar Workflow

O arquivo `.github/workflows/deploy-production.yml` já está configurado e será executado automaticamente quando você fizer push para a branch `main`.

## Primeiro Deploy Manual (Opcional)

Antes de fazer o deploy via GitHub Actions, você pode testar localmente:

```bash
# Build local
docker build -t learning-llmops-platform .

# Testar localmente
docker run -p 8080:8080 learning-llmops-platform

# Acessar: http://localhost:8080

# Se funcionar, pode prosseguir com o deploy via GitHub Actions
```

## Deploy Automático

Após configurar os secrets, qualquer push para a branch `main` irá:

1. ✅ Fazer checkout do código
2. ✅ Configurar Cloud SDK
3. ✅ Build da imagem Docker
4. ✅ Push para Google Container Registry
5. ✅ Deploy no Cloud Run
6. ✅ Teste de health check
7. ✅ Exibir URL do serviço

## Configurar Domínio Personalizado

### 1. Mapear Domínio no Cloud Run

```bash
gcloud beta run domain-mappings create \
  --service=learning-llmops-platform \
  --domain=seudominio.com \
  --region=us-central1
```

### 2. Configurar DNS

O comando acima retornará registros DNS que você precisa adicionar no seu provedor de domínio:

- **Tipo A**: Apontar para o IP fornecido
- **Tipo CNAME**: Adicionar registro conforme instruções

Exemplo de registros:
```
Type: A
Name: @
Value: 216.239.32.21

Type: CNAME  
Name: www
Value: ghs.googlehosted.com
```

### 3. Verificar Certificado SSL

O Cloud Run provisiona automaticamente certificados SSL gratuitos via Google-managed certificates. Aguarde alguns minutos após configurar o DNS.

## Monitoramento

### Logs

```bash
# Ver logs em tempo real
gcloud run services logs tail learning-llmops-platform \
  --region=us-central1 \
  --follow

# Logs recentes
gcloud run services logs read learning-llmops-platform \
  --region=us-central1 \
  --limit=50
```

### Métricas

Acesse o Console do Cloud Run:
```
https://console.cloud.google.com/run/detail/us-central1/learning-llmops-platform/metrics
```

Métricas disponíveis:
- Requisições por segundo
- Latência (p50, p95, p99)
- Erros 4xx e 5xx
- Uso de memória
- Uso de CPU
- Número de instâncias

## Custos Estimados

**Cloud Run Pricing (us-central1):**
- CPU: $0.00002400 por vCPU-segundo
- Memória: $0.00000250 por GiB-segundo
- Requisições: $0.40 por milhão

**Estimativa mensal (tráfego baixo):**
- ~10.000 requisições/mês
- Latência média: 200ms
- Custo estimado: **< $1/mês**

**Com domínio customizado:**
- Free tier Cloud Run: 2 milhões de requisições/mês
- Certificado SSL: Gratuito (Google-managed)

## Troubleshooting

### Deploy falha com erro de autenticação

```bash
# Verificar se service account tem permissões
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:github-actions-sa@*"
```

### Container não inicia

```bash
# Verificar logs de build
gcloud builds list --limit=5

# Ver detalhes do último build
gcloud builds log $(gcloud builds list --limit=1 --format='value(id)')
```

### Health check falha

- Verifique se a porta 8080 está exposta no Dockerfile
- Confirme que o endpoint `/health` retorna status 200
- Revise logs do container

### Domínio não resolve

- Confirme que registros DNS foram adicionados corretamente
- Aguarde propagação DNS (até 48h, geralmente < 1h)
- Use `dig seudominio.com` para verificar DNS

## Rollback

Em caso de problemas, reverter para versão anterior:

```bash
# Listar revisões
gcloud run revisions list \
  --service=learning-llmops-platform \
  --region=us-central1

# Reverter para revisão específica
gcloud run services update-traffic learning-llmops-platform \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1
```

## Recursos Adicionais

- Documentação Cloud Run: https://cloud.google.com/run/docs
- GitHub Actions para GCP: https://github.com/google-github-actions
- Melhores Práticas Cloud Run: https://cloud.google.com/run/docs/best-practices

## Segurança

⚠️ **Importantes:**

1. **NUNCA** faça commit da chave `key.json` no repositório
2. Adicione `key.json` no `.gitignore`
3. Rotacione chaves periodicamente (recomendado: 90 dias)
4. Use secrets do GitHub para armazenar credenciais
5. Revise permissões IAM regularmente

## Suporte

Em caso de dúvidas ou problemas:

1. Verifique logs do GitHub Actions
2. Consulte logs do Cloud Run
3. Revise documentação oficial do GCP
4. Abra uma issue no repositório

---

**Última atualização:** 2025-01-22



