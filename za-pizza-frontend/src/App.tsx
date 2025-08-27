// src/App.tsx

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
              <a
                href="#order"
                className="text-gray-700 hover:text-red-500 font-medium"
              >
                Order Now
              </a>
            </li>
            <li>
              <a
                href="#menu"
                className="text-gray-700 hover:text-red-500 font-medium"
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="#orders"
                className="text-gray-700 hover:text-red-500 font-medium"
              >
                Recent Orders
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Welcome to Za Pizza POS!</h2>
        <p className="text-gray-600">
          Use the navigation above to place an order, view the menu, or check
          recent orders.
        </p>
      </main>
    </div>
  );
}

export default App;
