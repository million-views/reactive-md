# Navigation Patterns

> Navbars, sidebars, breadcrumbs, and navigation systems.

## About This Recipe

Navigation is the backbone of any application. This recipe explores common patterns for helping users find their way.

---

## Responsive Navbar

```jsx live


export default function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState('home');
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];
  
  return (
    <nav className="bg-white shadow-lg rounded-xl">
      <div className="px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="font-bold text-xl text-blue-600">Brand</div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeItem === item.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveItem(item.id); setIsOpen(false); }}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  activeItem === item.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```

## Sidebar Navigation

```jsx live


const menuItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'projects', icon: '📁', label: 'Projects' },
  { id: 'team', icon: '👥', label: 'Team' },
  { id: 'calendar', icon: '📅', label: 'Calendar' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

export default function SidebarNav() {
  const [active, setActive] = React.useState('dashboard');
  const [collapsed, setCollapsed] = React.useState(false);
  
  return (
    <div className={`bg-gray-900 text-white rounded-xl transition-all ${collapsed ? 'w-16' : 'w-48'}`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!collapsed && <span className="font-bold">Menu</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-gray-800 rounded"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
              active === item.id
                ? 'bg-blue-600'
                : 'hover:bg-gray-800'
            }`}
          >
            <span>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
```

## Breadcrumbs

```jsx live
export default function Breadcrumbs() {
  const path = ['Home', 'Products', 'Electronics', 'Headphones'];
  
  return (
    <nav className="bg-white rounded-lg p-4 shadow">
      <ol className="flex items-center gap-2 text-sm">
        {path.map((item, i) => (
          <li key={item} className="flex items-center gap-2">
            {i > 0 && <span className="text-gray-400">/</span>}
            <a
              href="#"
              className={`${
                i === path.length - 1
                  ? 'text-gray-900 font-medium'
                  : 'text-blue-600 hover:underline'
              }`}
            >
              {item}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
