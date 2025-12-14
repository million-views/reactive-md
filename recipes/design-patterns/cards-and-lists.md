# Cards and Lists

> Grid layouts, list views, and card patterns.

## About This Recipe

Cards and lists are fundamental building blocks for displaying collections. This recipe explores layout patterns and interaction states.

---

## Card Grid

```jsx live
const cards = [
  { id: 1, title: 'Project Alpha', desc: 'UI redesign for mobile app', status: 'Active', icon: '🚀' },
  { id: 2, title: 'Project Beta', desc: 'Backend API optimization', status: 'Review', icon: '⚡' },
  { id: 3, title: 'Project Gamma', desc: 'New feature development', status: 'Planning', icon: '📝' },
  { id: 4, title: 'Project Delta', desc: 'Performance testing', status: 'Active', icon: '🔍' },
];

export default function CardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="text-3xl">{card.icon}</div>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                card.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : card.status === 'Review'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {card.status}
            </span>
          </div>
          <h3 className="text-lg font-bold mt-4">{card.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{card.desc}</p>
          <div className="flex gap-2 mt-4">
            <button className="text-blue-600 text-sm hover:underline">View</button>
            <button className="text-gray-600 text-sm hover:underline">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## List View

```jsx live


const items = [
  { id: 1, title: 'Weekly Team Sync', time: '10:00 AM', category: 'Meeting' },
  { id: 2, title: 'Review Pull Requests', time: '2:00 PM', category: 'Task' },
  { id: 3, title: 'Client Presentation', time: '4:00 PM', category: 'Meeting' },
  { id: 4, title: 'Update Documentation', time: 'Tomorrow', category: 'Task' },
];

export default function ListView() {
  const [selected, setSelected] = React.useState([]);
  
  const toggle = (id) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-bold">Today's Tasks</h3>
        <span className="text-sm text-gray-500">{selected.length} selected</span>
      </div>
      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`p-4 flex items-center gap-4 cursor-pointer transition-colors ${
              selected.includes(item.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                selected.includes(item.id)
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300'
              }`}
            >
              {selected.includes(item.id) && '✓'}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.title}</h4>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs ${
                item.category === 'Meeting'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
