from datetime import datetime, timezone
import os
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine
from sqlalchemy.orm import Session, declarative_base

# URL = "sqlite:///backend/projetos_database.db"
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
    
    
Base.metadata.create_all(engine)
