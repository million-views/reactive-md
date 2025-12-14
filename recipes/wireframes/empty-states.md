# Empty States Wireframes

> Zero-data, error, and loading state patterns.

## About This Recipe

Empty states are often overlooked but critical for user experience. These wireframes explore patterns for when there's no data, errors occur, or content is loading.

---

## Empty State Gallery

```jsx live


const emptyStates = [
  {
    id: 'no-data',
    title: 'No Data Yet',
    icon: '📭',
    message: 'You haven\'t added any items yet.',
    action: 'Add Your First Item',
  },
  {
    id: 'error',
    title: 'Something Went Wrong',
    icon: '😵',
    message: 'We couldn\'t load your data. Please try again.',
    action: 'Retry',
  },
  {
    id: 'search',
    title: 'No Results Found',
    icon: '🔍',
    message: 'We couldn\'t find anything matching your search.',
    action: 'Clear Search',
  },
  {
    id: 'success',
    title: 'All Done!',
    icon: '🎉',
    message: 'You\'ve completed all your tasks.',
    action: 'View History',
  },
];

export default function EmptyStateGallery() {
  const [active, setActive] = React.useState('no-data');
  
  const state = emptyStates.find(s => s.id === active);
  
  return (
    <div className="space-y-4">
      {/* Selector */}
      <div className="flex flex-wrap gap-2">
        {emptyStates.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              active === s.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>
      
      {/* Empty State Display */}
      <div className="bg-white rounded-xl p-12 text-center shadow-lg">
        <div className="text-6xl mb-4">{state.icon}</div>
        <h3 className="text-xl font-bold mb-2">{state.title}</h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">{state.message}</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {state.action}
        </button>
      </div>
    </div>
  );
}
```

## Loading States

```jsx live


export default function LoadingStates() {
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const timer = setInterval(() => setLoading(l => !l), 3000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500">
        Auto-toggles every 3 seconds
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {/* Skeleton Cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Loaded Cards */}
          {['Alice', 'Bob', 'Carol'].map((name) => (
            <div key={name} className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                  {name[0]}
                </div>
                <div>
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-gray-500">Team Member</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
