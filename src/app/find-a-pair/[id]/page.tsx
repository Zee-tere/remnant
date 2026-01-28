export default function FindPair() {
    return (
      <div className="min-h-screen bg-white px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-green-700 mb-8">Find a Pair</h1>
          
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for an item (e.g. Left Shoe, Earring)..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
  
          {/* Categories */}
          <div className="flex gap-4 mb-8">
            {["Shoes", "Earrings", "Gloves", "Others"].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                {cat}
              </button>
            ))}
          </div>
  
          {/* Item Listings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center">Image</div>
                <h2 className="text-lg font-semibold">Item Name</h2>
                <p className="text-sm text-gray-600">Brief description here.</p>
                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  View Item
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  