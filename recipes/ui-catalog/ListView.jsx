import { useState } from "react";
import tasks from './tasks.json';

export default function ListView() {
  const [selected, setSelected] = useState([]);

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
        {tasks.map((item) => (
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