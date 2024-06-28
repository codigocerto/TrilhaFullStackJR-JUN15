import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.projects import router as projects_router
from routes.users import router as users_router
from routes.auth import router as auth_router

app = FastAPI(title="Gerenciamento de Projetos")

app.include_router(projects_router, prefix="/projetos", tags=["Projetos"])
app.include_router(users_router, prefix="/usuarios", tags=["Usuários"])
app.include_router(auth_router, prefix="/auth", tags=["Autenticação"])

allowed_origins = os.environ.get("ALLOWED_ORIGINS", "").split(',')

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def index():
    return {"Código Certo": "Full Stack"}