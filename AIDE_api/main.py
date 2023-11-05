from fastapi import FastAPI, status, HTTPException, Depends, Response, File, UploadFile
from database import SessionLocal
from typing import Union, List
from pydantic import BaseModel
from typing import Optional, List, Dict, Union
from fastapi.middleware.cors import CORSMiddleware
from time import sleep
from datetime import time
from fastapi.security import OAuth2PasswordBearer
from typing_extensions import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import models
from passlib.exc import UnknownHashError
from sqlalchemy import distinct, func, text
import os
from fastapi.staticfiles import StaticFiles



# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "fdcf52297b623feba78938581959dae1d9a1b570816af66ec9fbcc690f5c5c46"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10080 #7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app=FastAPI()

app.mount("/videos", StaticFiles(directory="videos"), name="videos")

# ES NECESARIA PORQUE... monta la carpeta uploads como una ruta accesible para mi aplicación
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
#app.mount("/../AIDE_ui/assets", StaticFiles(directory="assets"), name="assets")

origins = ['http://localhost:19006','http://127.0.0.1:19006']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Token(BaseModel):
    access_token: str
    token_type: str

# ---------------------------------

class User_aide(BaseModel):
    id: int
    name: str
    username: str
    mail: str
    password: str
    type: str

    class Config:
        orm_mode = True


class Tutor(BaseModel):
    id: int

    class Config:
        orm_mode = True

class Senior(BaseModel):
    id: int
    total_playing_time: time
    hour_start_avg: time
    hour_finish_avg: time
    score_avg: int
    tutor_id: int
    sex: str
    birth_year: int
    birth_place: str
    descendants_num: int
    sons_num: int
    daughters_num: int
    siblings_num: int
    brothers_num: int
    sisters_num: int
    partner_name: str
    father_name: str
    mother_name: str

    class Config:
        orm_mode = True


class Activity(BaseModel):
    id: int
    name: str
    description: str
    demo_video: str
    photo_file: str
    num_answers: int

    class Config:
        orm_mode = True


class CustomizedAct(BaseModel):
    id: int
    #senior_id: int

    class Config:
        orm_mode = True


class GenericAct(BaseModel):
    id: int

    class Config:
        orm_mode = True

class ReportActivity(BaseModel):
    id: int
    time_playing: time
    number_of_tries: int
    score: int
    senior_id: int
    activity_id: int
    num_act_answers: int

    class Config:
        orm_mode = True


class Photo(BaseModel):
    id: int
    description: str
    photo_file: str
    upload: int
    senior: int

    class Config:
        orm_mode = True


class Position(BaseModel):
    id_photo: int
    id_person: int
    clue: str
    w: float
    h: float
    x_inf: float
    y_inf: float
    x_sup: float
    y_sup: float
    hair_color: str
    voice_record: str
    sunglasses: bool
    glasses: bool
    clothes_color: str

    class Config:
        orm_mode = True


class Person(BaseModel):
    id: int
    name: str
    surname: str
    sex: str
    skin_color: str
    eyes_color: str
    familiar_rank: str
    id_senior: int

    class Config:
        orm_mode = True


class PhotoCustomized(BaseModel):
    id_photo: int
    id_activity: int

    class Config:
        orm_mode = True


class SeniorActivity(BaseModel):
    id_senior: int
    id_activity: int

    class Config:
        orm_mode = True


def verify_password(plain_password, hashed_password):
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except UnknownHashError:
        return False
        

def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(username: str):
    user = db.query(models.User_aide).filter(models.User_aide.username == username).first()
    if user:
        return user

    return None


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]): # señor que mira tu tarjeta
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(username)
    if user is None:
        raise credentials_exception
    return user


db=SessionLocal()

def get_db():
    try: 
        dataBase = SessionLocal()
        yield dataBase
    finally:
        dataBase.close()

# ---------------------------------------------------------------------------------------
@app.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# GET -----------------------------------------------------------------------------------

# get a photo by id
@app.get('/photos/{photo_id}',response_model=Photo,status_code=status.HTTP_200_OK)
def get_a_photo(photo_id:int):
    photo=db.query(models.Photo).filter(models.Photo.id==photo_id).first()

    if photo is None:
        raise HTTPException(status_code=400,detail="Photo not found")
    
    return photo

