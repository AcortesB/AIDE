from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from random import choice, randint
from datetime import time
from string import ascii_lowercase
from faker import Faker

from models import User, Tutor, Senior, Activity, CustomizedAct, GenericAct, ReportActivity, Photo, Person

# Crear una instancia de Faker
fake = Faker()

# Crear una conexión a la base de datos
engine = create_engine("postgresql://andi:a@127.0.0.1:5432/aide_db")  # Reemplaza con tus propias credenciales y nombre de la base de datos
Session = sessionmaker(bind=engine)
session = Session()

# Insertar 10 usuarios
for _ in range(10):
    user = User(id=fake.uuid4(), name=fake.name())
    session.add(user)

# Insertar 10 tutores
for _ in range(10):
    tutor = Tutor(id=fake.uuid4())
    tutor.user = choice(session.query(User).all())
    session.add(tutor)

# Insertar 10 seniors
for _ in range(10):
    senior = Senior(
        id=fake.uuid4(),
        total_playing_time=fake.time(),
        hour_start_avg=fake.time(),
        hour_finish_avg=fake.time(),
        score_avg=randint(0, 100)
    )
    senior.user = choice(session.query(User).all())
    senior.tutor = choice(session.query(Tutor).all())
    session.add(senior)

# Insertar 10 actividades
for _ in range(10):
    activity = Activity(
        id=fake.uuid4(),
        name=fake.word(),
        description=fake.text(),
        demo_video=fake.url(),
        num_answers=randint(0, 10)
    )
    session.add(activity)

# Insertar 10 CustomizedAct
for _ in range(10):
    customized_act = CustomizedAct(
        id=fake.uuid4(),
        activity = choice(session.query(Activity).all())
    )
    customized_act.senior = choice(session.query(Senior).all())
    session.add(customized_act)

# Insertar 10 GenericAct
for _ in range(10):
    generic_act = GenericAct(
        id=fake.uuid4(),
        activity = choice(session.query(Activity).all())
    )
    session.add(generic_act)

# Insertar 10 ReportActivity
for _ in range(10):
    report_activity = ReportActivity(
        id=fake.uuid4(),
        generate=fake.uuid4(),
        time_playing=fake.time(),
        number_of_tries=randint(0, 10),
        score=randint(0, 100)
    )
    report_activity.senior = choice(session.query(Senior).all())
    session.add(report_activity)

# Insertar 10 fotos
for _ in range(10):
    photo = Photo(
        id=fake.uuid4(),
        description=fake.text(),
        upload=fake.uuid4()
    )
    photo.tutor = choice(session.query(Tutor).all())
    session.add(photo)

# Insertar 10 posiciones
for _ in range(10):
    position = Position(
        id_photo=fake.uuid4(),
        id_person=fake.uuid4(),
        x_inf=fake.pydecimal(left_digits=10, right_digits=6),
        y_inf=fake.pydecimal(left_digits=10, right_digits=6),
        x_sup=fake
    )
