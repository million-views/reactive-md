---
title: Dark Mode Toggle
author: @design-team
status: approved
date: 2024-12-13
---

# Dark Mode Toggle

## Problem Statement

Users working in low-light environments experience eye strain with our current light-only interface. Many modern apps support dark mode, and users expect it.

## Proposed Solution

A toggle in the header that switches between light and dark themes, with preference persistence.

---

## The Toggle Component

```jsx
export default function DarkModeToggle() {
  const [dark, setDark] = React.useState(false);
  
  return (
    <div className={`p-8 rounded-lg transition-colors ${dark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="flex items-center justify-between max-w-xs mx-auto">
        <span className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>
          {dark ? 'Dark Mode' : 'Light Mode'}
        </span>
        <button
          onClick={() => setDark(!dark)}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            dark ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span 
            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
              dark ? 'translate-x-7' : 'translate-x-1'
            }`}
          >
            <span className="flex items-center justify-center h-full">
              {dark ? '🌙' : '☀️'}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
```

---

## Full Page Preview

See how the toggle affects an entire interface:

```jsx
export default function PagePreview() {
  const [dark, setDark] = React.useState(false);
  
  const theme = {
    bg: dark ? 'bg-gray-900' : 'bg-white',
    text: dark ? 'text-white' : 'text-gray-900',
    textMuted: dark ? 'text-gray-400' : 'text-gray-500',
    card: dark ? 'bg-gray-800' : 'bg-gray-50',
    border: dark ? 'border-gray-700' : 'border-gray-200',
    input: dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300',
  };
  
  return (
    <div className={`${theme.bg} ${theme.text} p-6 rounded-lg transition-colors`}>
      {/* Header */}
      <div className={`flex justify-between items-center pb-4 border-b ${theme.border}`}>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={() => setDark(!dark)}
          className={`p-2 rounded-lg ${theme.card}`}
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
      
      {/* Content */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${theme.card}`}>
          <div className={`text-sm ${theme.textMuted}`}>Total Users</div>
          <div className="text-2xl font-bold">12,345</div>
        </div>
        <div className={`p-4 rounded-lg ${theme.card}`}>
          <div className={`text-sm ${theme.textMuted}`}>Revenue</div>
          <div className="text-2xl font-bold">$54,321</div>
        </div>
      </div>
      
      {/* Form */}
      <div className="mt-6">
        <label className={`block text-sm ${theme.textMuted} mb-2`}>Search</label>
        <input 
          type="text" 
          placeholder="Search..."
          className={`w-full px-4 py-2 rounded-lg border ${theme.input}`}
        />
      </div>
    </div>
  );
}
```

---

## System Preference Detection

Respect the user's OS preference on first visit:

```jsx
export default function SystemPreference() {
  const [mode, setMode] = React.useState('system');
  const [systemDark, setSystemDark] = React.useState(false);
  
  // Simulate system preference toggle
  const effectiveDark = mode === 'system' ? systemDark : mode === 'dark';
  
  return (
    <div className={`p-6 rounded-lg ${effectiveDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="mb-4">
        <div className="text-sm opacity-60 mb-2">Theme Preference</div>
        <div className="flex gap-2">
          {['light', 'system', 'dark'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-lg capitalize ${
                mode === m 
                  ? 'bg-blue-500 text-white' 
                  : effectiveDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {m === 'light' ? '☀️ ' : m === 'dark' ? '🌙 ' : '💻 '}{m}
            </button>
          ))}
        </div>
      </div>
      
      {mode === 'system' && (
        <div className="mt-4 pt-4 border-t border-gray-500/30">
          <div className="text-sm opacity-60 mb-2">Simulate system preference:</div>
          <button
            onClick={() => setSystemDark(!systemDark)}
            className={`px-4 py-2 rounded-lg ${effectiveDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            System is: {systemDark ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## Implementation Notes

### CSS Variables Approach

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
}

[data-theme="dark"] {
  --bg-primary: #111827;
  --text-primary: #ffffff;
}
```

### Persistence

- Store preference in `localStorage`
- Sync with user account settings if logged in
- Apply before page paint to prevent flash

### Transition

- Use `transition-colors` for smooth switching
- Duration: 200ms
- Avoid transitioning background images

## Success Metrics

| Metric | Target |
|--------|--------|
| Adoption rate | 30% of users enable dark mode |
| Session duration (dark mode users) | +10% vs light mode |
| Eye strain complaints | -50% |