# get a list of the people in a specific photo (photo finded by name)
@app.get('/{photo_file}/people',response_model=List[Person],status_code=status.HTTP_200_OK)
def get_a_photo(photo_file:str):
    photo=db.query(models.Photo).filter(models.Photo.photo_file==photo_file).first()

    if photo is None:
        raise HTTPException(status_code=400,detail="Photo not found")
    
    return photo.people


# get all activities
@app.get('/activities',response_model=List[Activity], status_code=200)
def get_all_activities():
    activities=db.query(models.Activity).all()

    if activities is None:
        raise HTTPException(status_code=400,detail="There're no activities")

    return activities


# get all customized activities
@app.get('/activities/customized_activities',response_model=List[Activity], status_code=200)
def get_all_customized_activities():
    customized_activities=db.query(models.Activity).filter(models.Activity.id==models.CustomizedAct.id).all()

    if customized_activities is None:
        raise HTTPException(status_code=400,detail="There're no customized activities")

    return customized_activities



# get all generic activities
@app.get('/activities/generic_activities',response_model=List[Activity], status_code=200)
def get_all_generic_activities():
    generic_activities=db.query(models.Activity).filter(models.Activity.id==models.GenericAct.id).all()

    if generic_activities is None:
        raise HTTPException(status_code=400,detail="There're no generic activities")

    return generic_activities


# get an activity by id
@app.get('/activities/{activity_id}',response_model=Activity,status_code=status.HTTP_200_OK)
def get_an_activity(activity_id:int):
    activity=db.query(models.Activity).filter(models.Activity.id==activity_id).first()

    if activity is None:
        raise HTTPException(status_code=400,detail="Activity not found")

    return activity


# get the reports from an activity
@app.get('/activities/{activity_id}/reports',response_model=List[ReportActivity],status_code=status.HTTP_200_OK)
def get_an_activity_reports(activity_id:int):
    reports=db.query(models.ReportActivity).filter(models.ReportActivity.activity_id==activity_id).all()

    if reports is None or reports == []:
        raise HTTPException(status_code=400,detail="There're no reports for this activity")

    return reports

# get the reports from an activity by senior (list)
@app.get('/activities/{activity_id}/senior/{senior_id}/reports',response_model=List[ReportActivity],status_code=status.HTTP_200_OK)
def get_an_activity_senior_reports(activity_id:int, senior_id:int):
    reports=db.query(models.ReportActivity).filter(models.ReportActivity.activity_id==activity_id).filter(models.ReportActivity.senior_id==senior_id).all()

    if reports is None or reports == []:
        raise HTTPException(status_code=400,detail="This senior never played this activity before")

    return reports

# get the reports from an activity by senior (el primer report de la actividad que coincida)
# get if a senior did an activity by searching his/her senior_id in report_activity TODO: pero no se puede mirar con la anterior...?? 
# @app.get('/activities/{activity_id}/report_by_senior_id/{id_senior}',response_model=ReportActivity,status_code=status.HTTP_200_OK)
# def get_a_report_by_senior_id(activity_id:int, id_senior:int):
#     report=db.query(models.ReportActivity).filter(models.ReportActivity.senior_id==id_senior).filter(models.ReportActivity.activity_id==activity_id).first()

#     if report is None or report == []:
#         raise HTTPException(status_code=400,detail="This senior never played this activity before")

#     return report


# get a senior name by id (get the name of the senior)
@app.get('/seniors/{senior_id}',response_model=str,status_code=status.HTTP_200_OK)
def get_a_senior(senior_id:int):
    senior=db.query(models.User_aide).filter(models.User_aide.id==senior_id).first()
    
    if senior is None:
        raise HTTPException(status_code=400,detail="Senior not found")

    return senior.name

# get a senior name by id (get the data of the senior)
@app.get('/senior/{senior_id}',response_model=Senior,status_code=status.HTTP_200_OK)
def get_a_senior(senior_id:int):
    senior=db.query(models.Senior).filter(models.Senior.id==senior_id).first()
    
    if senior is None:
        raise HTTPException(status_code=400,detail="Senior not found")

    return senior

