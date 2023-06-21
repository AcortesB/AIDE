from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql://andi:a@127.0.0.1:5432/aide_db", 
    echo=True
)


Base=declarative_base()

SessionLocal = sessionmaker(bind=engine)