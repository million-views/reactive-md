# Dashboard Wireframes

> Interactive prototypes for data-heavy layouts.

## About This Recipe

Dashboards are complex, data-heavy interfaces. Use these wireframes to explore layouts, chart placements, and information hierarchy.

---

## Dashboard Layout

```jsx live


export default function DashboardLayout() {
  const [activeNav, setActiveNav] = React.useState('overview');
  
  const navItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'reports', icon: '📋', label: 'Reports' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];
  
  return (
    <div className="flex h-[400px] bg-gray-100 rounded-xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 bg-gray-900 text-white p-4">
        <div className="font-bold mb-6">Dashboard</div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeNav === item.id
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 capitalize">{activeNav}</h1>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow">
              <div className="text-gray-500 text-sm">Metric {i}</div>
              <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Stat Cards

```jsx live
const stats = [
  { label: 'Total Revenue', value: '$45,231', change: '+12.5%', up: true },
  { label: 'Active Users', value: '2,350', change: '+4.2%', up: true },
  { label: 'Bounce Rate', value: '32%', change: '-2.1%', up: false },
  { label: 'Conversion', value: '3.2%', change: '+0.5%', up: true },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="text-gray-500 text-sm">{stat.label}</div>
          <div className="text-2xl font-bold mt-1">{stat.value}</div>
          <div className={`text-sm mt-2 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
            {stat.change} vs last month
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
