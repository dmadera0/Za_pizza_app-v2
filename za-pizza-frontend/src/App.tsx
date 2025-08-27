import { Routes, Route, Link } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import OrderNowPage from "./pages/OrderNowPage";
import RecentOrdersPage from "./pages/RecentOrdersPage";

function App() {
  return (
    <div className="min-h-screen bg-white p-6">
      <header className="flex items-center space-x-4 mb-6">
        <span className="text-3xl">🍕</span>
        <h1 className="text-3xl font-bold">Za Pizza POS</h1>
      </header>

      {/* Navigation */}
      <nav className="flex space-x-6 mb-6 text-lg font-medium">
        <Link to="/" className="hover:text-red-500">Menu</Link>
        <Link to="/order" className="hover:text-red-500">Order Now</Link>
        <Link to="/recent" className="hover:text-red-500">Recent Orders</Link>
      </nav>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/order" element={<OrderNowPage />} />
        <Route path="/recent" element={<RecentOrdersPage />} />
      </Routes>
    </div>
  );
}

export default App;
