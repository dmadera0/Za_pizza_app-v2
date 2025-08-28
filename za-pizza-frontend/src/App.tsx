import { Link, Routes, Route } from "react-router-dom";
import OrderNowPage from "./pages/OrderNowPage";
import MenuPage from "./pages/MenuPage";
import RecentOrdersPage from "./pages/RecentOrdersPage";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">🍕 Za Pizza POS</h1>
          <ul className="flex space-x-6">
            <li>
              <Link to="/order" className="text-gray-700 hover:text-red-500 font-medium">
                Order Now
              </Link>
            </li>
            <li>
              <Link to="/menu" className="text-gray-700 hover:text-red-500 font-medium">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/recent-orders" className="text-gray-700 hover:text-red-500 font-medium">
                Recent Orders
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto mt-8">
        <Routes>
          <Route path="/" element={<h2>Welcome to Za Pizza POS!</h2>} />
          <Route path="/order" element={<OrderNowPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/recent-orders" element={<RecentOrdersPage />} />
          <Route path="/order/:pizzaId" element={<OrderPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
