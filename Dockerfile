# Multi-stage build para otimizar tamanho da imagem

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Args de build para injetar variáveis do Vite (vindas do Secret Manager via CI)
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

# Gerar .env.production temporário apenas para o build (não persiste na imagem final)
RUN printf "VITE_FIREBASE_API_KEY=%s\nVITE_FIREBASE_AUTH_DOMAIN=%s\nVITE_FIREBASE_PROJECT_ID=%s\nVITE_FIREBASE_STORAGE_BUCKET=%s\nVITE_FIREBASE_MESSAGING_SENDER_ID=%s\nVITE_FIREBASE_APP_ID=%s\n" \
  "$VITE_FIREBASE_API_KEY" \
  "$VITE_FIREBASE_AUTH_DOMAIN" \
  "$VITE_FIREBASE_PROJECT_ID" \
  "$VITE_FIREBASE_STORAGE_BUCKET" \
  "$VITE_FIREBASE_MESSAGING_SENDER_ID" \
  "$VITE_FIREBASE_APP_ID" > .env.production

# Build da aplicação
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar build da aplicação
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta 8080 (padrão Cloud Run)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080 || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]


