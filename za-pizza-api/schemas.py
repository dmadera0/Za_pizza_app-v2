from pydantic import BaseModel
from typing import List


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
