# Reactive MD User Guide

This guide helps you troubleshoot and optimize your experience with Reactive MD when components don't render as expected. It focuses on practical solutions for common issues and best practices for reliable previews.

## Getting Started

### Extension Settings

Reactive MD offers several configuration options to customize your experience:

- **`reactiveMd.debounceMs`** (default: 300ms): Controls live reload delay. Increase if updates feel too frequent.
- **`reactiveMd.showCodeLens`** (default: true): Shows "▶ Preview" buttons above exported components.
- **`reactiveMd.previewOverlay`** (default: "full"): Controls error card display ("full", "minimal", or "none").
- **`reactiveMd.updateMode`** (default: "live"): Choose "live" for real-time updates or "on-save" for updates only when files are saved.

Access settings via `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux) and search for "Reactive MD".

### Preview Modes

- **Markdown Preview** (`Cmd+Shift+V`): Fast, offline, shows initial component state
- **Interactive Preview** (`Cmd+K P`): Full browser environment with live reload and external packages

## Component Development

### Quick Diagnosis

When a component shows an error card instead of rendering, check these common causes first:

#### 1. File Type and Extension
- **Issue**: Only `.jsx` and `.tsx` files are supported
- **Solution**: Rename `.js` files to `.jsx` or `.ts` to `.tsx`
- **Why**: VS Code needs the extension to recognize JSX syntax

#### 2. Syntax Errors
- **Issue**: Unclosed tags, missing brackets, or invalid JSX
- **Solution**: Check VS Code's Problems panel (`View → Problems`) for syntax errors
- **Tip**: Use the Interactive Preview (`Cmd+K P`) for detailed error messages

#### 3. Export Patterns
- **Issue**: Complex or unsupported export structures
- **Solution**: Use simple `export default function` or `export function` patterns
- **Limitation**: Dynamic exports, conditional exports, or HOCs like `memo()` may not work

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

#### What to Avoid
- **Mixed exports**: Don't combine `export default` with named exports in the same file
- **Complex exports**: Avoid `export default memo(Component)` or conditional exports

## Data and Assets

### Local Data Files

**Don't use `fetch()` for local files** - it doesn't work in either preview mode due to security restrictions.

Instead, **use ES6 import statements**:

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

### Always Available (Bundled)
These packages work in both Markdown Preview and Interactive Preview:

- `lucide-react` - Icons
- `motion/react` - Animations  
- `dayjs` - Date formatting
- `clsx` - Conditional classes
- `uuid` - ID generation
- `es-toolkit` - Utility functions

### External Packages
- **Markdown Preview**: Only bundled packages work
- **Interactive Preview**: Most npm packages via CDN (requires internet), but some complex packages with transitive dependencies may not work
- **Tip**: Switch to Interactive Preview (`Cmd+K P`) for external dependencies

## VS Code Integration Notes

### CSS Conflicts
VS Code's markdown preview applies its own styles that can override yours:

- **Headings** (`h1-h6`): Default `font-weight: bold` ignores Tailwind's `font-light`
- **Links** (`a`): Default blue color and underline
- **Buttons**: Browser default borders

**Solutions**:
- Use `<div role="heading">` instead of `<h3>` for custom styling
- Apply `style={{ fontWeight: 300 }}` for inline overrides
- Test in Interactive Preview where VS Code styles don't apply

## Performance and Reliability

### Live Reload Settings
- Adjust debounce timing in settings if updates feel slow
- Default 300ms works for most users

### Large Files
- Very large JSX files may slow down parsing
- Consider splitting into multiple components

### State and Effects
- Module-level code runs multiple times in multi-component files
- Avoid side effects that shouldn't repeat

## Troubleshooting

### When Things Still Don't Work

1. **Check the Output Panel**: `View → Output → "Reactive MD"` for extension logs
2. **Reload VS Code**: `Cmd+Shift+P` → "Developer: Reload Window"
3. **Verify File Type**: Ensure `.jsx` or `.tsx` extension
4. **Simplify**: Remove complex patterns and test with basic component
5. **Report Issues**: Include your JSX code and error messages

### Common Issues

- **Blank screen**: Check Output panel for errors, ensure correct file extension
- **CSS not applying**: Test in Interactive Preview, check for VS Code style conflicts
- **Packages not loading**: Verify internet connection for Interactive Preview
- **Slow updates**: Increase debounce delay in settings

## Getting Help

- **Documentation**: Check examples in the extension's recipes folder
- **Issues**: Report bugs with minimal reproduction cases
- **Community**: Share working patterns and solutions

Remember: Reactive MD works best with standard React patterns. When in doubt, simplify your code and build up complexity gradually.