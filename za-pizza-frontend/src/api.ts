import axios from "axios";

const API_BASE = "http://localhost:3000/api"; // adjust if your backend runs elsewhere

export const fetchPizzas = async () => {
  const response = await axios.get(`${API_BASE}/pizzas`);
  return response.data;
};


const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // FastAPI backend
});

export default api;
