# Reactive MD User Guide

Practical solutions for common issues and best practices for reliable previews.

## Component Development

### React Imports

**Do not import React explicitly** in `.jsx`, `.tsx` files, or `jsx live` markdown fences - it's already globally available:

```jsx
// ❌ Wrong: Causes "React has already been declared" error
import React from 'react';

export default function MyComponent() {
  return <div>Hello World</div>;
}
```

```jsx
// ✅ Correct: React is automatically available
export default function MyComponent() {
  return <div>Hello World</div>;
}
```

**However, React hooks and other APIs must be imported explicitly:**

```jsx
// ✅ Correct: Import hooks and other React APIs
import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return <div>Hello World</div>;
}
```

**Why?** JSX automatic mode provides React globally, but hooks must be imported explicitly.

### Quick Diagnosis

When components show error cards instead of rendering:

**File Extension**: Only `.jsx` and `.tsx` files work (VS Code needs this to recognize JSX syntax)

**Syntax Errors**: Check the Problems panel (`View → Problems`), or use Interactive Preview (`Cmd+K P`) for detailed messages

**Export Patterns**: Use simple `export default function` or `export function`. Avoid `memo()`, conditional exports, or dynamic exports

### Component Structure Best Practices

#### For Single Components with Helpers
```jsx
// ✅ Recommended: Helpers before or after main export
import { useState } from 'react';

function HelperComponent() {
  return <div>Helper content</div>;
}

export default function MainComponent() {
  return (
    <div>
      <HelperComponent />
      Main content
    </div>
  );
}
```

#### For Multiple Components
```jsx
// ✅ Recommended: Named exports for libraries
export function Button({ children }) {
  return <button className="btn">{children}</button>;
}

export function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
```

#### For Inline Markdown Live Fences
````markdown
<!-- ✅ Recommended: Wrap helpers in parent component -->
```jsx live
function Demo() {
  function Button({ children, variant = 'primary' }) {
    return <button className="btn">{children}</button>;
  }

  return (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}
```

<!-- ❌ Wrong: Helper function + top-level JSX (ambiguous entry point) -->
```jsx live
function Button({ children }) {
  return <button>{children}</button>;
}

<div>
  <Button>Click me</Button>
</div>
```
````

**Why?** The renderer needs a single entry point. Wrapping helpers in a parent component avoids ambiguity.

#### What to Avoid
- Mixed `export default` with named exports in the same file
- Complex exports: `export default memo(Component)` or conditional exports
- Helper functions + top-level JSX in inline fences

## Data Files

### Local Files

**Don't use `fetch()` for local files** (security restrictions block it). Use import statements instead:

```jsx
// ✅ Correct: Import local JSON
import data from './data.json';

export default function MyComponent() {
  return <div>{data.items.map(item => <span>{item.name}</span>)}</div>;
}
```

```jsx
// ❌ Wrong: fetch() doesn't work
export default function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('./data.json').then(r => r.json()).then(setData);
  }, []);

  return <div>{data?.items.map(item => <span>{item.name}</span>)}</div>;
}
```

### Remote Data

- **Markdown Preview**: No network access - use static data or imports
- **Interactive Preview**: Full network access - `fetch()` works normally

## Package and Dependency Management

### Bundled (Both Preview Modes)
`lucide-react`, `motion/react`, `dayjs`, `clsx`, `uuid`, `es-toolkit`

### External (Interactive Preview Only)
Require internet: `@heroicons/react`, `zustand`, `jotai`, `tailwind-merge`, `react-hook-form`

### Broken Packages
`recharts`, `swr`, `@tanstack/react-query` - missing dependencies or React conflicts

## Styling and Design Systems

### Design System Imports

**Component Library**: `reactive-md.css` (`.wf-card`, `.wf-hero`, `.wf-btn`)

**Token Systems**: Swap tokens to change fidelity (low-fi wireframe vs high-fi polished):

```css live
/* Step 1: Import tokens (determines visual fidelity) */
@import '../design-systems/wireframe/tokens.css';     /* Low-fi: monospace, grayscale */
/* OR */
@import '../design-systems/elementary/tokens.css';    /* High-fi: branded, polished */

/* Step 2: Import components (work with ANY token system) */
@import '../design-systems/reactive-md.css';          /* .wf-card, .wf-hero, etc. */
```

