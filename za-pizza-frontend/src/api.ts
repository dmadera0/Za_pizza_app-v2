import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; // adjust if your backend runs elsewhere

export const fetchPizzas = async () => {
  const response = await axios.get(`${API_BASE}/pizzas`);
  return response.data;
};


const api = axios.create({
  baseURL: API_BASE, // FastAPI backend
});

export default api;
