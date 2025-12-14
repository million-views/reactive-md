# Reactive MD Recipes

A collection of **examples** showing what's possible with Reactive MD — from simple components to self-contained project folders with local imports.

---

## What's a Recipe?

A recipe is a working example that demonstrates a Reactive MD capability:
- **Markdown files** with embedded `jsx live` fences
- **Local imports** — JSX components and CSS in the same folder
- **Interactive demos** — click, type, hover, and see state changes

---

## Directory Structure

```
recipes/
├── README.md
├── CONTRIBUTING.md
│
├── getting-started/            # Core features
│   ├── hello-world.md          # Minimal jsx live fence
│   ├── tailwind-basics.md      # Tailwind v4 utilities
│   ├── typescript-support.md   # TSX with type annotations
│   └── ...
│
├── local-imports/              # Self-contained folders
│   ├── button-library/
│   │   ├── demo.md             # Imports from ./Button.jsx
│   │   ├── Button.jsx          # Local component
│   │   └── styles.css          # Local CSS via @import
│   └── ...
│
├── npm-packages/               # External dependencies
│   ├── motion-animations.md    # motion library
│   ├── icons-lucide.md         # lucide-react icons
│   ├── date-formatting.md      # dayjs
│   └── ...
│
├── prd-templates/              # Product requirement docs
│   ├── feature-spec.md
│   ├── user-flow.md
│   ├── a-b-test-proposal.md
│   └── ...
│
├── wireframes/                 # Visual concepts
│   ├── landing-pages.md
│   └── ...
│
├── user-journeys/              # Multi-step narratives
│   └── ...
│
├── feature-concepts/           # Feature proposals
│   ├── notification-system.md
│   ├── dark-mode-toggle.md
│   └── ...
│
├── design-patterns/            # Reusable UI patterns
│   ├── feedback-states.md
│   └── ...
│
└── case-studies/               # Complete examples
    └── ...
```

---

## Feature Coverage

These recipes demonstrate all key Reactive MD features:

| Feature | Recipe |
|---------|--------|
| ⚡ **Live Reload** | All recipes — edit and see changes instantly |
| 📝 **Markdown Fences** | `getting-started/hello-world.md` |
| 🎨 **Tailwind v4** | `getting-started/tailwind-basics.md` |
| 📦 **npm Packages** | `npm-packages/*.md` |
| 🔍 **CodeLens** | Any `.jsx` or `.tsx` file |
| 🎯 **TypeScript** | `getting-started/typescript-support.md` |
| 📁 **Local Imports** | `local-imports/button-library/` |
| 🎨 **CSS Imports** | `local-imports/button-library/styles.css` |

---

## Self-Contained Project Folders

Reactive MD supports **local imports** — keep your components and styles alongside your markdown:

```
my-feature/
├── demo.md           # Your interactive document
├── Button.jsx        # Local component
├── Card.jsx          # Another component
└── styles.css        # Custom CSS
```

In `demo.md`:

~~~markdown
```css live
@import "./styles.css";
```

```jsx live
import Button from './Button.jsx';
import Card from './Card.jsx';

function Demo() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```
~~~

This keeps everything self-contained and version-controlled together.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

Good recipes:
1. **Demonstrate a specific feature** — focused, not sprawling
2. **Are self-contained** — copy the folder and it works
3. **Include context** — explain what and why
4. **Show real patterns** — things people actually build