**For custom components using tokens directly**:

```css live
@import '../design-systems/elementary/tokens.css';

.my-card {
  background: var(--bg-surface);
  color: var(--c-text);
  padding: var(--p-card);
}
```

**Key insight**: `reactive-md.css` is a component library, NOT a fidelity level. Tokens determine whether components look like sketches or polished designs.

### CSS Cascade Issues

#### VS Code Markdown Preview Conflicts
VS Code's markdown preview applies default styles that override yours:

**Problem areas**:
- **Headings** (`h1-h6`): Default `font-weight: bold` ignores Tailwind's `font-light`
- **Links** (`a`): Default blue color and underline
- **Buttons**: Browser default borders

**Solutions**:
```jsx
// Option 1: Use semantic HTML with inline styles
<div role="heading" style={{ fontWeight: 300 }}>Light Heading</div>

// Option 2: Test in Interactive Preview (no VS Code style conflicts)
// Cmd+K P to open Interactive Preview
```

#### Tailwind + Custom CSS Mixing
Avoid mixing Tailwind utilities with custom CSS on the same element:

```jsx
// ❌ Problematic: Class order may change, Tailwind overrides custom
<div className="custom-card bg-blue-500 p-4">...</div>

// ✅ Better: Use one system consistently
<div className="wf-card">...</div>
<div className="bg-blue-500 p-4 rounded-lg">...</div>
```

**Why**: Dynamic class order in development can cause Tailwind to override custom CSS unpredictably.

## Platform APIs and Browser Features

### Supported in Interactive Preview
These browser APIs work in Interactive Preview (requires full browser environment):

- `localStorage` / `sessionStorage`
- `IntersectionObserver`
- `ResizeObserver`
- `Geolocation API`
- `Clipboard API`

### Limitations in Markdown Preview
Markdown Preview uses static SSR rendering with limited browser APIs. Switch to Interactive Preview (`Cmd+K P`) for full platform API access.

---

## Performance

### Live Reload
Default debounce: 300ms. Increase via `reactiveMd.debounceMs` if updates feel too frequent.

### Module-Level Side Effects
Avoid side effects at module level (they run multiple times on hot reload):

```jsx
// ❌ Wrong: Runs on every hot reload
console.log('Module loaded');
const timestamp = Date.now();

export default function Demo() { ... }
```

```jsx
// ✅ Correct: Side effects in useEffect
import { useEffect } from 'react';

export default function Demo() {
  useEffect(() => {
    console.log('Component mounted');
  }, []);
}
```

### Large Files
Very large JSX files may slow parsing - consider splitting into multiple components.

## Troubleshooting

### Quick Checklist

1. ✅ File extension is `.jsx` or `.tsx`?
2. ✅ Not importing React (`import React from 'react'`)?
3. ✅ Using `import` not `fetch()` for local files?
4. ✅ Simple export pattern (`export default function`)?
5. ✅ Single entry point in inline fences?
6. ✅ Check Output panel (`View → Output → "Reactive MD"`)?
7. ✅ Try Interactive Preview (`Cmd+K P`) for detailed errors?

**When in doubt**: Simplify to a basic component, then add complexity gradually.

### When Things Still Don't Work

1. **Check the Output Panel**: `View → Output → "Reactive MD"` for extension logs
2. **Reload VS Code**: `Cmd+Shift+P` → "Developer: Reload Window"
3. **Verify File Type**: Ensure `.jsx` or `.tsx` extension
4. **Simplify**: Remove complex patterns and test with basic component
5. **Report Issues**: Include your JSX code and error messages

### Common Issues

- **Blank screen**: Check Output panel, verify `.jsx`/`.tsx` extension
- **CSS not applying**: Test in Interactive Preview (no VS Code style conflicts)
- **Packages not loading**: Check internet connection (Interactive Preview only)
- **Slow updates**: Increase `reactiveMd.debounceMs`

## Getting Help

Check recipes folder for examples. Report bugs with minimal reproduction cases.

**Best practice**: Start simple, add complexity gradually.