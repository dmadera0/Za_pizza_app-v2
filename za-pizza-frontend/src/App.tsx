import { Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            🍕 Za Pizza POS
          </h1>
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
          <Route path="/order" element={<h2>Order Now Page</h2>} />
          <Route path="/menu" element={<h2>Menu Page</h2>} />
          <Route path="/recent-orders" element={<h2>Recent Orders Page</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
