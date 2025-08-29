import { Link, Routes, Route, Outlet } from "react-router-dom";
import OrderNowPage from "./pages/OrderNowPage";
import MenuPage from "./pages/MenuPage";
import RecentOrdersPage from "./pages/RecentOrdersPage";
import OrderPage from "./pages/OrderPage";
import "./App.css"; // ✅ make sure CSS classes apply

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Sticky Navbar */}
      <header className="header">
        <h1>🍕 Za Pizza POS</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/order">Order Now</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/recent-orders">Recent Orders</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* 🔹 Page Content */}
      <main className="max-w-4xl mx-auto mt-8 px-4">
        <Routes>
          <Route path="/" element={<h2>Welcome to Za Pizza POS!</h2>} />
          <Route path="/order" element={<OrderNowPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/recent-orders" element={<RecentOrdersPage />} />
          <Route path="/order/:pizzaId" element={<OrderPage />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
