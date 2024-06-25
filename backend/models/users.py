from typing import Optional
from pydantic import BaseModel

class UsuarioInput(BaseModel):
    login: str
    nome: str
    senha: str

class UsuarioUpdate(BaseModel):
    id: int
    login: Optional[str]
    nome: Optional[str]
    senha: Optional[str]
    desativado: Optional[bool]

class UsuarioRemove(BaseModel):
    id: int

