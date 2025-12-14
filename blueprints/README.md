# JSX Preview Blueprints

This is a collection of **living documents** — product specs, wireframes, and user journeys with embedded, interactive React components.

Unlike static mockups or separate prototyping tools, these documents let you **tell a story with working visuals**.

## For Product Managers

Write PRDs where stakeholders can *interact* with your proposed features. No more "imagine this button does X" — they can click it and see.

## For UX Designers

Document user journeys with real, clickable prototypes inline. Show the happy path, edge cases, and error states in one scrollable document.

## For Anyone with an Idea

Sketch concepts using AI-generated JSX and see them render instantly. Iterate on ideas without leaving your editor.

---

## What's a Blueprint?

A blueprint is a Markdown file with embedded JSX that:
- **Describes** a feature or product concept in plain language
- **Demonstrates** the UI with live, interactive components
- **Documents** user journeys, edge cases, and success metrics
- **Evolves** as the product matures

Think of it as a PRD that you can *run*.

---

## Directory Structure

```
blueprints/
├── prd-templates/          # PRD structure templates
│   ├── feature-spec.md     # Single feature PRD
│   ├── user-flow.md        # Multi-step user journey
│   └── a-b-test-proposal.md
│
├── wireframes/             # Quick visual concepts
│   ├── landing-pages.md    # Hero, CTA, pricing
│   ├── dashboards.md       # Data-heavy layouts
│   └── empty-states.md     # Zero-data, error, loading
│
├── user-journeys/          # Multi-step narratives
│   ├── signup-flow.md      # Registration → Onboarding
│   └── checkout-flow.md    # Cart → Payment → Confirmation
│
├── feature-concepts/       # Specific feature ideas
│   ├── notification-system.md
│   ├── dark-mode-toggle.md
│   └── infinite-scroll.md
│
├── design-patterns/        # Reusable UI patterns
│   ├── navigation.md       # Navbars, sidebars, breadcrumbs
│   ├── data-tables.md      # Sorting, filtering, pagination
│   └── feedback-states.md  # Loading, success, error
│
└── case-studies/           # Complete mini-PRDs
    ├── saas-dashboard.md   # Full dashboard PRD
    └── e-commerce-pdp.md   # Product detail page
```

---

## Who Benefits?

| Audience | What They Find |
|----------|---------------|
| **Product Managers** | PRD templates, feature concepts, case studies |
| **UX Designers** | Wireframes, user journeys, design patterns |
| **Developers** | Working code they can copy, design patterns |
| **Stakeholders** | Visual specs they can actually interact with |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on adding blueprints.

The best blueprints:
1. **Solve a real problem** — not just "cool demo"
2. **Tell a story** — context before code
3. **Are interactive** — let readers explore, not just observe
4. **Document decisions** — explain the "why" alongside the "what"
