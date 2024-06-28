from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

class ProjetoInput(BaseModel):
    nome: str
    descricao: Optional[str]
    prazo: Optional[datetime] = Field(description="Horário em UTC")
    is_publico: bool

class MultProjetosInput(BaseModel):
    projetos: List[ProjetoInput]

class ProjetoUpdate(BaseModel):
    id: int
    nome: Optional[str]
    descricao: Optional[str]
    prazo: Optional[datetime]= Field(description="Horário em UTC")
    is_publico: Optional[bool]

class ProjetoDelete(BaseModel):
    id: int

class ProjetosDelete(BaseModel):
    ids: List[int]

