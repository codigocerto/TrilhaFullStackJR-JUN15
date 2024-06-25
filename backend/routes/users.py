from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import joinedload
from database.schema import Usuario, get_session, Session
from models.users import UsuarioInput, UsuarioUpdate

router = APIRouter()

@router.get('/')
async def get_usuarios(session: Session = Depends(get_session)):
    usuarios = session.query(Usuario).options(joinedload(Usuario.projetos)).all()

    if usuarios:
        return usuarios
    
    return []

@router.post('/cadastrar')
async def cadastrar_usuario(usuario_input: UsuarioInput, session: Session = Depends(get_session)):
    usuario = Usuario(login=usuario_input.login,
                      nome=usuario_input.nome,
                      senha=usuario_input.senha)
    session.add(usuario)
    session.commit()

    try:
        usuarios = session.query(Usuario).options(joinedload(Usuario.projetos)).all()
        return usuarios
    except:
        return []


@router.put('/editar')
async def editar_usuario(usuario_update: UsuarioUpdate, session: Session = Depends(get_session)):
    usuario = session.query(Usuario).filter(Usuario.id == usuario_update.id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    
    if usuario_update.nome != "":
        usuario.nome=usuario_update.nome
    if usuario_update.nome != "":
        usuario.nome=usuario_update.nome
    if usuario_update.nome != "":
        usuario.nome=usuario_update.nome
    if usuario_update.desativado != "":
        usuario.desativado = usuario_update.desativado

    session.add(usuario)
    session.commit()

    try:
        usuarios = session.query(Usuario).options(joinedload(Usuario.projetos)).all()
        return usuarios
    except:
        return []
    
@router.delete('/deletar')
async def deletar_usuario(usuario_remove: UsuarioUpdate, session: Session = Depends(get_session)):
    usuario = session.query(Usuario).filter(Usuario.id == usuario_remove.id).first()
    
    if not usuario:
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    
    for projeto in usuario.projetos:
        session.delete(projeto)

    session.delete(usuario)
    session.commit()

    try:
        usuarios = session.query(Usuario).options(joinedload(Usuario.projetos)).all()
        return usuarios
    except:
        return []
    
