# Reactive MD Recipes

Templates and examples for accomplishing real work with Reactive MD. See [USE-CASES.md](./USE-CASES.md) for the complete index.

---

## Directory Structure

```
recipes/
├── README.md
├── USE-CASES.md                     # Index of all use cases
│
├── prd-templates/                   # PRD structure templates
│   ├── feature-spec.md
│   ├── user-flow.md
│   ├── a-b-test-proposal.md
│   └── ...
│
├── user-journeys/                   # Multi-step narratives
│   └── ...
│
├── feature-concepts/                # Specific feature ideas
│   ├── notification-system/         # Folder with spec + components
│   ├── dark-mode-toggle/
│   └── ...
│
├── ui-catalog/                       # Reusable UI patterns
│   ├── feedback-states.md
│   └── ...
│
├── case-studies/                    # Complete mini-PRDs
│   └── ...
│
└── design-systems/                  # Design token systems
    ├── README.md                    # Styling strategy and decision framework
    ├── wireframe/                   # Low-fidelity sketch aesthetic
    └── elementary/                  # High-fidelity design system
```

---

## Styling Strategy

Recipes use one of three styling approaches: **Wireframe** (low-fidelity), **Elementary** (high-fidelity), or **Tailwind** (rapid prototyping).

**See [design-systems/README.md](./design-systems/README.md) for the complete styling guide, decision framework, and examples.**

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
