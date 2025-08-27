import { useEffect, useState } from "react";
import axios from "axios";

interface Pizza {
  id: number;
  name: string;
  price_cents: number;
}

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Pizza[]>("http://127.0.0.1:8000/pizzas")
      .then(response => {
        setPizzas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching pizzas:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold flex items-center gap-2">
        🍕 Za Pizza POS
      </h1>
      <h2 className="text-2xl font-semibold mt-4">Available Pizzas</h2>

      {loading && <p>Loading pizzas...</p>}

      <ul className="mt-4 space-y-2">
        {pizzas.map((pizza) => (
          <li
            key={pizza.id}
            className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
          >
            <span className="font-medium">{pizza.name}</span>
            <span className="text-gray-600">${(pizza.price_cents / 100).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
