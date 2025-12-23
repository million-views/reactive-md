# Search to Purchase

> Discovery → Details → Buy

## About This Recipe

The search-to-purchase journey is fundamental to e-commerce. This recipe explores product discovery, comparison, and the path to conversion.

---

## Interactive Journey

```jsx live


const products = [
  { id: 1, name: 'Wireless Headphones', price: 99, rating: 4.5, image: '🎧' },
  { id: 2, name: 'Smart Watch', price: 199, rating: 4.8, image: '⌚' },
  { id: 3, name: 'Bluetooth Speaker', price: 79, rating: 4.2, image: '🔊' },
  { id: 4, name: 'Fitness Tracker', price: 59, rating: 4.6, image: '💪' },
];

export default function SearchToPurchase() {
  const [stage, setStage] = React.useState('search');
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState(null);
  
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  
  if (stage === 'purchased') {
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-600">Purchased!</h2>
        <p className="text-gray-600 mt-2">{selected.name} is on its way.</p>
        <button
          onClick={() => { setStage('search'); setSelected(null); setQuery(''); }}
          className="mt-4 text-blue-600 hover:underline"
        >
          Start Over
        </button>
      </div>
    );
  }
  
  if (stage === 'detail' && selected) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <button
          onClick={() => setStage('search')}
          className="p-4 text-blue-600 hover:underline"
        >
          ← Back to Search
        </button>
        <div className="p-6 text-center">
          <div className="text-8xl mb-4">{selected.image}</div>
          <h2 className="text-2xl font-bold">{selected.name}</h2>
          <div className="flex items-center justify-center gap-2 my-2">
            <span className="text-yellow-500">★ {selected.rating}</span>
            <span className="text-gray-400">•</span>
            <span className="text-2xl font-bold text-green-600">${selected.price}</span>
          </div>
          <p className="text-gray-600 my-4">
            Premium quality product with excellent reviews.
          </p>
          <button
            onClick={() => setStage('purchased')}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Buy Now
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <span className="absolute right-4 top-3.5 text-gray-400">🔍</span>
      </div>
      
      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((product) => (
          <button
            key={product.id}
            onClick={() => { setSelected(product); setStage('detail'); }}
            className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow text-left"
          >
            <div className="text-4xl mb-2">{product.image}</div>
            <h3 className="font-medium">{product.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-green-600 font-bold">${product.price}</span>
              <span className="text-yellow-500 text-sm">★ {product.rating}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
