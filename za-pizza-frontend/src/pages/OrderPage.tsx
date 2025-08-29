import { useEffect, useState } from "react";
import { getPizzas, createOrder } from "../api";
import "../App.css";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function OrderPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [name, setName] = useState("");
  const [pizzaId, setPizzaId] = useState<number | null>(null);

  useEffect(() => {
    getPizzas()
      .then((data) => {
        setPizzas(data);
        if (data.length > 0) {
          setPizzaId(data[0].id);
        }
      })
      .catch((err) => console.error("Failed to load pizzas", err));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pizzaId) return;

    try {
      await createOrder({
        customer_name: name,
        items: [{ pizza_id: pizzaId, quantity: 1 }],
      });
      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error("Order failed", err);
      alert("❌ Something went wrong while placing your order.");
    }
  }

  return (
    <div className="order-form">
      <h2>🍕 Create Order</h2>
      <form onSubmit={handleSubmit}>
        <label>Your Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label>Select Pizza:</label>
        <select
          value={pizzaId ?? ""}
          onChange={(e) => setPizzaId(Number(e.target.value))}
        >
          {pizzas.map((pizza) => (
            <option key={pizza.id} value={pizza.id}>
              {pizza.name} (${pizza.price})
            </option>
          ))}
        </select>

        <button type="submit" className="complete-btn">
          ✅ Complete Order
        </button>
      </form>
    </div>
  );
}
