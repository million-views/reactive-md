# Mobile App Concept

> Responsive mobile-first design patterns.

## About This Case Study

Mobile-first design ensures great experiences across all devices. This case study explores a complete mobile app concept with responsive considerations.

---

## Interactive Prototype

```jsx live


export default function MobileAppConcept() {
  const [activeTab, setActiveTab] = React.useState('home');
  const [showMenu, setShowMenu] = React.useState(false);
  
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'add', icon: '➕', label: 'Add' },
    { id: 'inbox', icon: '💬', label: 'Inbox' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];
  
  const HomeScreen = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Good morning! ☀️</h1>
        <button
          onClick={() => setShowMenu(true)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          ☰
        </button>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              📦
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Item {i}</h3>
              <p className="text-sm text-gray-500">Description here</p>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </div>
      ))}
    </div>
  );
  
  const SearchScreen = () => (
    <div className="space-y-4">
      <input
        placeholder="Search..."
        className="w-full px-4 py-3 bg-gray-100 rounded-xl"
      />
      <div className="text-sm text-gray-500">Recent searches</div>
      {['React', 'Design', 'Mobile'].map((term) => (
        <div key={term} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
          <span className="text-gray-400">🕐</span>
          <span>{term}</span>
        </div>
      ))}
    </div>
  );
  
  const AddScreen = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">➕</div>
      <h2 className="text-xl font-bold mb-2">Create New</h2>
      <p className="text-gray-500">Add content to your feed</p>
    </div>
  );
  
  const InboxScreen = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Inbox</h2>
      {['Alice', 'Bob', 'Carol'].map((name) => (
        <div key={name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            {name[0]}
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-gray-500 truncate">Latest message...</p>
          </div>
          <span className="text-xs text-gray-400">2m</span>
        </div>
      ))}
    </div>
  );
  
  const ProfileScreen = () => (
    <div className="text-center">
      <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-3xl mb-4">
        👤
      </div>
      <h2 className="text-xl font-bold">Your Name</h2>
      <p className="text-gray-500">@username</p>
      <div className="flex justify-center gap-8 my-6">
        <div className="text-center">
          <div className="font-bold">124</div>
          <div className="text-sm text-gray-500">Posts</div>
        </div>
        <div className="text-center">
          <div className="font-bold">1.2K</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="font-bold">348</div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
      </div>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-full">
        Edit Profile
      </button>
    </div>
  );
  
  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'search': return <SearchScreen />;
      case 'add': return <AddScreen />;
      case 'inbox': return <InboxScreen />;
      case 'profile': return <ProfileScreen />;
    }
  };
  
  return (
    <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Status Bar */}
      <div className="bg-gray-900 text-white text-xs p-2 flex justify-between">
        <span>9:41</span>
        <span>📶 🔋</span>
      </div>
      
      {/* Content */}
      <div className="p-4 min-h-[400px]">
        {renderScreen()}
      </div>
      
      {/* Tab Bar */}
      <div className="flex border-t bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Home Indicator */}
      <div className="h-1 flex justify-center py-2">
        <div className="w-32 h-1 bg-gray-900 rounded-full" />
      </div>
      
      {/* Slide-out Menu */}
      {showMenu && (
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-64 bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold mb-4">Menu</h3>
            {['Settings', 'Help', 'Privacy', 'Logout'].map((item) => (
              <button key={item} className="block w-full text-left py-3 hover:text-blue-600">
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Mobile Design Principles

1. **Touch-First**: Large tap targets (44px minimum)
2. **Thumb Zone**: Important actions within easy reach
3. **Progressive Disclosure**: Show what's needed, hide complexity
4. **Offline-First**: Handle connectivity gracefully
5. **Performance**: Fast load times, smooth animations

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
