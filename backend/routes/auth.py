from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from app.security import ALGORITHM, JWT_SECRET_KEY, autenticar_usuario, criar_token_acesso
from models.auth import Token
from database.schema import Session, get_session

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

@router.post("/token", response_model=Token)
async def login_for_acess_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                session: Session = Depends(get_session)):
    
    usuario = autenticar_usuario(form_data.username, form_data.password, session)

    if not usuario:
        raise HTTPException(status_code=401, detail="Não foi possível validar o usuário")
    
    # token = criar_token_acesso(usuario.username, usuario.id, timedelta(seconds=1))
    token = criar_token_acesso(usuario.username, usuario.id, timedelta(minutes=20))

    return {'access_token': token, 'token_type': 'bearer'}

@router.get("/usuario")
async def get_current_usuario(token: Annotated[str, Depends(oauth2_scheme)]):
    try: 
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=ALGORITHM)
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        if not username or not user_id:
            raise HTTPException(status_code=401, detail="Não foi possível validar o usuário")
        
        return {'username': username, 'id': user_id}
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
