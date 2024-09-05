from .database import Base
from sqlalchemy import ForeignKey, Integer, String, DateTime, Column, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role_id = Column(Integer, ForeignKey("roles.id"))
    role = relationship("Role", back_populates="users")
    created_at = datetime


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    users = relationship("User", back_populates="role")

class IPAddress(Base):
    __tablename__ = "ip_addresses"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String, unique=True, index=True, nullable=False)
    threat_level = Column(String, nullable=False)
    last_checked = Column(DateTime, server_default=func.now())
    attack_history = relationship("AttackHistory", back_populates="ip")

class Domain(Base):
    __tablename__ = "domains"

    id = Column(Integer, primary_key=True, index=True)
    domain_name = Column(String, unique=True, index=True, nullable=False)
    threat_level = Column(String, nullable=False)
    last_checked = Column(DateTime, server_default=func.now())
    attack_history = relationship("AttackHistory", back_populates="domain")

# Saldırı geçmişi modeli
class AttackHistory(Base):
    __tablename__ = "attack_history"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    date = Column(DateTime, server_default=func.now())
    ip_id = Column(Integer, ForeignKey("ip_addresses.id"))
    domain_id = Column(Integer, ForeignKey("domains.id"))
    ip = relationship("IPAddress", back_populates="attack_history")
    domain = relationship("Domain", back_populates="attack_history")
