#!/usr/bin/env python3
"""
FastAPI entrypoint for Za Pizza app.
Explicitly Python 3 ready.
"""

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

import models
from db import SessionLocal, engine

# Create tables automatically (dev only; in prod use migrations)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Za Pizza API")


# Dependency to get a DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/pizzas")
def list_pizzas(db: Session = Depends(get_db)):
    pizzas = db.scalars(select(models.Pizza).where(models.Pizza.is_active == True)).all()
    return [
        {"id": p.id, "name": p.name, "price_cents": p.base_price_cents}
        for p in pizzas
    ]
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
