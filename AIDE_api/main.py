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

origins = ['http://localhost:19006','http://127.0.0.1:19006']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User_aide(BaseModel):
    id: int
    name: str
    password: str

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

    class Config:
        orm_mode = True


class Activity(BaseModel):
    id: int
    name: str
    description: str
    demo_video: str
    num_answers: int

    class Config:
        orm_mode = True


class CustomizedAct(BaseModel):
    id: int
    senior_id: int

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

    class Config:
        orm_mode = True


class Photo(BaseModel):
    id: int
    description: str
    upload: str

    class Config:
        orm_mode = True


class Position(BaseModel):
    id_photo: int
    id_person: int
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


db=SessionLocal()


# GET -----------------------------------------------------------------------------------

# get all photos
@app.get('/photos',response_model=List[Photo], status_code=200)
def get_all_photos():
    photos=db.query(models.Photo).all()

    if photos is None:
        raise HTTPException(status_code=400,detail="There're no photos")
    
    return photos


# get a photo by id
@app.get('/photos/{photo_id}',response_model=Photo,status_code=status.HTTP_200_OK)
def get_a_photo(photo_id:int):
    photo=db.query(models.Photo).filter(models.Photo.id==photo_id).first()

    if photo is None:
        raise HTTPException(status_code=400,detail="Photo not found")
    
    return photo


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
def get_all_customized_activities():
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

    if reports is None:
        raise HTTPException(status_code=400,detail="There're no reports for this activity")

    return reports


# get a senior by id
@app.get('/seniors/{senior_id}',response_model=Senior,status_code=status.HTTP_200_OK)
def get_a_senior(senior_id:int):
    senior=db.query(models.Senior).filter(models.Senior.id==senior_id).first()
    
    if senior is None:
        raise HTTPException(status_code=400,detail="Senior not found")

    return senior

# get a user by name and password, to check if it's correct TODO: by name or by user name? 
@app.get('/users/{name}/{password}',response_model=User_aide,status_code=status.HTTP_200_OK)
def get_a_user(name:str, password:str):
    user = db.query(models.User_aide).filter(models.User_aide.name == name).filter(models.User_aide.password == password).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Wrong user or password")
    
    return user

# get a specific person position in a specific photo
@app.get('/photos/{photo_id}/people/{person_id}',response_model=Position,status_code=status.HTTP_200_OK)
def get_a_position(photo_id:int, person_id:int):
    person_position=db.query(models.Position).filter(models.Position.id_photo==photo_id and models.Position.id_person==person_id).first()

    if person_position.id_photo!=photo_id or person_position.id_person!=person_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Position not found")

    return person_position

# get all the positions from a photo
@app.get('/photos/{photo_id}/people',response_model=List[Position],status_code=status.HTTP_200_OK)
def get_all_positions(photo_id:int):
    people=db.query(models.Position).filter(models.Position.id_photo==photo_id).all()

    if people is None:
        raise HTTPException(status_code=400,detail="There're no people (positions) for this photo")

    return people

# get the activities a senior played
@app.get('/senior/{senior_id}/playedactivities',response_model=List[Activity], status_code=200)
def get_all_played_activities(senior_id:int):
    senior_activities=db.query(models.SeniorActivity).filter(models.SeniorActivity.id_senior==senior_id).all()
    activities = []

    if senior_activities is None:
        raise HTTPException(status_code=400,detail="There're no played activities")

    for senior_activity in senior_activities:
        activity = db.query(models.Activity).filter(models.Activity.id == senior_activity.id_activity).first()
        if activity:
            activities.append(activity)

    return activities

# POST -----------------------------------------------------------------------------------

# post a photo
@app.post('/photos',response_model=Photo, status_code=status.HTTP_201_CREATED)
def create_a_photo(photo: Photo, response: Response):
    db_photo=db.query(models.Photo).filter(models.Photo.id==photo.id).first()
    
    if db_photo is not None:
        raise HTTPException(status_code=400,detail="Photo already exists")
    
    new_photo=models.Photo(
        id=photo.id,
        description=photo.description,
        upload=photo.upload
    )

    db.add(new_photo)
    db.commit()

    return Response(content=f"New photo with id {new_photo.id} added")


