from typing import Optional
from pydantic import BaseModel

class UsuarioInput(BaseModel):
    username: str
    senha: str

class UsuarioUpdate(BaseModel):
    username: Optional[str]
    senha: Optional[str]
    ativo: Optional[bool]