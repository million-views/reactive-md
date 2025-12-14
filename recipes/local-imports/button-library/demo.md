# Button Library

This demo shows how to use **local imports** — components and CSS from the same folder.

## Load Custom CSS

```css live
@import "./styles.css";
```

## Button Variants

```jsx live
import Button from './Button.jsx';

function VariantsDemo() {
  return (
    <div className="demo-card">
      <div className="demo-title">Variants</div>
      <div className="button-row">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  );
}
```

## Button Sizes

```jsx live
import Button from './Button.jsx';

function SizesDemo() {
  return (
    <div className="demo-card">
      <div className="demo-title">Sizes</div>
      <div className="button-row items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  );
}
```

## Interactive Example

```jsx live
import Button from './Button.jsx';

function InteractiveDemo() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="demo-card">
      <div className="demo-title">Interactive</div>
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => setCount(c => c - 1)}>
          −
        </Button>
        <span className="text-2xl font-bold w-12 text-center">{count}</span>
        <Button variant="primary" onClick={() => setCount(c => c + 1)}>
          +
        </Button>
      </div>
    </div>
  );
}
```

## How It Works

1. **CSS Import**: The `css live` fence loads `./styles.css`
2. **JSX Import**: Each fence imports `Button` from `./Button.jsx`
3. **Self-Contained**: Copy this folder anywhere and it works

## Key Points

- Use relative paths: `./Button.jsx`, `./styles.css`
- CSS must be loaded via `@import` in a `css live` fence
- Each fence can import different components
- Changes to `.jsx` and `.css` files trigger live reload