# post a person
@app.post('/people',response_model=Person, status_code=status.HTTP_201_CREATED)
def create_a_person(person:Person):
    db_person=db.query(models.Person).filter(models.Person.id==person.id).first()
    
    if db_person is not None:
        raise HTTPException(status_code=400,detail="Person already exists")
    
    new_person=models.Person(
        id=person.id,
        name=person.name,
        surname=person.surname,
        sex=person.sex,
        skin_color=person.skin_color,
        eyes_color=person.eyes_color,
        familiar_rank=person.familiar_rank
    )

    db.add(new_person)
    db.commit()

    return Response(content=f"New person with id {new_person.id} added")


# post a position
@app.post('/photos/{id_photo}/people/{id_person}/positions',response_model=Position, status_code=status.HTTP_201_CREATED)
def create_a_position(id_photo:int,id_person:int,position:Position):
    photo=db.query(models.Photo).filter(models.Photo.id==id_photo).first()
    person=db.query(models.Person).filter(models.Person.id==id_person).first()
    
    if photo is None:
        raise HTTPException(status_code=400,detail="Photo not found")
    
    elif person is None:
        raise HTTPException(status_code=400,detail="Person not found")
    
    else:
        db_person=db.query(models.Person).filter(models.Position.id_photo==id_photo and models.Position.id_person==id_person).first()
        
        if db_person is not None:
            raise HTTPException(status_code=400,detail="Position with the id_person and the id_photo already exists")
   
    new_position=models.Position(
        id_photo=position.id_photo,
        id_person=position.id_person,
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

# update something in a photo
@app.put('/photos/{photo_id}',response_model=Photo,status_code=status.HTTP_200_OK)
def update_a_photo(photo_id:int,photo:Photo):

    if photo_to_update is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Photo not found")
    else:
        photo_to_update=db.query(models.Photo).filter(models.Photo.id==photo_id).first()
        photo_to_update.description=photo.description
        photo_to_update.upload = photo.upload

    db.commit()
    
    return Response(content=f"Photo with id {photo_id} updated")


# update a position on a specific person in a specific photo
@app.put('/photos/{photo_id}/people/{person_id}',response_model=Position,status_code=status.HTTP_200_OK)
def update_person_position_from_a_photo(photo_id:int, person_id:int, position:Position):
    person_position_to_update=db.query(models.Position).filter(models.Position.id_photo==photo_id and models.Position.id_person==person_id).first()
    
    if person_position_to_update is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Position not found")
    
    else:
        person_position_to_update.id_photo=position.id_photo
        person_position_to_update.id_person=position.id_person
        person_position_to_update.x_inf=position.x_inf
        person_position_to_update.y_inf=position.y_inf
        person_position_to_update.x_sup=position.x_sup
        person_position_to_update.y_sup=position.y_sup
        person_position_to_update.hair_color=position.hair_color
        person_position_to_update.voice_record=position.voice_record
        person_position_to_update.sunglasses=position.sunglasses
        person_position_to_update.glasses=position.glasses
        person_position_to_update.clothes_color=position.clothes_color

    db.commit()

    return Response(content=f"Position with photo_id {photo_id} and person_id {person_id} updated")



# DELETE -----------------------------------------------------------------------------------

# delete photo
@app.delete('/photos/{photo_id}')
def delete_photo(photo_id:int):
    photo_to_delete=db.query(models.Photo).filter(models.Photo.id==photo_id).first()

    if photo_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Photo not found")

    db.delete(photo_to_delete)
    db.commit()

    return Response(content=f"Photo with id {photo_id} deleted")


# delete a specific person in a specific photo
@app.delete('/photos/{photo_id}/people/{person_id}')
def delete_person_from_a_photo(photo_id:int, person_id:int):
    person_to_delete=db.query(models.Position).filter(models.Position.id_photo==photo_id and models.Position.id_person==person_id).first()
    
    if person_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Person not found")

    db.delete(person_to_delete)
    db.commit()


    return Response(content=f"Person with id {person_id} deleted from photo with id {photo_id}")