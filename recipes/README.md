# Reactive MD Recipes

Templates and examples for accomplishing real work with Reactive MD. See [use-cases.md](./use-cases.md) for the complete index.

---

## Recipe Categories

**PRD Templates** (`prd-templates/`) - Structured templates for feature specs, user flows, competitive analysis, and A/B test proposals

**User Journeys** (`user-journeys/`) - Multi-step user flows and narratives (signup, checkout, search-to-purchase, support tickets)

**Feature Concepts** (`feature-concepts/`) - Interactive feature explorations with working demos (notifications, dark mode, infinite scroll, drag-and-drop)

**UI Catalog** (`ui-catalog/`) - Reusable UI patterns and components (navigation, data tables, modals, cards, feedback states)

**Case Studies** (`case-studies/`) - Complete mini-PRD examples showing full product concepts

**Design Systems** (`design-systems/`) - Styling infrastructure with Elementary and Wireframe themes. See [design-systems/README.md](./design-systems/README.md) for complete guide.

**Complete Index**: See [use-cases.md](./use-cases.md) for cross-category organization by job-to-be-done.

---

## Styling Strategy

**Choose ONE approach per recipe:**

- **Elementary design system** - Token-based with two themes: **Wireframe** (low-fi) or **Elementary** (high-fi). Use tokens directly or with component library (reactive-md.css)
- **Tailwind CSS** - Utility-first, built into reactive-md (no imports needed)

**Critical: NEVER mix Elementary tokens with Tailwind utilities.**

**See [design-systems/README.md](./design-systems/README.md) for the complete styling guide and examples.**

---

## What Makes a Good Recipe?

Each recipe is ideally a **self-contained folder** that demonstrates a use case:

```
notification-system/
├── README.md           # Overview and context
├── spec.md             # The interactive document
├── Toast.jsx           # Local component
├── NotificationBell.jsx
└── styles.css          # Custom styles
```

Recipes should:
- **Tell a story** — context before code (what problem, who experiences it, what's the journey)
- **Be interactive** — click, hover, see state changes (not static screenshots)
- **Document the why** — explain decisions, trade-offs, and what's still uncertain
- **Use local imports** — keep components alongside the spec
- **Choose the right styling approach** — Wireframe for exploration, Elementary for high-fidelity, Tailwind for speed

**Recipe Template**:

```markdown
# Feature Name

## Problem Statement
What user problem does this solve?

## Proposed Solution
High-level description + interactive demos.

## User Journey
Step-by-step flow with embedded components.

## Edge Cases
Error states, empty states, loading states.
```

---

## Features Used in Recipes

Recipes use local imports, CSS imports, npm packages (`motion`, `lucide-react`, `dayjs`), Tailwind utilities, and TypeScript where appropriate. All recipes render with `jsx live` fences and update instantly on edit.
