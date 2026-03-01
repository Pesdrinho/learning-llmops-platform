from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.settings import settings
from config.firebase import initialize_firebase
from routers import users, storage, blog, podcasts

# Inicializar Firebase na startup
try:
    initialize_firebase()
except Exception as e:
    print(f"⚠️ Aviso: Firebase não inicializado - {e}")

app = FastAPI(
    title="LLMOps Platform API",
    description="Backend para a plataforma de aprendizado LLMOps",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(users.router)
app.include_router(storage.router)
app.include_router(blog.router)
app.include_router(podcasts.router)


@app.get("/")
async def root():
    """Endpoint de health check"""
    return {
        "status": "online",
        "message": "LLMOps Platform API",
        "version": "1.0.0",
        "environment": settings.environment
    }


@app.get("/api/health")
async def health_check():
    """Health check detalhado"""
    return {
        "status": "healthy",
        "services": {
            "api": "online",
            "firebase": "configured"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.environment == "development"
    )

