# TypeScript Support

Reactive MD fully supports `.tsx` files and TypeScript in code fences.

## TSX Code Fence

```tsx live
interface User {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

function UserCard({ user }: { user: User }) {
  const roleColors: Record<User['role'], string> = {
    admin: 'bg-red-100 text-red-800',
    user: 'bg-blue-100 text-blue-800',
    guest: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold">
          {user.name[0]}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <span className={`ml-auto px-2 py-1 text-xs font-medium rounded ${roleColors[user.role]}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
}

function Demo() {
  const users: User[] = [
    { name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'user' },
    { name: 'Charlie', email: 'charlie@example.com', role: 'guest' },
  ];

  return (
    <div className="space-y-3 p-4">
      {users.map((user) => (
        <UserCard key={user.email} user={user} />
      ))}
    </div>
  );
}
```

## Generic Components

```tsx live
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul className="divide-y divide-gray-200 border rounded-lg overflow-hidden">
      {items.map((item, index) => (
        <li key={index} className="p-3 bg-white hover:bg-gray-50">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

function Demo() {
  const fruits = ['🍎 Apple', '🍊 Orange', '🍋 Lemon', '🍇 Grape'];
  
  return (
    <div className="p-4 max-w-xs">
      <List 
        items={fruits} 
        renderItem={(fruit) => (
          <span className="font-medium">{fruit}</span>
        )}
      />
    </div>
  );
}
```

## Key Points

- Use `tsx live` for TypeScript fences
- Type annotations are stripped at render time
- Interfaces and type aliases work normally
- Generics are fully supported
- CodeLens ("▶ Preview") works on `.tsx` files
