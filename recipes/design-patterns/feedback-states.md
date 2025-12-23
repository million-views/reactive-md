# Feedback States Pattern

Common patterns for loading, success, error, and empty states.

---

## Loading States

### Skeleton Loading

Use skeletons for content that has a predictable shape:

```jsx live
export default function SkeletonCard() {
  const [loading, setLoading] = React.useState(true);
  
  return (
    <div className="space-y-4">
      <button 
        onClick={() => setLoading(!loading)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Loading: {loading ? 'ON' : 'OFF'}
      </button>
      
      <div className="max-w-sm p-4 border rounded-lg">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-bold">Card Title</h3>
            <p className="text-gray-600">Card description</p>
            <div className="h-20 bg-blue-100 rounded flex items-center justify-center">
              Content Area
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">Action</button>
              <button className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Spinner

Use spinners for indeterminate loading:

```jsx live
export default function SpinnerExamples() {
  return (
    <div className="flex gap-8 items-center">
      {/* Simple spinner */}
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-sm text-gray-500 mt-2">Basic</div>
      </div>
      
      {/* Button with spinner */}
      <button className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2" disabled>
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </button>
      
      {/* Overlay spinner */}
      <div className="relative w-32 h-24 bg-gray-100 rounded">
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
```

---

## Success States

```jsx live
export default function SuccessStates() {
  const [state, setState] = React.useState('idle');
  
  const submit = () => {
    setState('loading');
    setTimeout(() => setState('success'), 1500);
    setTimeout(() => setState('idle'), 3500);
  };
  
  return (
    <div className="space-y-4">
      {/* Inline success */}
      <div className="flex gap-4 items-start">
        <button 
          onClick={submit}
          disabled={state !== 'idle'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {state === 'loading' ? 'Saving...' : state === 'success' ? '✓ Saved!' : 'Save'}
        </button>
        
        {state === 'success' && (
          <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
            <span>✓</span> Changes saved successfully
          </div>
        )}
      </div>
      
      {/* Success card */}
      <div className="max-w-sm p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-green-600">✓</span>
        </div>
        <h3 className="font-bold text-green-900 mb-2">Payment Successful</h3>
        <p className="text-green-700 text-sm mb-4">Your order has been confirmed.</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded">View Order</button>
      </div>
    </div>
  );
}
```

---

## Error States

```jsx live
export default function ErrorStates() {
  const [hasError, setHasError] = React.useState(true);
  
  return (
    <div className="space-y-6">
      {/* Inline field error */}
      <div className="max-w-xs">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input 
          type="email" 
          value="invalid-email"
          className={`w-full px-4 py-2 border rounded ${
            hasError ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          onChange={() => setHasError(false)}
        />
        {hasError && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
        )}
      </div>
      
      {/* Error banner */}
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
        <span className="text-red-500 text-xl">⚠️</span>
        <div>
          <h4 className="font-medium text-red-900">Something went wrong</h4>
          <p className="text-red-700 text-sm">Unable to save your changes. Please try again.</p>
          <button className="mt-2 text-red-600 text-sm font-medium hover:underline">
            Retry
          </button>
        </div>
      </div>
      
      {/* Full-page error */}
      <div className="max-w-sm p-8 bg-white border rounded-lg text-center">
        <div className="text-5xl mb-4">😕</div>
        <h3 className="font-bold text-xl mb-2">Page Not Found</h3>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded">Go Home</button>
      </div>
    </div>
  );
}
```

---

## Empty States

```jsx live
export default function EmptyStates() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* First-time user */}
      <div className="p-8 bg-white border rounded-lg text-center">
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="font-bold text-lg mb-2">Get Started</h3>
        <p className="text-gray-600 text-sm mb-4">Create your first project to begin.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          + New Project
        </button>
      </div>
      
      {/* No search results */}
      <div className="p-8 bg-white border rounded-lg text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="font-bold text-lg mb-2">No Results</h3>
        <p className="text-gray-600 text-sm mb-4">Try adjusting your search or filters.</p>
        <button className="px-4 py-2 border rounded text-gray-600">
          Clear Filters
        </button>
      </div>
      
      {/* No notifications */}
      <div className="p-8 bg-white border rounded-lg text-center">
        <div className="text-5xl mb-4">🔔</div>
        <h3 className="font-bold text-lg mb-2">All Caught Up</h3>
        <p className="text-gray-600 text-sm">No new notifications.</p>
      </div>
      
      {/* No items in list */}
      <div className="p-8 bg-white border rounded-lg text-center">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="font-bold text-lg mb-2">No Tasks Yet</h3>
        <p className="text-gray-600 text-sm mb-4">Add a task to get productive.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          + Add Task
        </button>
      </div>
    </div>
  );
}
```

---

## Best Practices

| State | Do | Don't |
|-------|----|----- |
| **Loading** | Show skeleton matching content shape | Use generic spinner for everything |
| **Success** | Auto-dismiss after 3-5 seconds | Require manual dismissal |
| **Error** | Provide actionable next steps | Show technical error messages |
| **Empty** | Offer a clear CTA | Leave users stranded |

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
