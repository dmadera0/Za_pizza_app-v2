import { useEffect, useState } from "react";
import { getOrders } from "../api";

interface Order {
  order_id: number;
  number: number;
  total_cents: number;
  status: string;
  customer_name?: string; // ✅ from backend
}

export default function RecentOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((err) => console.error("Failed to fetch orders", err));
  }, []);

  return (
    <div className="recent-orders-page" style={{ padding: "2rem" }}>
      <h2>📋 Recent Orders</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Order #
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Customer
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Status
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((o) => (
              <tr key={o.order_id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  #{o.number}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {o.customer_name ?? "Unknown"}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {o.status}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  ${(o.total_cents / 100).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ padding: "8px", textAlign: "center" }}>
                No recent orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
