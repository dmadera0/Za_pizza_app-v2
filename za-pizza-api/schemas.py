from pydantic import BaseModel
from typing import List

class CustomerListResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True   # allows returning SQLAlchemy models directly

class CustomerDetailResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class CustomerCreate(BaseModel):
    name: str

class CustomerResponse(BaseModel):
    id: int
    name: str


class OrderItemCreate(BaseModel):
    pizza_id: int
    quantity: int


class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate]


class OrderItemResponse(BaseModel):
    pizza_id: int
    quantity: int
    line_total: int


class OrderResponse(BaseModel):
    order_id: int
    number: int
    total_cents: int
    status: str
    items: List[OrderItemResponse]

class OrderItemResponse(BaseModel):
    pizza_id: int
    quantity: int
    line_total: int

    class Config:
        orm_mode = True


class OrderListResponse(BaseModel):
    order_id: int
    number: int
    total_cents: int
    status: str

    class Config:
        orm_mode = True


class OrderDetailResponse(BaseModel):
    order_id: int
    number: int
    total_cents: int
    status: str
    items: List[OrderItemResponse]

    class Config:
        orm_mode = True