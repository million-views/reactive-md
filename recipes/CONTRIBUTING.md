# Contributing Recipes

Guidelines for contributing examples to Reactive MD Recipes.

---

## What Makes a Good Recipe?

### 1. Demonstrate a Specific Feature

Each recipe should focus on one Reactive MD capability:
- A single `jsx live` pattern
- Local imports from the same folder
- A specific npm package integration
- A UI pattern with state management

### 2. Be Self-Contained

Recipes should work when copied to a new folder:
- Include all required files (`.md`, `.jsx`, `.css`)
- No dependencies on files outside the recipe folder
- Document any required npm packages

### 3. Show Real Patterns

Focus on things people actually build:
- Buttons, forms, cards, modals
- Loading states, error states, empty states
- Navigation patterns, data display

---

## Recipe Structure

### Simple Recipe (Single File)

```markdown
# Recipe Title

Brief description of what this demonstrates.

## The Code

```jsx live
function Demo() {
  return <div>Your component here</div>;
}
```

## Key Points

- What Reactive MD feature this shows
- Any gotchas or tips
```

### Self-Contained Recipe (Folder)

```
my-recipe/
├── README.md         # Overview and instructions
├── demo.md           # The interactive document
├── Component.jsx     # Local component(s)
└── styles.css        # Optional custom CSS
```

---

## JSX Guidelines

### Keep Components Standalone

```jsx
// ✅ Good - manages its own state
export default function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// ❌ Avoid - requires external state
export default function Counter({ count, setCount }) {
  return <button onClick={() => setCount(c + 1)}>Count: {count}</button>;
}
```

### Use Tailwind for Styling

Reactive MD includes Tailwind v4. Use utility classes:

```jsx
// ✅ Good
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>

// ❌ Avoid inline styles
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  Click me
</button>
```

### Show State Changes

Make components interactive:

```jsx
export default function ToggleButton() {
  const [on, setOn] = React.useState(false);
  
  return (
    <button 
      onClick={() => setOn(!on)}
      className={`px-4 py-2 rounded ${on ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      {on ? 'ON' : 'OFF'}
    </button>
  );
}
```

---

## Where to Put Your Recipe

| Type | Folder | Description |
|------|--------|-------------|
| Core feature | `getting-started/` | Basic Reactive MD capabilities |
| Self-contained | `local-imports/` | Folder with local .jsx and .css |
| npm package | `npm-packages/` | Using external libraries |
| PRD template | `prd-templates/` | Document structure templates |
| Visual concept | `wireframes/` | Page layouts |
| User flow | `user-journeys/` | Multi-step narratives |
| Feature idea | `feature-concepts/` | Feature proposals |
| UI pattern | `design-patterns/` | Reusable patterns |
| Complete example | `case-studies/` | Full working examples |

---

## Submitting

1. Fork this repository
2. Add your recipe to the appropriate folder
3. Test with Reactive MD (`Cmd+K P`) to verify it works
4. Submit a Pull Request

---

## Questions?

Open an issue at [github.com/million-views/reactive-md/issues](https://github.com/million-views/reactive-md/issues)
