import { useState, useEffect } from "react";
import { createCustomer, createOrder, getPizzas } from "../api";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function OrderPage() {
  const [name, setName] = useState("");
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<number | null>(null);

  useEffect(() => {
    getPizzas().then(setPizzas).catch(console.error);
  }, []);

  const handleSubmit = async () => {
    try {
      // Step 1: Create customer
      const customer = await createCustomer({ name });

      // Step 2: Create order with customer_id
      await createOrder({
        customer_id: customer.id,
        items: [{ pizza_id: selectedPizza!, quantity: 1 }],
      });

      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error("Order failed", err);
      alert("❌ Something went wrong while placing your order.");
    }
  };

  return (
    <div className="order-page">
      <h2>🍕 Create Order</h2>

      <label>
        Your Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </label>

      <label>
        Select Pizza:
        <select
          value={selectedPizza ?? ""}
          onChange={(e) => setSelectedPizza(Number(e.target.value))}
        >
          <option value="">-- Choose a pizza --</option>
          {pizzas.map((pizza) => (
            <option key={pizza.id} value={pizza.id}>
              {pizza.name} (${pizza.price})
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleSubmit} disabled={!name || !selectedPizza}>
        ✅ Complete Order
      </button>
    </div>
  );
}