# get the seniors data associated with a tutor by username
@app.get('/tutors/{username}/seniors',response_model=List[Senior],status_code=status.HTTP_200_OK)
def get_the_associated_seniors(username:str):
    user=db.query(models.User_aide).filter(models.User_aide.username==username).first()
    
    if user is None:
        raise HTTPException(status_code=400,detail="Tutor not found")
    else:
        tutor=db.query(models.Tutor).filter(models.Tutor.id==user.id).first()

    return tutor.seniors


# get a user by username and password, to check if it's correct 
@app.get('/users/{username}/{password}',response_model=User_aide,status_code=status.HTTP_200_OK)
def get_a_user(username:str, password:str):
    user = db.query(models.User_aide).filter(models.User_aide.username == username).filter(models.User_aide.password == password).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Wrong user or password")
    
    return user

# get all users 
@app.get('/users',response_model=List[User_aide], status_code=200)
def get_all_users():
    users=db.query(models.User_aide).all()

    if users is None:
        raise HTTPException(status_code=400,detail="There're no users")

    return users

# get a user by username 
@app.get('/users/{username}',response_model=User_aide,status_code=status.HTTP_200_OK)
def get_a_user(username:str):
    user = db.query(models.User_aide).filter(models.User_aide.username == username).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    
    return user


# get a specific person position in a specific photo
@app.get('/photos/{photo_id}/people/{person_id}',response_model=Position,status_code=status.HTTP_200_OK)
def get_a_position(photo_id:int, person_id:int):
    person_position=db.query(models.Position).filter(models.Position.id_photo==photo_id).filter(models.Position.id_person==person_id).first()

    if person_position is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Position not found")

    return person_position

# get all the people from a photo
@app.get('/photos/{photo_id}/people',response_model=List[Person],status_code=status.HTTP_200_OK)
def get_all_the_people_in_a_photo(photo_id:int):
    photo=db.query(models.Photo).filter(models.Photo.id==photo_id).first()

    if photo is None:
        raise HTTPException(status_code=400,detail="Photo not found")

    return photo.people

# get a photo id
@app.get('/photo_id_by_name/{photo_file}',response_model=Photo,status_code=status.HTTP_200_OK)
def get_photo_id_by_name(photo_file:str):
    photo=db.query(models.Photo).filter(models.Photo.photo_file==photo_file).first()

    if photo is None:
        raise HTTPException(status_code=400,detail="Photo not found")

    return photo

# get a person by name and surname
@app.get('/person_by_name_and_surname/{person_name}/{person_surname}',response_model=Person,status_code=status.HTTP_200_OK)
def get_photo_id_by_name(person_name:str, person_surname:str ):
    person=db.query(models.Person).filter(models.Person.name==person_name).filter(models.Person.surname==person_surname).first()

    if person is None:
        raise HTTPException(status_code=400,detail="Person not found")

    return person


# get the activities a senior played
@app.get('/senior/{senior_id}/playedactivities',response_model=List[Activity], status_code=200)
def get_all_played_activities(senior_id:int):
    
    senior = db.query(models.User_aide).filter(models.User_aide.id==senior_id).first()
    if senior is None:
        raise HTTPException(status_code=400,detail="User not found")
    else:
        unique_activity_ids= db.query(distinct(models.ReportActivity.activity_id)).filter(models.ReportActivity.senior_id == senior_id).all()
        unique_activity_ids = [id_[0] for id_ in unique_activity_ids]
        activities = []

        if unique_activity_ids is None or unique_activity_ids == []:
            raise HTTPException(status_code=400,detail="There're no played activities yet")

        for id_activity in unique_activity_ids:
            played_activity = db.query(models.Activity).filter(models.Activity.id == id_activity).first()
            if played_activity:
                activities.append(played_activity)

    return activities

