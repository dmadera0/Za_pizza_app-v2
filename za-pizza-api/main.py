#!/usr/bin/env python3
"""
FastAPI entrypoint for Za Pizza app.
"""

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import select

import models
import schemas
from db import SessionLocal, engine

# Create tables automatically (development only — in production, use Alembic migrations)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Za Pizza API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
    "http://127.0.0.1:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency: provide a database session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --------------------
# Health Check
# --------------------
@app.get("/health")
def health():
    return {"ok": True}


# --------------------
# Pizzas
# --------------------
@app.get("/pizzas")
def list_pizzas(db: Session = Depends(get_db)):
    pizzas = db.scalars(select(models.Pizza)).all()
    return [
        {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": float(p.price),   # convert from Decimal to JSON-friendly float
            "created_at": p.created_at.isoformat()
        }
        for p in pizzas
    ]



# --------------------
# Customers
# --------------------
@app.post("/customers", response_model=schemas.CustomerResponse)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    new_customer = models.Customer(name=customer.name)
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer

@app.get("/customers", response_model=list[schemas.CustomerListResponse])
def list_customers(db: Session = Depends(get_db)):
    customers = db.scalars(select(models.Customer)).all()
    return customers

@app.get("/customers/{customer_id}", response_model=schemas.CustomerDetailResponse)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.get(models.Customer, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer


# --------------------
# Orders
# --------------------
@app.post("/orders", response_model=schemas.OrderResponse)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    # Get latest order to generate the next order number
    latest = db.scalar(select(models.Order).order_by(models.Order.id.desc()))
    next_number = (latest.number + 1) if latest else 1001

    # Load pizzas referenced in the order
    pizza_ids = [item.pizza_id for item in order.items]
    pizzas = {
        p.id: p
        for p in db.scalars(select(models.Pizza).where(models.Pizza.id.in_(pizza_ids))).all()
    }

    if not pizzas:
        raise HTTPException(status_code=400, detail="Invalid pizza IDs")

    total = 0
    order_items = []
    for item in order.items:
        if item.pizza_id not in pizzas:
            raise HTTPException(status_code=400, detail=f"Pizza {item.pizza_id} not found")
        pizza = pizzas[item.pizza_id]
        line_total = pizza.base_price_cents * item.quantity
        total += line_total
        order_items.append(
            models.OrderItem(
                pizza_id=pizza.id,
                quantity=item.quantity,
                unit_price_cents=pizza.base_price_cents,
                line_total_cents=line_total,
            )
        )

    # Create the order
    new_order = models.Order(
        number=next_number,
        customer_id=order.customer_id,
        total_cents=total,
        status="placed",
        items=order_items,
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return {
        "order_id": new_order.id,
        "number": new_order.number,
        "total_cents": new_order.total_cents,
        "status": new_order.status,
        "items": [
            {"pizza_id": i.pizza_id, "quantity": i.quantity, "line_total": i.line_total_cents}
            for i in new_order.items
        ],
    }
@app.get("/orders", response_model=list[schemas.OrderListResponse])
def list_orders(db: Session = Depends(get_db)):
    orders = db.scalars(select(models.Order)).all()
    return [
        {
            "order_id": o.id,
            "number": o.number,
            "total_cents": o.total_cents,
            "status": o.status,
        }
        for o in orders
    ]


@app.get("/orders/{order_id}", response_model=schemas.OrderDetailResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.get(models.Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return {
        "order_id": order.id,
        "number": order.number,
        "total_cents": order.total_cents,
        "status": order.status,
        "items": [
            {"pizza_id": i.pizza_id, "quantity": i.quantity, "line_total": i.line_total_cents}
            for i in order.items
        ],
    }



# --------------------
# Entrypoint (so you can run `python3 main.py`)
# --------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
