import { useEffect, useState } from "react";
import { getPizzas, createCustomer, createOrder } from "../api";

interface Pizza {
  id: number;
  name: string;
  description: string;
  price_cents: number;
}

export default function OrderNowPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [name, setName] = useState("");
  const [selectedPizza, setSelectedPizza] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getPizzas().then(setPizzas).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selectedPizza) {
      setMessage("Please enter your name and select a pizza.");
      return;
    }

    try {
      // Step 1: Create the customer
      const customer = await createCustomer({ name });

      // Step 2: Create the order
      const order = await createOrder({
        customer_id: customer.id,
        items: [{ pizza_id: selectedPizza, quantity: 1 }],
      });

      setMessage(`✅ Order #${order.number} placed successfully!`);
      setName("");
      setSelectedPizza(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to place order.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Now</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Choose Pizza</label>
          <select
            value={selectedPizza ?? ""}
            onChange={(e) => setSelectedPizza(Number(e.target.value))}
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="">-- Select a pizza --</option>
            {pizzas.map((pizza) => (
              <option key={pizza.id} value={pizza.id}>
                {pizza.name} (${(pizza.price_cents / 100).toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Complete Order
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