# get una persona de las que sale en las fotos de un senior
@app.get('/senior/{senior_id}/peple_in_senior_photos/{person_name}/{person_surname}',response_model=Person, status_code=200)
def get_a_specific_person_in_senior_photos(senior_id:int, person_name:str, person_surname:str):
    
    senior = db.query(models.User_aide).filter(models.User_aide.id==senior_id).first()
    if senior is None:
        raise HTTPException(status_code=400,detail="User not found")
    else:
        tagged_person=db.query(models.Person).filter(models.Person.id_senior==senior_id).filter(models.Person.name==person_name).filter(models.Person.surname==person_surname).first()

        if tagged_person is None:
            raise HTTPException(status_code=400,detail="That person is not tagged in the photos")

    return tagged_person


# get todas las personas que aparecen en fotos de un senior
@app.get('/senior/{senior_id}/peple_in_senior_photos',response_model=List[Person], status_code=200)
def get_all_the_people_in_senior_photos(senior_id:int):
    
    senior = db.query(models.User_aide).filter(models.User_aide.id==senior_id).first()
    if senior is None:
        raise HTTPException(status_code=400,detail="Senior not found")
    else:
        tagged_people=db.query(models.Person).filter(models.Person.id_senior==senior_id).all()

        if tagged_people is None or tagged_people == []:
            raise HTTPException(status_code=400,detail="There're no people tagged in photos")

    return tagged_people

# get the customizedactivities from a specific senior
@app.get('/customized_activities_by_senior/{senior_id}',response_model=List[Activity], status_code=200)
def get_all_senior_customized_activities(senior_id:int):
    senior = db.query(models.User_aide).filter(models.User_aide.id==senior_id).first()
    if senior is None:
        raise HTTPException(status_code=400,detail="User not found")
    else:
        customized_activities=db.query(models.SeniorActivity).filter(models.SeniorActivity.id_senior==senior_id).all()    
        #ahora deberia recorrer este array de seniorActivity y por cada id de lo que obtenga debería ir a buscar su actividad completa a Activity y devolver eso 
        activities = []
        for activity in customized_activities:
            activity = db.query(models.Activity).filter(models.Activity.id == activity.id_activity).first()
            if activity:
                activities.append(activity)
    return activities

# get the photos of a specific senior
@app.get('/{senior_id}/photos',response_model=List[Photo], status_code=200)
def get_all_senior_photos(senior_id:int):
    senior_photos = []

    senior = db.query(models.User_aide).filter(models.User_aide.id==senior_id).first()
    if senior is None:
        raise HTTPException(status_code=400,detail="Senior not found")
    else:
        senior_photos = db.query(models.Photo).filter(models.Photo.senior==senior_id).all()
        if senior_photos is None:
            raise HTTPException(status_code=400,detail="Senior photos not found")
        
    return senior_photos

# get the photos of a specific customized activity
# @app.get('/customized_activities/{customized_activity_id}/photos',response_model=List[Photo], status_code=200)
# def get_all_customized_activity_photos(customized_activity_id:int):
    
#     activity = db.query(models.CustomizedAct).filter(models.CustomizedAct.id==customized_activity_id).first()
#     if activity is None:
#         raise HTTPException(status_code=400,detail="Activity not found")
#     else:
#         customized_activity_photos=db.query(models.PhotoCustomized).filter(models.PhotoCustomized.id_activity==customized_activity_id).all()

#         if customized_activity_photos is None:
#             raise HTTPException(status_code=400,detail="There're no photos in this activity")
#         # Utilizamos una lista para almacenar las fotos correspondientes a cada "id_photo"
#         photos = []

#         for photo in customized_activity_photos:
#             # Buscamos la foto en la tabla "Photo" usando el campo "id_photo"
#             photo_data = db.query(models.Photo).filter(models.Photo.id == photo.id_photo).first()
#             if photo_data:
#                 photos.append(photo_data)
#             else:
#                 raise HTTPException(status_code=404, detail=f"Photo with id_photo={photo.id_photo} not found")

#     return photos

# POST -----------------------------------------------------------------------------------

# post a new user
@app.post('/users',response_model=User_aide, status_code=status.HTTP_201_CREATED)
def create_a_user(user: User_aide):
    db_user=db.query(models.User_aide).filter(models.User_aide.username==user.username).first()
    query = text('SELECT MAX(id) FROM User_aide')
    db_id = db.execute(query).scalar()
    if db_user:
        raise HTTPException(status_code=400,detail="User already exists. Try another username, please.")
    
    new_user=models.User_aide(
        id=db_id + 1,
        name=user.name,
        username=user.username,
        mail=user.mail,
        password=user.password,
        type=user.type
    )
    
    db.add(new_user)
    db.commit()

    return Response(content=f"New user with id {new_user.id} added")


