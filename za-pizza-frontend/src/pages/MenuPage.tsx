import { useEffect, useState } from "react";
import { getPizzas } from "../api";
import "../App.css";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    getPizzas()
      .then(setPizzas)
      .catch((err) => console.error("Failed to fetch pizzas", err));
  }, []);

  return (
    <div>
      <h2 className="menu-title">🍕 Pizza Menu</h2>

      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-card">
            <h3>{pizza.name}</h3>
            <p className="description">{pizza.description}</p>
            <p className="price">${pizza.price}</p>
            <button className="order-btn">Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
