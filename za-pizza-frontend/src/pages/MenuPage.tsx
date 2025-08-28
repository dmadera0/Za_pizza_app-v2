import React, { useEffect, useState } from "react";
import { fetchPizzas } from "../api";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
}

const MenuPage: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const data = await fetchPizzas();
        setPizzas(data);
      } catch (err) {
        console.error("Failed to fetch pizzas", err);
        setError("Could not load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadPizzas();
  }, []);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>🍕 Pizza Menu</h1>
      <div style={{ display: "grid", gap: "1.5rem", marginTop: "2rem" }}>
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              backgroundColor: "#fff",
            }}
          >
            <h2 style={{ margin: "0 0 0.5rem" }}>{pizza.name}</h2>
            <p style={{ margin: "0 0 1rem", color: "#555" }}>
              {pizza.description}
            </p>
            <strong style={{ fontSize: "1.1rem" }}>
              ${pizza.price.toFixed(2)}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