# post a new tutor
@app.post('/users/tutors/{tutor_id}',response_model=Tutor, status_code=status.HTTP_201_CREATED)
def create_a_tutor(tutor_id:int):
    db_tutor=db.query(models.User_aide).filter(models.User_aide.id==tutor_id).first()
    db_tutor_tutor=db.query(models.Tutor).filter(models.Tutor.id==tutor_id).first()
    
    if db_tutor is None:
        raise HTTPException(status_code=400,detail="User does not exists")
    elif db_tutor_tutor: #si esta en la tabla de los tutores no se pondrá otra vez
        raise HTTPException(status_code=400,detail="User is already a tutor.")
    
    new_tutor=models.Tutor(
        id=db_tutor.id
    )
    
    db.add(new_tutor)
    db.commit()

    return Response(content=f"New tutor with id {new_tutor.id} added")

# post a new senior
@app.post('/users/tutor/{tutor_username}/seniors/{senior_id}',response_model=Senior, status_code=status.HTTP_201_CREATED)
def create_a_senior(senior: Senior, senior_id:int, tutor_username:str):

    db_senior=db.query(models.User_aide).filter(models.User_aide.id==senior_id).first()
    db_tutor=db.query(models.User_aide).filter(models.User_aide.username==tutor_username).first()
    db_senior_senior=db.query(models.Senior).filter(models.Senior.id==senior_id).first()
    tutor_id=db.query(models.User_aide).filter(models.User_aide.username==tutor_username).first().id
    
    if db_senior is None:
        raise HTTPException(status_code=400,detail="User does not exists")
    
    if db_senior.type=='tutor':
        raise HTTPException(status_code=400,detail="User is a tutor, can't be a senior of " +tutor_username)
    
    if db_tutor is None:
        raise HTTPException(status_code=400,detail="Tutor does not exists")
    
    if db_senior_senior: #si esta en la tabla de los seniors no se pondrá otra vez
        raise HTTPException(status_code=400,detail="User is already a senior.")
    
    if tutor_id==senior_id:
        raise HTTPException(status_code=400,detail="Tutor can't be a tutor of the tutor.")

    new_senior=models.Senior(
        id=db_senior.id,
        total_playing_time="00:00:00",
        hour_start_avg="00:00:00",
        hour_finish_avg="00:00:00",
        score_avg=0,
        tutor_id= db_tutor.id,
        sex=senior.sex,
        birth_year=senior.birth_year,
        birth_place=senior.birth_place,
        descendants_num=senior.descendants_num,
        sons_num=senior.sons_num,
        daughters_num=senior.daughters_num,
        siblings_num=senior.siblings_num,
        brothers_num=senior.brothers_num,
        sisters_num=senior.sisters_num,
        partner_name=senior.partner_name,
        father_name=senior.father_name,
        mother_name=senior.mother_name
    )
    
    db.add(new_senior)
    db.commit()

    return Response(content=f"New senior with id {new_senior.id} added")

# post a photo
@app.post('/photos',response_model=Photo, status_code=status.HTTP_201_CREATED)
def create_a_photo(photo: Photo, response: Response):

    query = text('SELECT MAX(id) FROM Photo')
    db_id = db.execute(query).scalar()
    
    new_photo=models.Photo(
        id=db_id + 1,
        description=photo.description,
        photo_file=photo.photo_file,
        upload=photo.upload,
        senior=photo.senior
    )
    # codificar la
    db.add(new_photo)
    db.commit()

    return Response(content=f"New photo with id {new_photo.id} added")



