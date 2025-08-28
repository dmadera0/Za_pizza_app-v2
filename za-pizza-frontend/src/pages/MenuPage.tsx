import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
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
  const navigate = useNavigate(); // ✅ hook

  useEffect(() => {
    getPizzas()
      .then(setPizzas)
      .catch((err) => console.error("Failed to fetch pizzas", err));
  }, []);

  const handleOrderNow = (pizzaId: number) => {
    // navigate to order page and pass the pizzaId
    navigate(`/order/${pizzaId}`);
  };

  return (
    <div className="menu-page">
      <h2>🍕 Pizza Menu</h2>

      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-card">
            <h3>{pizza.name}</h3>
            <p className="description">{pizza.description}</p>
            <p className="price">${pizza.price}</p>
            <button
              className="order-btn"
              onClick={() => handleOrderNow(pizza.id)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
