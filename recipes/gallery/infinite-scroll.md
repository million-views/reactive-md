# Infinite Scroll

> Loading patterns and pagination alternatives.

## About This Recipe

Infinite scroll can improve engagement but requires careful UX consideration for loading states, error recovery, and accessibility.

---

## Infinite List Demo

```jsx live


const generateItems = (start, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `Item ${start + i + 1}`,
    description: `Description for item ${start + i + 1}`,
  }));

export default function InfiniteScroll() {
  const [items, setItems] = React.useState(generateItems(0, 10));
  const [loading, setLoading] = React.useState(false);
  const loaderRef = React.useRef(null);
  
  const loadMore = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setItems((prev) => [...prev, ...generateItems(prev.length, 5)]);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-bold">Infinite List</h3>
        <p className="text-sm text-gray-500">{items.length} items loaded</p>
      </div>
      
      <div className="h-64 overflow-y-auto">
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
        
        {/* Load More Trigger */}
        <div ref={loaderRef} className="p-4 text-center">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <button
              onClick={loadMore}
              className="px-4 py-2 text-blue-600 hover:underline"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

## Skeleton Loading

```jsx live
export default function SkeletonLoading() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg p-4 shadow animate-pulse">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
