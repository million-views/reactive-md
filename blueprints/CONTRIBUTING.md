# Contributing Blueprints

Thank you for contributing to Reactive MD Blueprints! This guide will help you create blueprints that are useful, interactive, and well-documented.

## What Makes a Good Blueprint?

### 1. Solve a Real Problem

Don't create "hello world" demos. Focus on:
- Actual product features you've built or want to build
- Common UX patterns that teams implement repeatedly
- User journeys that illustrate decision points

### 2. Tell a Story First

Start with context before code:
- What problem does this solve?
- Who experiences this problem?
- What have you tried before?

### 3. Make It Interactive

Static screenshots belong in Figma. Blueprints should:
- Let readers click, type, hover
- Show state changes (open/closed, loading/loaded)
- Demonstrate edge cases inline

### 4. Document the "Why"

Explain decisions:
- Why this approach over alternatives?
- What trade-offs did you consider?
- What's still uncertain?

---

## Blueprint Structure

Every blueprint should include:

```markdown
---
title: Feature Name
author: @your-github-handle
status: draft | in-review | approved | implemented
date: YYYY-MM-DD
---

# Feature Name

## Problem Statement
What user problem does this solve?

## Proposed Solution
High-level description + interactive demos.

## User Journey
Step-by-step flow with embedded components.

## Edge Cases
Error states, empty states, loading states.

## Open Questions
What's still undecided?

## Success Metrics
How will we know this worked?
```

---

## Where to Put Your Blueprint

| Type | Folder | Description |
|------|--------|-------------|
| PRD template | `prd-templates/` | Reusable document structures |
| Quick visual | `wireframes/` | Page layouts, component arrangements |
| User flow | `user-journeys/` | Multi-step narratives |
| Feature idea | `feature-concepts/` | Specific feature proposals |
| UI pattern | `design-patterns/` | Reusable interaction patterns |
| Complete PRD | `case-studies/` | Full-fledged product specs |

---

## JSX Guidelines

### Keep Components Self-Contained

```jsx
// ✅ Good - works standalone
export default function NotificationBell() {
  const [count, setCount] = React.useState(3);
  return <button onClick={() => setCount(c => c - 1)}>🔔 {count}</button>;
}

// ❌ Bad - depends on external state
export default function NotificationBell({ count, setCount }) {
  return <button onClick={() => setCount(c => c - 1)}>🔔 {count}</button>;
}
```

### Use Tailwind for Styling

Reactive MD has built-in Tailwind v4 support. Use it:

```jsx
// ✅ Good - Tailwind classes
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>

// ❌ Avoid - inline styles
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  Click me
</button>
```

### Show State Transitions

Make components interactive:

```jsx
export default function LoadingButton() {
  const [loading, setLoading] = React.useState(false);
  
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  return (
    <button 
      onClick={handleClick} 
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      {loading ? 'Loading...' : 'Submit'}
    </button>
  );
}
```

---

## Submitting Your Blueprint

1. Fork this repository
2. Create your blueprint in the appropriate folder
3. Test it with Reactive MD to ensure components render
4. Submit a Pull Request with:
   - Clear title describing the blueprint
   - Brief description of the use case
   - Any dependencies or assumptions

---

## Questions?

Open an issue or start a discussion. We're here to help!