# post a senior_activity (asociar a un senior sus actividades customizadas)
@app.post('/associate_customized_activities/{senior_id}',response_model=SeniorActivity, status_code=status.HTTP_201_CREATED)
def associate_customized_activity_to_senior(senior_id: int):

    customized_acts=db.query(models.CustomizedAct).all()
    if customized_acts is None:
        raise HTTPException(status_code=400,detail="There're no customized activities")
    
    for activity in customized_acts:
        new_senior_activity=models.SeniorActivity(
            id_senior=senior_id,
            id_activity=activity.id
        )
        # codificar la
        db.add(new_senior_activity)
        db.commit()

    return Response(content=f"Customized activities added to senior {new_senior_activity.id_senior}")



# post a person
@app.post('/people',response_model=Person, status_code=status.HTTP_201_CREATED)
def create_a_person(person:Person):

    db_person=db.query(models.Person).filter(models.Person.id==person.id).first()
    query = text('SELECT MAX(id) FROM Person')
    db_id = db.execute(query).scalar()
    
    if db_person is not None:
        raise HTTPException(status_code=400,detail="Person already exists")
    
    new_person=models.Person(
        id=db_id + 1,
        name=person.name,
        surname=person.surname,
        sex=person.sex,
        skin_color=person.skin_color,
        eyes_color=person.eyes_color,
        familiar_rank=person.familiar_rank,
        id_senior=person.id_senior
    )

    db.add(new_person)
    db.commit()

    return Response(content=f"New person with id {new_person.id} added.")


# post de un report de una actividad
@app.post('/activities/{id_activity}/report_by_senior_id/{id_senior}',response_model=ReportActivity, status_code=status.HTTP_201_CREATED)
def create_a_report(report:ReportActivity, id_senior:int, id_activity:int):
    
    #cogemos de todos sus reports el que tenga el number_of_tries más grande
    max_tries_query = db.query(func.max(models.ReportActivity.number_of_tries)).filter(
        models.ReportActivity.senior_id == id_senior,
        models.ReportActivity.activity_id == id_activity
    )
    # numero de intentos más grande 
    max_tries = max_tries_query.scalar()
    if max_tries is None: 
            max_tries = 0
    
    db_senior=db.query(models.User_aide).filter(models.User_aide.id==id_senior).first()
    db_activity=db.query(models.Activity).filter(models.Activity.id==id_activity).first()
    
    if db_senior is None:
        raise HTTPException(status_code=400,detail="User does not exists")
    
    if db_activity is None:
        raise HTTPException(status_code=400,detail="Activity does not exists")
    
    
    if max_tries is 0:
        new_report = models.ReportActivity(
            time_playing=report.time_playing,
            number_of_tries=1, #incrmeentamos en uno el número de intentos
            score=report.score,
            senior_id=id_senior,
            activity_id=id_activity,
            num_act_answers=report.num_act_answers
        )
    else:
        new_report = models.ReportActivity(
        time_playing=report.time_playing,
        number_of_tries=max_tries+1, #incrmeentamos en uno el número de intentos
        score=report.score,
        senior_id=id_senior,
        activity_id=id_activity,
        num_act_answers=report.num_act_answers
    )

    db.add(new_report)
    db.commit()

    return Response(content=f"New report from senior {id_senior} to {id_activity} activity added.")



# post a position in a photo
@app.post('/photos/{id_photo}/people/{id_person}/position',response_model=Position, status_code=status.HTTP_201_CREATED)
def create_a_position(id_photo:int,id_person:int,position:Position):

    photo=db.query(models.Photo).filter(models.Photo.id==id_photo).first()
    person=db.query(models.Person).filter(models.Person.id==id_person).first()
    
    if photo is None:
        raise HTTPException(status_code=400,detail="Photo not found")
    
    elif person is None:
        raise HTTPException(status_code=400,detail="Person not found")
    
    else:
        db_position=db.query(models.Position).filter(models.Position.id_photo==id_photo).filter(models.Position.id_person==id_person).first()
        
        if db_position:
            raise HTTPException(status_code=400,detail="Position with the id_person and the id_photo already exists")

    new_position=models.Position(
        id_photo=position.id_photo,
        id_person=position.id_person,
        clue=position.clue,
        w=position.w,
        h=position.h,
        x_inf=position.x_inf,
        y_inf=position.y_inf,
        x_sup=position.x_sup,
        y_sup=position.y_sup,
        hair_color=position.hair_color,
        voice_record=position.voice_record,
        sunglasses=position.sunglasses,
        glasses=position.glasses,
        clothes_color=position.clothes_color
    )
    

    db.add(new_position)
    db.commit()

    return Response(content=f"New position with person {new_position.id_person} in photo {new_position.id_photo} added")


