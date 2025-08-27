import React, { useEffect, useState } from "react";
import axios from "axios";

interface Pizza {
  id: number;
  name: string;
  price_cents: number;
}

const Pizzas: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/pizzas")
      .then(response => {
        setPizzas(response.data);
      })
      .catch(error => {
        console.error("Error fetching pizzas:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Pizzas</h2>
      <ul className="space-y-2">
        {pizzas.map((pizza) => (
          <li key={pizza.id} className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between">
              <span className="font-medium">{pizza.name}</span>
              <span>${(pizza.price_cents / 100).toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pizzas;
