from fastapi import FastAPI, status, HTTPException, Depends, Response
from database import SessionLocal
from typing import Union
from pydantic import BaseModel
from typing import Optional, List, Dict, Union
from fastapi.middleware.cors import CORSMiddleware
from datetime import time
from fastapi.security import OAuth2PasswordBearer
from typing_extensions import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import models 

app=FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

origins = ['http://localhost:19006']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db=SessionLocal()





# PARA LOS JWT
# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "689a2630108fd8462a72209df36cbef8b256db35d4559c14dfa12b0438191eab"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# LA BASE DE DATOS FALSA PARA OS USUARIOS FALSOS
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}

# CLASES QUE UTILIZO PARA LO DE LA AUTORIZACIÓN Y VERIFICACIÓN
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


class User(BaseModel):
    username: str
    email: Union[str, None] = None
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None


class UserInDB(User):
    hashed_password: str


# Especifica el esquema de hash de contraseñas utilizado. 
# Es un algoritmo de hash seguro y ampliamente utilizado 
# para almacenar contraseñas de forma segura.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# LE PASAS LAS 2 CONSTRASEÑAS, UNA SIN Y SU VERISÓN CON HASH
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password) # verify es una función de CryptContext

# LE PASAS POR PARÁMETRO LA CONTRASEÑA TAL CUAL Y TE HACE SU HASH UTILIZANDO EL OBJETO pwd_context
def get_password_hash(password):
    return pwd_context.hash(password)

# LE PASAS LA BASE DE DATOS Y EL NOMBRE DE USUARIO Y MIRA SI SE ENCUENTRA EN ELLA 
def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

# AUTENTIFICACIÓN DEL USUARIO, LE PASAS LA BASE DE DATOS, EL NOMBRE DE USUARIO Y LA CONTRA
def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

# CREACIÓN DE UN TOKEN DE ACCESO CON UN TIEMPO DE EXPIRACIÓN
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# VER EL USUARIO ACTUAL, LE PASAS EL TOKEN Y POR ÉL PUEDE IFENTIFICAR EL USUARIO QUE LO TIENE
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

# PARA VER SI EL USUARIO ESTÁ ACTIVO O NO 
async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


# se utiliza para solicitar un token de acceso mediante la autenticación del usuario
@app.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# PARA LEERTE A TI Y OBTENER TU USUARIO,  se utiliza para obtener los detalles del usuario actualmente autenticado
@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user

# se utiliza para obtener una lista de elementos asociados al usuario actualmente autenticado.
@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return [{"item_id": "Foo", "owner": current_user.username}]