# PUT -----------------------------------------------------------------------------------

# update description in a photo
@app.put('/photos/{photo_id}/description',response_model=Photo,status_code=status.HTTP_200_OK)
def update_a_photo_description(photo_id:int,photo:Photo, db = Depends(get_db)):
    photo_to_update=db.query(models.Photo).filter(models.Photo.id==photo_id).first()

    if photo_to_update is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Photo not found")
    else:
        photo_to_update.description=photo.description
        photo_to_update.upload = photo.upload
    
    db.commit()
    
    return Response(content=f"Photo with id {photo_id} updated")

# # update de la score, el time_playing y el number_of_tries de un report
# @app.put('/activities/{activity_id}/report_by_senior_id/{senior_id}',response_model=ReportActivity,status_code=status.HTTP_200_OK)
# def update_a_report(activity_id:int,senior_id: int, report:ReportActivity):    
#     query = text('SELECT number_of_tries FROM report_activity WHERE activity_id = :activity_id AND senior_id = :senior_id')
#     db_number_of_tries = db.execute(query, {"activity_id": activity_id, "senior_id": senior_id}).scalar()

#     report_to_update = db.query(models.ReportActivity).filter(models.ReportActivity.senior_id == senior_id).filter(models.ReportActivity.activity_id == activity_id).first()
#     activity=db.query(models.Activity).filter(models.Activity.id == activity_id).first()
#     senior=db.query(models.User_aide).filter(models.User_aide.id == senior_id).first()
    

#     if activity is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Activity not found")
#     elif senior is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Senior not found")
#     else:
#         report_to_update.score = report.score
#         report_to_update.time_playing = report.time_playing
#         report_to_update.number_of_tries = db_number_of_tries + 1

#     db.commit()
    
#     return Response(content=f"Report for activity {activity_id} from user {senior_id} updated")

# # update total_playing_time, hour_start_avg, hour_finish_avg and score_avg
# @app.put('/seniors/{senior_id}/total_playing_time__hour_start_avg__hour_finish_avg__score_avg_update',response_model=Senior,status_code=status.HTTP_200_OK)
# def update_a_senior(senior_id: int):    
#     senior_to_update=db.query(models.Senior).filter(models.Senior.id == senior_id).first()
    
#     if senior_to_update is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Senior not found")

#     #suma de todos sus reports.score
#     score_query = db.query(
#         func.sum(models.ReportActivity.score).label('total_score'),
#         func.count(models.ReportActivity.id).label('num_reports')
#     ).filter(models.ReportActivity.senior_id == senior_id).first()
    
#     #suma de todos sus reports.time_playing
#     played_time_query = db.query(
#         func.sum(models.ReportActivity.time_playing).label('total_playing_time'),
#         func.count(models.ReportActivity.id).label('num_reports')
#     ).filter(models.ReportActivity.senior_id == senior_id).first()

#     average_score = score_query.total_score / score_query.num_reports
#     average_played_time = played_time_query.total_playing_time / played_time_query.num_reports

#     if score_query is None or played_time_query is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="There are not reports from this senior yet")
#     else:
#         senior_to_update.total_playing_time = average_played_time
#         senior_to_update.score_avg = average_score
        
#         db.commit()
        
#         return Response(content=f"Senior total_playing_time, hour_start_avg, hour_finish_avg and score_avg with id {senior_id} updated")
# #TODO: no registra cuando empieza a jugar (hora) y cuando deja de jugar (hora) ??? seria al iniciar sesión o al cerrarla, pro no he hecho eso


# # update a position on a specific person in a specific photo
# @app.put('/photos/{photo_id}/people/{person_id}',response_model=Position,status_code=status.HTTP_200_OK)
# def update_person_position_from_a_photo(photo_id:int, person_id:int, position:Position):
#     person_position_to_update=db.query(models.Position).filter(models.Position.id_photo==photo_id and models.Position.id_person==person_id).first()
    
