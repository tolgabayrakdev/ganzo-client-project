from .database import Base
from sqlalchemy import ForeignKey, Integer, String, DateTime, Column, Float
from sqlalchemy.orm import relationship
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    created_at = datetime