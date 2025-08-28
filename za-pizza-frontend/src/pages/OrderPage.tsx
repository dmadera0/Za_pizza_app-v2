import { useState, useEffect } from "react";
import { getPizzas, createOrder } from "../api";

interface Pizza {
  id: number;
  name: string;
  price: number;
}

export default function OrderPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [selectedPizza, setSelectedPizza] = useState<number | null>(null);

  useEffect(() => {
    getPizzas()
      .then(setPizzas)
      .catch((err) => console.error("Failed to load pizzas", err));
  }, []);

  const handleSubmit = async () => {
    if (!customerName || !selectedPizza) {
      alert("Please enter your name and select a pizza.");
      return;
    }

    try {
      const payload = {
        customer_name: customerName,   // ✅ matches backend
        items: [
          {
            pizza_id: selectedPizza,   // ✅ matches backend
            quantity: 1,
          },
        ],
      };

      await createOrder(payload);
      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error("Order failed", err);
      alert("❌ Something went wrong while placing your order.");
    }
  };

  return (
    <div className="order-page">
      <h2>🍕 Create Order</h2>
      <div>
        <label>
          Your Name:
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Select Pizza:
          <select
            value={selectedPizza ?? ""}
            onChange={(e) => setSelectedPizza(Number(e.target.value))}
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
        </label>
      </div>

      <button onClick={handleSubmit}>✅ Complete Order</button>
    </div>
  );
}
