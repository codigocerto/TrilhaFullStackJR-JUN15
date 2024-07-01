from datetime import datetime, timezone
import os
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text, create_engine
from sqlalchemy.orm import Session, declarative_base, relationship

URL = os.getenv("DATABASE_KEY", "")

engine = create_engine(URL)

def get_session():
    session = Session(bind=engine)
    try:
        yield session
    finally:
        session.close()


Base = declarative_base()

class Projeto(Base):
    __tablename__ = 'projeto'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(255), nullable=False)
    descricao = Column(Text, nullable=True)
    criacao = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    prazo = Column(DateTime, nullable=True)
    is_publico = Column(Boolean)

    usuario_id = Column(Integer, ForeignKey('usuario.id'))

    usuario = relationship("Usuario", back_populates="projetos")

class Usuario(Base):
    __tablename__ = 'usuario'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    hashed_senha = Column(String(255), nullable=False)
    ativo = Column(Boolean, default=True)

    projetos = relationship("Projeto", back_populates="usuario")
    
    
Base.metadata.create_all(engine)