#     if person_position_to_update is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Position not found")
    
#     else:
#         person_position_to_update.id_photo=position.id_photo
#         person_position_to_update.id_person=position.id_person
#         person_position_to_update.clue=position.clue
#         person_position_to_update.w=position.w
#         person_position_to_update.h=position.h
#         person_position_to_update.x_inf=position.x_inf
#         person_position_to_update.y_inf=position.y_inf
#         person_position_to_update.x_sup=position.x_sup
#         person_position_to_update.y_sup=position.y_sup
#         person_position_to_update.hair_color=position.hair_color
#         person_position_to_update.voice_record=position.voice_record
#         person_position_to_update.sunglasses=position.sunglasses
#         person_position_to_update.glasses=position.glasses
#         person_position_to_update.clothes_color=position.clothes_color

#     db.commit()

#     return Response(content=f"Position with photo_id {photo_id} and person_id {person_id} updated")




# DELETE -----------------------------------------------------------------------------------

# delete photo
@app.delete('/photos/{photo_id}')
def delete_photo(photo_id:int):
    # primero tengo que eliminakr con una query las posiciones de la tabla que pertenezcan a esa photo
    sql_query = text("DELETE FROM position WHERE id_photo = :photo_id")
    db.execute(sql_query, {"photo_id": photo_id})
    
    # si la photo está referenciada en photo_custpmized también la eliminamos
    photo_to_delete=db.query(models.Photo).filter(models.Photo.id==photo_id).first()

    if photo_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Photo not found")

    db.delete(photo_to_delete)
    db.commit()

    return Response(content=f"Photo with id {photo_id} deleted")

# delete senior
@app.delete('/users/seniors/{senior_id}')
def delete_senior(senior_id:int):
    
    user_to_delete=db.query(models.User_aide).filter(models.User_aide.id==senior_id).first()
    senior_to_delete=db.query(models.Senior).filter(models.Senior.id==senior_id).first()
    
    if user_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    elif senior_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="The senior is not a senior")
    else:

        #coger en una variable sus fotos e ir recorriendolas eliminando de la tabla posiciones las que tengan id_photo tal
        # y la misma foto donde senior sea senior_id
        photos=db.query(models.Photo).filter(models.Photo.senior==senior_id).all()
        for photo in photos:
            photo_id = photo.id  # Obtén el ID de la foto actual
            # Elimina las posiciones con id_photo igual a photo_id
            sql_query = text("DELETE FROM position WHERE id_photo = :photo_id")
            db.execute(sql_query, {"photo_id": photo_id})
            # Luego, elimina la propia foto
            db.delete(photo)

        # eliminar a las personas que salen en sus fotos
        sql_query = text("DELETE FROM person WHERE id_senior = :senior_id")
        db.execute(sql_query, {"senior_id": senior_id})

        # eliminar sus report activity
        sql_query = text("DELETE FROM report_activity WHERE senior_id = :senior_id")
        db.execute(sql_query, {"senior_id": senior_id})

        # eliminar sus senior activity
        sql_query = text("DELETE FROM senior_activity WHERE id_senior = :senior_id")
        db.execute(sql_query, {"senior_id": senior_id})
        
        # eliminar al senior de la tabla seniors
        sql_query = text("DELETE FROM senior WHERE id = :senior_id")
        db.execute(sql_query, {"senior_id": senior_id})
    

    db.delete(user_to_delete)
    db.commit()

    return Response(content=f"Senior with id {senior_id} deleted")


# # delete a specific person in a specific photo
# @app.delete('/photos/{photo_id}/people/{person_id}')
# def delete_person_from_a_photo(photo_id:int, person_id:int):
#     person_to_delete=db.query(models.Position).filter(models.Position.id_photo==photo_id).filter(models.Position.id_person==person_id).first()
#     photo=db.query(models.Photo).filter(models.Photo.id==photo_id).first()
    
#     if person_to_delete is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Person not found")
#     elif photo is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Photo not found")

#     db.delete(person_to_delete)
#     db.commit()


#     return Response(content=f"Person with id {person_id} deleted from photo with id {photo_id}")
