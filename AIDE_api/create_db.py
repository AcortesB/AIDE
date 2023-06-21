from database import Base, engine
from models import User_aide, Tutor, Senior, Activity, CustomizedAct, GenericAct, ReportActivity, Photo, Position, Person, PhotoCustomized, SeniorActivity

print("Create database...")

Base.metadata.create_all(engine)
