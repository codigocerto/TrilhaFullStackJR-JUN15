from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import joinedload
from app.security import get_hashed_senha
from routes.auth import get_current_usuario
from database.schema import Usuario, get_session, Session
from models.users import UsuarioInput, UsuarioUpdate

router = APIRouter()

@router.get('/')
async def get_usuarios(session: Session = Depends(get_session)):
    usuarios = session.query(Usuario).filter(Usuario.ativo).all()

    if usuarios:
        return [{
            "id": usuario.id,
            "nome": usuario.nome,
            "username": usuario.username,           
        }for usuario in usuarios]
    
    return []

@router.post('/cadastrar')
async def cadastrar_usuario(usuario_input: UsuarioInput, session: Session = Depends(get_session)):
    usuario = Usuario(username=usuario_input.username,
                      nome=usuario_input.nome,
                      hashed_senha=get_hashed_senha(usuario_input.senha))
    session.add(usuario)
    session.commit()

    return usuario


@router.put('/editar')
async def editar_usuario(user: Annotated[dict, Depends(get_current_usuario)], usuario_update: UsuarioUpdate, session: Session = Depends(get_session)):
    usuario = session.query(Usuario).filter(Usuario.id == user["id"]).first()

    if not usuario:
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    
    if usuario_update.username != "":
        usuario.username=usuario_update.username
    if usuario_update.nome != "":
        usuario.nome=usuario_update.nome
    if usuario_update.senha != "":
        usuario.hashed_senha=get_hashed_senha(usuario_update.senha)
    if usuario_update.ativo != None:
        usuario.ativo = usuario_update.ativo

    session.add(usuario)
    session.commit()

    try:
        usuarios = session.query(Usuario).options(joinedload(Usuario.projetos)).all()
        return usuarios
    except:
        return []
    
@router.delete('/deletar')
async def deletar_usuario(user: Annotated[dict, Depends(get_current_usuario)], session: Session = Depends(get_session)):
    usuario = session.query(Usuario).filter(Usuario.id == user["id"]).first()

    for projeto in usuario.projetos:
        session.delete(projeto)

    session.delete(usuario)
    session.commit()

    try:
        usuarios = session.query(Usuario).options(joinedload(Usuario.projetos)).all()
        return usuarios
    except:
        return []
    
