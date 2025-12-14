# Motion Animations

Reactive MD bundles the `motion` library for smooth animations.

## Basic Animation

```jsx live
import { motion } from 'motion';

function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-blue-500 text-white rounded-lg text-center"
    >
      I fade in on load!
    </motion.div>
  );
}
```

## Hover & Tap Effects

```jsx live
import { motion } from 'motion';

function InteractiveCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl cursor-pointer shadow-lg"
    >
      <h3 className="text-xl font-bold">Hover me!</h3>
      <p className="mt-2 opacity-90">Click to see the tap effect</p>
    </motion.div>
  );
}
```

## Animated List

```jsx live
import { motion } from 'motion';

function AnimatedList() {
  const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3']);
  
  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };
  
  return (
    <div className="p-4">
      <button 
        onClick={addItem}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Item
      </button>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 bg-white rounded shadow"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
```

## Key Points

- `motion` is bundled — works offline in Markdown Preview
- Use `Cmd+K P` (Interactive Preview) to see animations
- Markdown Preview shows initial state only (no animation)
