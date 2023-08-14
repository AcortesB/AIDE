from database import Base
from sqlalchemy import String, Text, Boolean, Integer, Column, ForeignKey, Float, Time, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


class User_aide(Base):
    __tablename__ = "user_aide"

    id = Column("id",Integer, primary_key=True, nullable=False)
    name = Column("name",String, nullable=False)
    username = Column("username",String, nullable=False)
    mail = Column("mail",String, nullable=False) 
    password = Column("password",String, nullable=False)
    type = Column("type",String, nullable=False)

    def __init__(self, id, name, username, mail, password, type):
        self.id = id
        self.name = name
        self.username = username
        self.mail = mail
        self.password = password
        self.type = type

    def __repr__(self):
        return f"({self.id}{self.name}{self.username}{self.mail})"


class Tutor(Base):
    __tablename__ = "tutor"

    id = Column("id",Integer, ForeignKey("user_aide.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True, nullable=False)
    
    seniors=relationship('Senior', back_populates='tutor')

    def __init__(self, id):
        self.id = id

    def __repr__(self):
        return f"({self.id}{self.seniors})"


class Senior(Base):
    __tablename__ = "senior"

    id = Column("id",Integer, ForeignKey("user_aide.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True, nullable=False)
    total_playing_time = Column("total_playing_time",Time, nullable=False)
    hour_start_avg = Column("hour_start_avg",Time, nullable=False)
    hour_finish_avg = Column("hour_finish_avg",Time, nullable=False)
    score_avg = Column("score_avg",Integer, nullable=False)
    tutor_id = Column("tutor_id",Integer, ForeignKey("tutor.id"), nullable=False) # is_associated_with
    sex = Column("sex",String, nullable=False)
    birth_year = Column("birth_year",String, nullable=False)
    birth_place = Column("birth_place",String, nullable=False)
    descendants_num = Column("descendants_num",Integer, nullable=False)
    sons_num = Column("sons_num",Integer, nullable=False)
    daughters_num = Column("daughters_num",Integer, nullable=False)
    siblings_num = Column("siblings_num",Integer, nullable=False)
    brothers_num = Column("brothers_num",Integer, nullable=False)
    sisters_num = Column("sisters_num",Integer, nullable=False)
    partner_name = Column("partner_name",String, nullable=False)
    father_name = Column("father_name",String, nullable=False)
    mother_name = Column("mother_name",String, nullable=False)

    
    activities = relationship('Activity', secondary='senior_activity')
    tutor = relationship("Tutor", back_populates="seniors")
    customized_activities = relationship("CustomizedAct", back_populates="senior")
    reports = relationship("ReportActivity",back_populates="senior")

    def __init__(self, id, total_playing_time, hour_start_avg, hour_finish_avg, score_avg, tutor_id, sex, birth_year, birth_place, descendants_num, sons_num, daughters_num, siblings_num, brothers_num, sisters_num, partner_name, father_name, mother_name ):
        self.id = id
        self.total_playing_time = total_playing_time
        self.hour_start_avg = hour_start_avg
        self.hour_finish_avg = hour_finish_avg
        self.score_avg = score_avg
        self.tutor_id = tutor_id
        
        self.sex = sex
        self.birth_year = birth_year
        self.birth_place = birth_place
        self.descendants_num = descendants_num
        self.sons_num = sons_num
        self.daughters_num = daughters_num
        
        self.siblings_num = siblings_num
        self.brothers_num = brothers_num
        self.sisters_num = sisters_num
        self.partner_name = partner_name
        self.father_name = father_name
        self.mother_name = mother_name

    def __repr__(self):
        return f"({self.id}{self.total_playing_time}{self.hour_start_avg}{self.hour_finish_avg}{self.score_avg}{self.tutor_id}{self.sex}{self.birth_year}{self.birth_place}{self.descendants_num}{self.sons_num}{self.daughters_num}{self.siblings_num}{self.brothers_num}{self.sisters_num}{self.partner_name}{self.father_name}{self.mother_name})"


class Activity(Base):
    __tablename__ = "activity"

    id = Column("id",Integer, primary_key=True, nullable=False)
    
    name = Column("name", String, nullable=False)
    description = Column("description",Text, nullable=False)
    demo_video = Column("demo_video", String, nullable=False)
    photo_file = Column("photo_file", String, nullable=False)
    num_answers = Column("num_answers", Integer, nullable=False)
    
    
    reports = relationship("ReportActivity", back_populates="activity")
    seniors = relationship('Senior', secondary='senior_activity')
    #seniors = relationship("Senior",secondary="SeniorActivity", back_populates="activities")

    def __init__(self, id, name, description, demo_video, photo_file, num_answers):
        self.id = id
        self.name = name
        self.description = description
        self.demo_video = demo_video
        self.photo_file = photo_file
        self.num_answers = num_answers


    def __repr__(self):
        return f"({self.id}{self.name}{self.description}{self.demo_video}{self.photo_file}{self.num_answers})"


class CustomizedAct(Base):
    __tablename__ = "customized_act"

    id = Column("id",Integer, ForeignKey("activity.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True, nullable=False)
    senior_id = Column("senior_id", Integer, ForeignKey("senior.id"), nullable=False)
    senior = relationship("Senior", back_populates="customized_activities")
    #photos = relationship("Photo", secondary="PhotoCustomized", back_populates="customized_activities")
    photos = relationship('Photo', secondary='photo_customized')
    
    def __init__(self, id):
        self.id = id

    def __repr__(self):
        return f"({self.id})"


class GenericAct(Base):
    __tablename__ = "generic_act"

    id = Column("id",Integer, ForeignKey("activity.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True, nullable=False)

    def __init__(self, id):
        self.id = id

    def __repr__(self):
        return f"({self.id})"
    

class ReportActivity(Base):
    __tablename__ = "report_activity"

    id = Column("id",Integer, primary_key=True)
    time_playing = Column("time_playing", Time, nullable=False)
    number_of_tries = Column("number_of_tries", Integer, nullable=False)
    score = Column("score", Integer, nullable=False)
    senior_id = Column("senior_id", Integer, ForeignKey("senior.id"), nullable=False)
    activity_id = Column("activity_id", Integer, ForeignKey("activity.id"), nullable=False)
    
    senior = relationship("Senior", back_populates="reports")
    activity = relationship("Activity", back_populates="reports")
    
    def __init__(self, time_playing, number_of_tries, score, senior_id, activity_id):
        self.time_playing = time_playing
        self.number_of_tries = number_of_tries
        self.score = score
        self.senior_id = senior_id
        self.activity_id = activity_id

    def __repr__(self):
        return f"({self.id}{self.time_playing}{self.number_of_tries}{self.score}{self.senior_id}{self.activity_id})"


class Photo(Base):
    __tablename__ = "photo"

    id = Column("id", Integer, primary_key=True, nullable=False)
    description = Column("description", Text, nullable=False)
    photo_file = Column("photo_file", String, nullable=False)
    upload = Column("upload", Integer, ForeignKey("tutor.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    
    customized_activities = relationship('CustomizedAct', secondary='photo_customized')
    people = relationship('Person', secondary='position')

    def __init__(self, id, description, photo_file, upload ):
        self.id = id
        self.description = description
        self.photo_file = photo_file
        self.upload = upload

    def __repr__(self):
        return f"({self.id}{self.description}{self.upload})"


class Person(Base):
    __tablename__ = "person"

    id = Column("id", Integer, primary_key=True, nullable=False)
    name = Column("name", String, nullable=False)
    surname = Column("surname", String, nullable=False)
    sex = Column("sex", String, nullable=False)
    skin_color = Column("skin_color", String, nullable=False)
    eyes_color = Column("eyes_color", String, nullable=False)
    familiar_rank = Column("familiar_rank", String, nullable=False)
    
    photos = relationship('Photo', secondary='position')

    def __init__(self, id, name, surname, sex, skin_color, eyes_color, familiar_rank):
        self.id = id
        self.name = name
        self.surname = surname
        self.sex = sex
        self.skin_color = skin_color
        self.eyes_color = eyes_color
        self.familiar_rank = familiar_rank


    def __repr__(self):
        return f"({self.id}{self.name}{self.surname}{self.sex}{self.skin_color}{self.eyes_color}{self.familiar_rank})"



class Position(Base):
    __tablename__ = "position"

    id_photo = Column("id_photo", Integer, ForeignKey("photo.id"), primary_key=True, nullable=False)
    id_person = Column("id_person", Integer, ForeignKey("person.id"), primary_key=True, nullable=False) 
    x_inf = Column("x_inf", Float, nullable=False)
    y_inf = Column("y_inf", Float, nullable=False)
    x_sup = Column("x_sup", Float, nullable=False)
    y_sup = Column("y_sup", Float, nullable=False)
    hair_color = Column("hair_color", String, nullable=False)
    voice_record = Column("voice_record", String, nullable=False)
    sunglasses = Column("sunglasses", Boolean, nullable=False)
    glasses = Column("glasses", Boolean, nullable=False)
    clothes_color = Column("clothes_color", String, nullable=False)

    def __init__(self, id_photo, id_person, x_inf, y_inf, x_sup, y_sup, hair_color, voice_record, sunglasses, glasses, clothes_color):
        self.id_photo = id_photo
        self.id_person = id_person
        self.x_inf = x_inf
        self.y_inf = y_inf
        self.x_sup = x_sup
        self.y_sup = y_sup
        self.hair_color = hair_color
        self.voice_record = voice_record
        self.sunglasses = sunglasses
        self.glasses = glasses
        self.clothes_color = clothes_color

    def __repr__(self):
        return f"({self.id_photo}{self.id_person}{self.x_inf}{self.y_inf}{self.x_sup}{self.y_sup}{self.hair_color}{self.voice_record}{self.sunglasses}{self.glasses}{self.clothes_color})"
    

class PhotoCustomized(Base):
    __tablename__ = "photo_customized"

    id_photo = Column("id_photo", Integer, ForeignKey("photo.id"), primary_key=True, nullable=False)
    id_activity = Column("id_activity", Integer, ForeignKey("customized_act.id"), primary_key=True, nullable=False)
    

    def __init__(self, id_photo, id_activity):
        self.id_photo = id_photo
        self.id_activity = id_activity

    def __repr__(self):
        return f"({self.id_photo}{self.id_activity})"


class SeniorActivity(Base):
    __tablename__ = "senior_activity"

    id_senior = Column("id_senior", Integer, ForeignKey("senior.id"), primary_key=True, nullable=False)
    id_activity = Column("id_activity", Integer, ForeignKey("activity.id"), primary_key=True, nullable=False)

    def __init__(self, id_senior, id_activity):
        self.id_senior = id_senior
        self.id_activity = id_activity

    def __repr__(self):
        return f"({self.id_senior}{self.id_activity})"
    