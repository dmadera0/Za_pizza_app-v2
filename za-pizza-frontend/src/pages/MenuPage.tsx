import { useEffect, useState } from "react";
import { fetchPizzas } from "../api";

interface Pizza {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const data = await fetchPizzas();
        setPizzas(data);
      } catch (err) {
        console.error("Failed to fetch pizzas", err);
      } finally {
        setLoading(false);
      }
    };

    loadPizzas();
  }, []);

  if (loading) return <p>Loading menu...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Pizza Menu</h2>
      <ul className="space-y-4">
        {pizzas.map((pizza) => (
          <li key={pizza.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{pizza.name}</h3>
            {pizza.description && <p className="text-gray-600">{pizza.description}</p>}
            <p className="font-bold">${pizza.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
