import { useEffect, useState } from "react";
import { getPizzas, createOrder } from "../api";

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

  // Load pizza menu options
  useEffect(() => {
    getPizzas()
      .then((data) => setPizzas(data))
      .catch((err) => console.error("Failed to load pizzas", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !pizzaId) {
      alert("Please enter your name and select a pizza");
      return;
    }

    try {
      await createOrder({
        customer_name: name, // ✅ use name instead of customer_id
        items: [{ pizza_id: pizzaId, quantity: 1 }],
      });

      alert("✅ Order placed successfully!");
      setName("");
      setPizzaId(null);
    } catch (err) {
      console.error("Failed to create order", err);
      alert("❌ Something went wrong while placing your order.");
    }
  };

  return (
    <div className="order-page">
      <h2>🍕 Create Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div>
          <label>Your Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Select Pizza: </label>
          <select
            value={pizzaId ?? ""}
            onChange={(e) => setPizzaId(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              -- Choose a pizza --
            </option>
            {pizzas.map((pizza) => (
              <option key={pizza.id} value={pizza.id}>
                {pizza.name} (${pizza.price})
              </option>
            ))}
          </select>
        </div>

        <button type="submit">✅ Complete Order</button>
      </form>
    </div>
  );
}
