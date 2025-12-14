---
title: Dark Mode Toggle
author: @design-team
status: approved
date: 2024-12-13
---

# Dark Mode Toggle

## Problem Statement

Users working in low-light environments experience eye strain with our current light-only interface. Many modern apps support dark mode, and users expect it.

**User Research Findings**:
- 82% of surveyed users want dark mode
- 65% use dark mode on other apps after 6 PM
- Accessibility: dark mode helps users with light sensitivity

## Proposed Solution

A toggle in the header that switches between light and dark themes, with preference persistence via localStorage.

---

## Load Custom Styles

```css live
@import "./styles.css";
```

---

## The Toggle Component

An animated toggle with sun/moon icons:

```jsx live
import ThemeToggle from './ThemeToggle.jsx';

function ToggleDemo() {
  const [dark, setDark] = React.useState(false);
  
  return (
    <div className={`p-8 rounded-lg transition-colors ${dark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="flex items-center justify-between max-w-xs mx-auto">
        <span className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>
          {dark ? 'Dark Mode' : 'Light Mode'}
        </span>
        <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} />
      </div>
    </div>
  );
}
```

---

## Full Page Preview

See how the toggle affects an entire interface:

```jsx live
import ThemeToggle from './ThemeToggle.jsx';
import { Home, Settings, User, Bell, Search, Menu } from 'lucide-react';

function PagePreview() {
  const [dark, setDark] = React.useState(false);
  
  const theme = {
    bg: dark ? 'bg-gray-900' : 'bg-white',
    text: dark ? 'text-white' : 'text-gray-900',
    textMuted: dark ? 'text-gray-400' : 'text-gray-500',
    card: dark ? 'bg-gray-800' : 'bg-gray-50',
    border: dark ? 'border-gray-700' : 'border-gray-200',
    input: dark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300',
    hover: dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
  };
  
  return (
    <div className={`${theme.bg} ${theme.text} rounded-lg transition-colors overflow-hidden`}>
      {/* Header */}
      <div className={`flex justify-between items-center p-4 border-b ${theme.border}`}>
        <div className="flex items-center gap-4">
          <Menu className="w-5 h-5" />
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${theme.card}`}>
            <Search className="w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className={`bg-transparent border-none outline-none w-32 ${theme.input}`}
            />
          </div>
          <button className={`p-2 rounded-lg ${theme.hover}`}>
            <Bell className="w-5 h-5" />
          </button>
          <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 grid grid-cols-3 gap-4">
        {[
          { icon: Home, title: 'Overview', value: '1,234' },
          { icon: User, title: 'Users', value: '567' },
          { icon: Settings, title: 'Settings', value: '89' },
        ].map(({ icon: Icon, title, value }) => (
          <div key={title} className={`p-4 rounded-lg ${theme.card} border ${theme.border}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4" />
              <span className={theme.textMuted}>{title}</span>
            </div>
            <div className="text-2xl font-bold">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## System Preference Detection

Respect the user's OS-level preference:

```jsx live
import ThemeToggle from './ThemeToggle.jsx';
import { Monitor, Sun, Moon } from 'lucide-react';

function SystemPreference() {
  const [mode, setMode] = React.useState('system'); // 'light', 'dark', 'system'
  
  // In real implementation, would use window.matchMedia('(prefers-color-scheme: dark)')
  const systemPrefersDark = true; // Simulated
  const effectiveDark = mode === 'system' ? systemPrefersDark : mode === 'dark';
  
  return (
    <div className={`p-6 rounded-lg ${effectiveDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h3 className="font-semibold mb-4">Theme Preference</h3>
      
      <div className="flex gap-2">
        {[
          { value: 'light', icon: Sun, label: 'Light' },
          { value: 'dark', icon: Moon, label: 'Dark' },
          { value: 'system', icon: Monitor, label: 'System' },
        ].map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              mode === value 
                ? 'bg-blue-500 text-white' 
                : effectiveDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
      
      <p className={`mt-4 text-sm ${effectiveDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {mode === 'system' 
          ? `Following system preference (currently ${systemPrefersDark ? 'dark' : 'light'})`
          : `Using ${mode} mode`
        }
      </p>
    </div>
  );
}
```

---

## Implementation Notes

### Persistence Strategy

```javascript
// Save preference
localStorage.setItem('theme', 'dark');

// Load preference with system fallback
const saved = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isDark = saved ? saved === 'dark' : systemDark;
```

### CSS Custom Properties

Use CSS variables for easy theming (see `styles.css`):

```css
:root { --color-bg: #ffffff; }
.dark-theme { --color-bg: #111827; }
```

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Dark mode adoption | > 40% of users |
| User satisfaction (survey) | > 4.5/5 |
| Time spent in app after 6 PM | +15% |
