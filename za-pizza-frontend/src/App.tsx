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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold flex items-center mb-6">
        <span role="img" aria-label="pizza" className="mr-2">🍕</span>
        Za Pizza POS
      </h1>

      <h2 className="text-2xl font-semibold mb-4">Available Pizzas</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {pizzas.map((pizza) => (
            <li
              key={pizza.id}
              className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
            >
              <span className="text-lg font-medium">{pizza.name}</span>
              <span className="text-gray-600">
                ${(pizza.price_cents / 100).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
