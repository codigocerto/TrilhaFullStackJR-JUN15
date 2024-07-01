import bcrypt
import os
from datetime import datetime, timedelta, timezone
import jwt
from database.schema import Usuario, Session

ALGORITHM = "HS256"
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

def get_hashed_senha(senha):
    senha_bytes = senha.encode("utf-8")
    return bcrypt.hashpw(senha_bytes, bcrypt.gensalt()).decode('utf8')


def verify_senha(senha, hashed_senha):
    if type(senha) == str:
        senha = senha.encode("utf-8")
    if type(hashed_senha) == str:
       hashed_senha = hashed_senha.encode("utf-8")
    return bcrypt.checkpw(senha, hashed_senha)

def criar_token_acesso(username: str, user_id: int, expires_delta: timedelta):

    to_encode = {
        'sub': username,
        'id': user_id,
        'exp': datetime.now(timezone.utc) + expires_delta
        }
    
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
        

def autenticar_usuario(username: str, password: str, session: Session):
    usuario = session.query(Usuario).filter(Usuario.username == username).first()
    if not usuario:
        return False
    if verify_senha(password, usuario.hashed_senha):
        return usuario
    return False

