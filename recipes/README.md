# Reactive MD Recipes

**Literate UI/UX for product teams.**

## The Idea

> *"Instead of imagining that our main task is to instruct a computer what to do, let us concentrate rather on explaining to human beings what we want a computer to do."*
> — Donald Knuth, *Literate Programming* (1984)

Knuth's insight was simple but radical: programs should be written for people first, machines second. This idea gave us Jupyter Notebooks for data science and Org mode for Emacs wizards.

**Reactive MD brings literate programming to UI/UX.**

Write product specs, wireframes, and user journeys with embedded, interactive React components. Unlike static mockups or separate prototyping tools, these documents let you **tell a story with working visuals** — prose and prototypes in one scrollable narrative.

![Reactive MD Demo](demo.gif)

---

## Who Is This For?

### Product Managers
Write PRDs where stakeholders can *interact* with your proposed features. No more "imagine this button does X" — they can click it and see.

### UX Designers  
Document user journeys with real, clickable prototypes inline. Show the happy path, edge cases, and error states in one scrollable document.

### Anyone with an Idea
Sketch concepts using AI-generated JSX and see them render instantly. Iterate on ideas without leaving your editor.

---

## Directory Structure

```
recipes/
├── README.md
├── CONTRIBUTING.md
├── USE-CASES.md                     # Index of all use cases
│
├── prd-templates/                   # PRD structure templates
│   ├── feature-spec.md
│   ├── user-flow.md
│   ├── a-b-test-proposal.md
│   └── ...
│
├── wireframes/                      # Low-fidelity visual concepts
│   ├── landing-pages.md
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
├── design-patterns/                 # Reusable UI patterns
│   ├── feedback-states.md
│   └── ...
│
├── case-studies/                    # Complete mini-PRDs
│   └── ...
│
└── design-systems/                  # Design token systems
    ├── README.md                    # Styling strategy and decision framework
    ├── wireframe/                   # Low-fidelity sketch aesthetic
    └── elementary/                  # Production design system
```

---

## Styling Strategy

Recipes use one of three styling approaches: **Wireframe** (low-fidelity), **Elementary** (high-fidelity), or **Tailwind** (rapid prototyping).

**See [design-systems/README.md](./design-systems/README.md) for the complete styling guide, decision framework, and examples.**

---

## What Makes a Good Recipe?

Each recipe is a **self-contained folder** that demonstrates a use case:

```
notification-system/
├── README.md           # Overview and context
├── spec.md             # The interactive document
├── Toast.jsx           # Local component
├── NotificationBell.jsx
└── styles.css          # Custom styles
```

Recipes should:
- **Tell a story** — context before code
- **Be interactive** — click, hover, see state changes
- **Use local imports** — keep components alongside the spec
- **Choose the right styling approach** — Wireframe for exploration, Material for production, Tailwind for speed
- **Show real patterns** — things people actually build

---

## Reactive MD Features in Recipes

Recipes naturally showcase all Reactive MD capabilities:

| Feature | How It's Used |
|---------|---------------|
| ⚡ **Live Reload** | Edit any recipe and see changes instantly |
| 📝 **Markdown Fences** | `jsx live` renders components inline |
| 🎨 **Tailwind v4** | All examples use Tailwind utilities |
| 📦 **npm Packages** | `motion`, `lucide-react`, `dayjs` for rich UX |
| 📁 **Local Imports** | Components in same folder as spec |
| 🎨 **CSS Imports** | Custom styles via `@import` |
| 🎯 **TypeScript** | Type-safe components where appropriate |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

See [USE-CASES.md](./USE-CASES.md) for the full index of recipes.
