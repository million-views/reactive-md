# Contributing Recipes

Guidelines for contributing use cases to Reactive MD Recipes.

---

## What Makes a Good Recipe?

### 1. Tell a Story First

Start with context before code:
- What problem does this solve?
- Who experiences this problem?
- What's the user journey?

### 2. Make It Interactive

Static screenshots belong in Figma. Recipes should:
- Let readers click, type, hover
- Show state changes (open/closed, loading/loaded)
- Demonstrate edge cases inline

### 3. Be Self-Contained

Each recipe should work when copied to a new folder:

```
my-recipe/
├── README.md           # Overview and context
├── spec.md             # The interactive document
├── Component.jsx       # Local components
└── styles.css          # Custom styles (optional)
```

### 4. Document the "Why"

Explain decisions:
- Why this approach over alternatives?
- What trade-offs did you consider?
- What's still uncertain?

---

## Recipe Structure

Every recipe should include:

```markdown
---
title: Feature Name
author: @your-github-handle
status: draft | in-review | complete
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
```

---

## Using Reactive MD Features

Recipes should showcase what's possible:

### Local Imports

Keep components alongside your spec:

```jsx live
import Button from './Button.jsx';
import Card from './Card.jsx';

function Demo() {
  return <Card><Button>Click me</Button></Card>;
}
```

### CSS Imports

Load custom styles:

```css live
@import "./styles.css";
```

### npm Packages

Use bundled libraries for rich UX:

```jsx live
import { motion } from 'motion';
import { Bell } from 'lucide-react';
import dayjs from 'dayjs';

function Notification() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Bell /> New message at {dayjs().format('h:mm A')}
    </motion.div>
  );
}
```

### Tailwind Styling

Use utility classes for consistent design:

```jsx live
function Card({ children }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
      {children}
    </div>
  );
}
```

---

## Where to Put Your Recipe

| Type | Folder | Description |
|------|--------|-------------|
| PRD template | `prd-templates/` | Document structure templates |
| Visual concept | `wireframes/` | Page layouts, quick mockups |
| User flow | `user-journeys/` | Multi-step narratives |
| Feature idea | `feature-concepts/` | Specific feature proposals |
| UI pattern | `design-patterns/` | Reusable interaction patterns |
| Complete PRD | `case-studies/` | Full-fledged product specs |

---

## Submitting

1. Fork this repository
2. Create your recipe folder in the appropriate category
3. Test with Reactive MD (`Cmd+K P`) to verify it works
4. Update `USE-CASES.md` with your recipe
5. Submit a Pull Request

---

## Questions?

Open an issue at [github.com/million-views/reactive-md/issues](https://github.com/million-views/reactive-md/issues)
