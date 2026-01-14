# Drag and Drop

> Reordering, kanban boards, and drag interactions.

## About This Recipe

Drag and drop interactions add intuitiveness but require careful accessibility consideration. This recipe explores common patterns.

---

## Sortable List

```jsx live


const initialItems = [
  { id: 1, text: 'First item', color: 'bg-blue-100' },
  { id: 2, text: 'Second item', color: 'bg-green-100' },
  { id: 3, text: 'Third item', color: 'bg-yellow-100' },
  { id: 4, text: 'Fourth item', color: 'bg-purple-100' },
];

export default function SortableList() {
  const [items, setItems] = React.useState(initialItems);
  const [dragging, setDragging] = React.useState(null);
  
  const moveUp = (index) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setItems(newItems);
  };
  
  const moveDown = (index) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setItems(newItems);
  };
  
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-bold">Sortable List</h3>
        <p className="text-sm text-gray-500">Use arrows to reorder</p>
      </div>
      
      <div className="p-4 space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-lg ${item.color} transition-all`}
          >
            <span className="text-gray-400 cursor-grab">⋮⋮</span>
            <span className="flex-1 font-medium">{item.text}</span>
            <div className="flex gap-1">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="p-1 hover:bg-white rounded disabled:opacity-30"
              >
                ↑
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className="p-1 hover:bg-white rounded disabled:opacity-30"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Kanban Board

```jsx live


const initialBoard = {
  todo: [
    { id: 1, text: 'Research competitors' },
    { id: 2, text: 'Write user stories' },
  ],
  inProgress: [
    { id: 3, text: 'Design mockups' },
  ],
  done: [
    { id: 4, text: 'Setup project' },
  ],
};

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
  { id: 'inProgress', title: 'In Progress', color: 'bg-blue-100' },
  { id: 'done', title: 'Done', color: 'bg-green-100' },
];

export default function KanbanBoard() {
  const [board, setBoard] = React.useState(initialBoard);
  
  const moveTask = (taskId, fromCol, toCol) => {
    const task = board[fromCol].find((t) => t.id === taskId);
    if (!task) return;
    
    setBoard({
      ...board,
      [fromCol]: board[fromCol].filter((t) => t.id !== taskId),
      [toCol]: [...board[toCol], task],
    });
  };
  
  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {columns.map((col) => (
        <div key={col.id} className={`flex-shrink-0 w-48 ${col.color} rounded-xl p-3`}>
          <h4 className="font-bold mb-3">{col.title}</h4>
          <div className="space-y-2">
            {board[col.id].map((task) => (
              <div
                key={task.id}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow transition-shadow"
              >
                <p className="text-sm">{task.text}</p>
                <div className="flex gap-1 mt-2">
                  {columns
                    .filter((c) => c.id !== col.id)
                    .map((c) => (
                      <button
                        key={c.id}
                        onClick={() => moveTask(task.id, col.id, c.id)}
                        className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        → {c.title}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
