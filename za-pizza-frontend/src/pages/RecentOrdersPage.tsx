import { useEffect, useState } from "react";
import { getOrders } from "../api";

interface Order {
  order_id: number;
  number: number;
  total_cents: number;
  status: string;
  customer_name?: string; // ✅ new field from backend
}

export default function RecentOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then(setOrders).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recent Orders</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-3 px-4">Order #</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.order_id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{o.number}</td>
              <td className="py-2 px-4">{o.customer_name ?? "Unknown"}</td>
              <td className="py-2 px-4">{o.status}</td>
              <td className="py-2 px-4">${(o.total_cents / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
