import { useEffect, useState } from "react";
import { getOrders } from "../api";
import "../App.css";

interface Order {
  order_id: number;
  number: number;
  total_cents: number;
  status: string;
  customer_name: string | null;
}

export default function RecentOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((err) => console.error("Failed to fetch orders", err));
  }, []);

  return (
    <div>
      <h2>📋 Recent Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.order_id}>
              <td>#{o.number}</td>
              <td>{o.customer_name ?? "Unknown"}</td>
              <td>{o.status}</td>
              <td>${(o.total_cents / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
