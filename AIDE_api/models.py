from database import Base
from sqlalchemy import String, Text, Boolean, Integer, Column, ForeignKey, Float, Time, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


class User_aide(Base):
    __tablename__ = "user_aide"

    id = Column("id",Integer, primary_key=True, nullable=False)
    name = Column("name",String, nullable=False)
    password = Column("password",String, nullable=False)

    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return f"({self.id}{self.name})"


class Tutor(Base):
    __tablename__ = "tutor"

    id = Column("id",Integer, ForeignKey("user_aide.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True, nullable=False)
    
    seniors=relationship('Senior', back_populates='tutor')

    def __init__(self, id):
        self.id = id

    def __repr__(self):
        return f"({self.id})"


class Senior(Base):
    __tablename__ = "senior"

    id = Column("id",Integer, ForeignKey("user_aide.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True, nullable=False)
    total_playing_time = Column("total_playing_time",Time, nullable=False)
    hour_start_avg = Column("hour_start_avg",Time, nullable=False)
    hour_finish_avg = Column("hour_finish_avg",Time, nullable=False)
    score_avg = Column("score_avg",Integer, nullable=False)
    tutor_id = Column("tutor_id",Integer, ForeignKey("tutor.id"), nullable=False) # is_associated_with
    
    tutor = relationship("Tutor", back_populates="seniors")
    customized_activities = relationship("CustomizedAct", back_populates="senior")
    reports = relationship("ReportActivity",back_populates="senior")
    #activities = relationship("Activity",secondary="SeniorActivity", back_populates="seniors")


    def __init__(self, id, total_playing_time, hour_start_avg, hour_finish_avg, score_avg, is_associated_with ):
        self.id = id
        self.total_playing_time = total_playing_time
        self.hour_start_avg = hour_start_avg
        self.hour_finish_avg = hour_finish_avg
        self.score_avg = score_avg
        self.is_associated_with = is_associated_with

    def __repr__(self):
        return f"({self.id}{self.total_playing_time}{self.hour_start_avg}{self.hour_finish_avg}{self.score_avg}{self.is_associated_with})"


class Activity(Base):
    __tablename__ = "activity"

    id = Column("id",Integer, primary_key=True, nullable=False)
    
    name = Column("name", String, nullable=False)
    description = Column("description",Text, nullable=False)
    demo_video = Column("demo_video", String, nullable=False)
    num_answers = Column("num_answers", Integer, nullable=False)
    
    reports = relationship("ReportActivity", back_populates="activity")
    #seniors = relationship("Senior",secondary="SeniorActivity", back_populates="activities")

    def __init__(self, id, name, description, demo_video, num_answers):
        self.id = id
        self.name = name
        self.description = description
        self.demo_video = demo_video
        self.num_answers = num_answers


    def __repr__(self):
        return f"({self.id}{self.name}{self.description}{self.demo_video}{self.num_answers})"


class CustomizedAct(Base):
    __tablename__ = "customized_act"

    id = Column("id",Integer, ForeignKey("activity.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True, nullable=False)
    senior_id = Column("senior_id", Integer, ForeignKey("senior.id"), nullable=False)
    senior = relationship("Senior", back_populates="customized_activities")
    #photos = relationship("Photo", secondary="PhotoCustomized", back_populates="customized_activities")
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
    senior = relationship("Senior", back_populates="reports")
    activity_id = Column("activity_id", Integer, ForeignKey("activity.id"), nullable=False)
    activity = relationship("Activity", back_populates="reports")
    
    def __init__(self, id, time_playing, number_of_tries, score, repoact_belongs_to, generate):
        self.id = id
        self.time_playing = time_playing
        self.number_of_tries = number_of_tries
        self.score = score
        self.repoact_belongs_to = repoact_belongs_to
        self.generate = generate

    def __repr__(self):
        return f"({self.id}{self.time_playing}{self.number_of_tries}{self.score}{self.repoact_belongs_to}{self.generate})"


class Photo(Base):
    __tablename__ = "photo"

    id = Column("id", Integer, primary_key=True, nullable=False)
    description = Column("description", Text, nullable=False)
    upload = Column("upload", Integer, ForeignKey("tutor.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    #people = relationship('Person', secondary='Position', back_populates="photos")
    #customized_activities = relationship("CustomizedAct", secondary="PhotoCustomized", back_populates="photos")

    def __init__(self, id, description, upload ):
        self.id = id
        self.description = description
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
    
    #photos = relationship('Photo', secondary="Position", back_populates="people")

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
    id_activity = Column("id_activity", Integer, ForeignKey("activity.id"), primary_key=True, nullable=False)

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
    