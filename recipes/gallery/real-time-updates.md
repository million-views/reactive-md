# Real-Time Updates

> Live data, presence indicators, and collaborative features.

## About This Recipe

Real-time features create engaging, collaborative experiences. This recipe explores patterns for live updates, presence, and data synchronization.

---

## Live Activity Feed

```jsx live


const activities = [
  { user: 'Alice', action: 'commented on', target: 'Design Review', time: 'just now' },
  { user: 'Bob', action: 'completed', target: 'User Research', time: '2m ago' },
  { user: 'Carol', action: 'started', target: 'API Integration', time: '5m ago' },
  { user: 'Dave', action: 'uploaded', target: 'Final Mockups', time: '10m ago' },
];

export default function LiveActivityFeed() {
  const [feed, setFeed] = React.useState(activities);
  const [newActivity, setNewActivity] = React.useState(null);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      const users = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve'];
      const actions = ['commented on', 'updated', 'viewed', 'shared'];
      const targets = ['Project X', 'Dashboard', 'Settings', 'Report'];
      
      const activity = {
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        target: targets[Math.floor(Math.random() * targets.length)],
        time: 'just now',
      };
      
      setNewActivity(activity);
      setTimeout(() => {
        setFeed((prev) => [activity, ...prev.slice(0, 4)]);
        setNewActivity(null);
      }, 500);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
        <h3 className="font-bold">Activity Feed</h3>
        <span className="flex items-center gap-1 text-green-600 text-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live
        </span>
      </div>
      
      <div className="divide-y">
        {newActivity && (
          <div className="p-4 bg-blue-50 animate-pulse">
            <span className="font-medium">{newActivity.user}</span>
            {' '}{newActivity.action}{' '}
            <span className="font-medium">{newActivity.target}</span>
          </div>
        )}
        {feed.map((item, i) => (
          <div key={i} className="p-4 hover:bg-gray-50">
            <span className="font-medium">{item.user}</span>
            {' '}{item.action}{' '}
            <span className="font-medium">{item.target}</span>
            <div className="text-xs text-gray-400 mt-1">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Presence Indicators

```jsx live


const users = [
  { name: 'Alice', avatar: '👩', status: 'online' },
  { name: 'Bob', avatar: '👨', status: 'online' },
  { name: 'Carol', avatar: '👩‍🦰', status: 'away' },
  { name: 'Dave', avatar: '🧔', status: 'offline' },
];

export default function PresenceIndicators() {
  const [presence, setPresence] = React.useState(users);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPresence((prev) =>
        prev.map((user) => ({
          ...user,
          status: ['online', 'away', 'offline'][Math.floor(Math.random() * 3)],
        }))
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-300',
  };
  
  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-lg p-4">
      <h3 className="font-bold mb-4">Team Members</h3>
      <div className="space-y-3">
        {presence.map((user) => (
          <div key={user.name} className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                {user.avatar}
              </div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[user.status]} rounded-full border-2 border-white transition-colors`}
              />
            </div>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-gray-500 capitalize">{user.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
