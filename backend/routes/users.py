from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
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
            "username": usuario.username,           
        }for usuario in usuarios]
    
    return []

@router.post('/cadastrar')
async def cadastrar_usuario(usuario_input: UsuarioInput, session: Session = Depends(get_session)):
    try:
        usuario = Usuario(username=usuario_input.username,
                        hashed_senha=get_hashed_senha(usuario_input.senha))
        session.add(usuario)
        session.commit()
        return usuario
    except IntegrityError:
        raise HTTPException(status_code=409, detail='Nome de usuário já cadastrado')


@router.put('/editar')
async def editar_usuario(user: Annotated[dict, Depends(get_current_usuario)], usuario_update: UsuarioUpdate, session: Session = Depends(get_session)):
    try:
        usuario = session.query(Usuario).filter(Usuario.id == user["id"]).first()

        if not usuario:
            raise HTTPException(status_code=404, detail='Usuário não encontrado')
        
        if usuario_update.username != "":
            usuario.username=usuario_update.username
        if usuario_update.senha != "":
            usuario.hashed_senha=get_hashed_senha(usuario_update.senha)
        if usuario_update.ativo != None:
            usuario.ativo = usuario_update.ativo

        session.add(usuario)
        session.commit()

        return usuario
    except:
        return False
    
@router.delete('/deletar')
async def deletar_usuario(user: Annotated[dict, Depends(get_current_usuario)], session: Session = Depends(get_session)):
    usuario = session.query(Usuario).filter(Usuario.id == user["id"]).first()
    for projeto in usuario.projetos:
        session.delete(projeto)
    session.delete(usuario)
    session.commit()
    
    return {"deleted": user["username"]}
