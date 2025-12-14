# Date Formatting with dayjs

Reactive MD bundles `dayjs` — a lightweight date library.

## Basic Formatting

```jsx live
import dayjs from 'dayjs';

function DateFormats() {
  const now = dayjs();
  
  return (
    <div className="p-4 space-y-2">
      <div className="flex justify-between p-2 bg-gray-100 rounded">
        <span className="font-medium">Default:</span>
        <span>{now.format()}</span>
      </div>
      <div className="flex justify-between p-2 bg-gray-100 rounded">
        <span className="font-medium">Date only:</span>
        <span>{now.format('YYYY-MM-DD')}</span>
      </div>
      <div className="flex justify-between p-2 bg-gray-100 rounded">
        <span className="font-medium">Human readable:</span>
        <span>{now.format('MMMM D, YYYY')}</span>
      </div>
      <div className="flex justify-between p-2 bg-gray-100 rounded">
        <span className="font-medium">With time:</span>
        <span>{now.format('MMM D, YYYY h:mm A')}</span>
      </div>
    </div>
  );
}
```

## Relative Time

```jsx live
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function RelativeTimeDemo() {
  const times = [
    dayjs().subtract(2, 'minute'),
    dayjs().subtract(3, 'hour'),
    dayjs().subtract(1, 'day'),
    dayjs().subtract(2, 'week'),
    dayjs().subtract(3, 'month'),
  ];
  
  return (
    <div className="p-4">
      <h3 className="font-bold mb-3">Time Ago</h3>
      <ul className="space-y-2">
        {times.map((time, i) => (
          <li key={i} className="flex justify-between p-2 bg-gray-100 rounded">
            <span>{time.format('MMM D, h:mm A')}</span>
            <span className="text-gray-500">{time.fromNow()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Date Picker Preview

```jsx live
import dayjs from 'dayjs';

function CalendarDemo() {
  const [selected, setSelected] = React.useState(dayjs());
  
  const daysInMonth = selected.daysInMonth();
  const firstDay = selected.startOf('month').day();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, (_, i) => null);
  
  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setSelected(s => s.subtract(1, 'month'))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <span className="font-bold">{selected.format('MMMM YYYY')}</span>
        <button 
          onClick={() => setSelected(s => s.add(1, 'month'))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="font-medium text-gray-500 p-1">{d}</div>
        ))}
        {[...padding, ...days].map((day, i) => (
          <div 
            key={i} 
            className={`p-1 rounded ${day ? 'hover:bg-blue-100 cursor-pointer' : ''} ${
              day === selected.date() ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => day && setSelected(s => s.date(day))}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Key Points

- `dayjs` is bundled — works offline
- Plugins like `relativeTime` are available
- Lightweight alternative to Moment.js
- Full formatting options with `.format()`
