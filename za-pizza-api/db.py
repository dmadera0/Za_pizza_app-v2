#!/usr/bin/env python3
"""
Database connection setup for FastAPI app.
Explicitly Python 3 ready.
"""

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Load environment variables from .env file
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the engine with PostgreSQL
engine = create_engine(DATABASE_URL, echo=True, future=True)

# Session factory
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)

# Declarative Base for SQLAlchemy models
class Base(DeclarativeBase):
    pass
