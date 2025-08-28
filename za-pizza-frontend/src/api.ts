import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

// Fetch all pizzas
export async function getPizzas() {
  const res = await axios.get(`${API_BASE}/pizzas`);
  return res.data;
}

// Create a new customer
export async function createCustomer(data: { name: string }) {
  const res = await axios.post(`${API_BASE}/customers`, data);
  return res.data;
}

// Create a new order
export async function createOrder(data: {
  customer_id: number;
  items: { pizza_id: number; quantity: number }[];
}) {
  const res = await axios.post(`${API_BASE}/orders`, data);
  return res.data;
}

// Fetch all orders
export async function getOrders() {
  const res = await axios.get(`${API_BASE}/orders`);
  return res.data;
}
