# Design Systems

**How to style Reactive MD recipes** - Choose the right tool for the right job.

This folder contains a modest css component stylesheet and design tokens for use with Reactive MD recipes.

---

## Quick Start: Token Swapping

The reactive-md component library ([reactive-md.css](./reactive-md.css)) works with both token systems. Switch fidelity by changing one import:

```css
/* Step 1: Choose tokens (determines fidelity) */
@import './wireframe/tokens.css';     /* Low-fi: monospace, grayscale */
/* OR */
@import './elementary/tokens.css';    /* High-fi: branded, polished */

/* Step 2: Import components  */
@import './reactive-md.css';
```

**CRITICAL for Reactive MD recipes**: When using multiple `css live` blocks in the same markdown file, **the last token import wins** due to CSS cascade. This affects all rendered examples in the document.

```css live
/* TRY IT: change `wireframe` to elementary below */
@import '../design-systems/wireframe/tokens.css';
@import '../design-systems/reactive-md.css';
```

## Approach to styling

Reactive MD (extension) supports any valid css for styling. Three styling approaches are made available out of the box, each optimized for different purposes:

### 1. Wireframe Design System

**Location**: `design-systems/wireframe/`

**Use when**: Early exploration, low-fidelity mockups, structural communication

**Characteristics**:
- Monospace typography ("sketch on paper" feel)
- Flat grayscale palette (no brand colors)
- Simple borders (no shadows or gradients)
- Explicit labels (`[HERO]`, `[IMAGE]`, `[CTA]`)
- Fast iteration over pixel-perfect design

**Best for**:
- Landing page layouts
- Dashboard wireframes
- Empty states and error screens
- Onboarding flow structures
- Settings page layouts

**Example**:

```jsx live
export default function WireframeExample() {
  return (
    <div className="wf-hero">
      <div className="content">
        <span className="badge">[Hero Section]</span>
        <h1 className="title">Product Title</h1>
        <p className="description">Description text in monospace.</p>
        <button className="wf-btn primary">Get Started</button>
      </div>
    </div>
  );
}
```

**Documentation**: See [wireframe/tokens.md](./wireframe/tokens.md)

---

### 2. Elementary Design System

**Location**: `recipes/design-systems/elementary/`

**Use when**: High-fidelity prototypes, themeable demonstrations, brand exploration

**Characteristics**:
- "Ink & Paper" physical metaphor (inspired by Material Design)
- 3-layer architecture (Primitives → Semantics → Components)
- Dark mode support via semantic tokens
- 16-prefix taxonomy for organization
- Design decisions codified in system

**Best for**:
- Feature concept explorations with theming
- UI catalog demonstrations
- Product case study mockups
- Brand exploration prototypes
- Dark mode demonstrations

**Example**:

```css live
.elementary-demo {
  background-color: var(--bg-error);
  color: var(--c-text);
  padding: var(--p-card);
  border-radius: var(--r-card);
  box-shadow: var(--x-card-shadow);

  & h2 {
    margin-bottom: var(--m-stack);
  }

  & p {
    color: var(--c-text-secondary);
  }
}
```

```jsx live
/*
  Workaround: Import tokens inside JSX to avoid global cascade issues.
  TODO: Extension will prioritize JSX imports in future version.
*/
import '../design-systems/elementary/tokens.css';
export default function ElementaryExample() {
  return (
    <div className="elementary-demo">
      <h2>Themed Component</h2>
      <p>Uses semantic tokens for consistent theming.</p>
    </div>
  );
}
```


**Documentation**: See [elementary/tokens.md](./elementary/tokens.md)

---

### 3. Tailwind CSS

**Use when**: Rapid prototyping, one-off examples, documentation snippets

**Characteristics**:
- Utility-first inline classes
- No abstraction overhead
- Fast iteration without token management
- Full Tailwind v4 support
- Ideal for one-off demonstrations

**Best for**:
- PRD templates and documentation
- User journey visualizations
- Quick concept demonstrations
- Examples that won't be reused
- When speed matters more than consistency

**Example**:
```jsx live
export default function TailwindExample() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2">Quick Prototype</h2>
      <p className="text-gray-600 mb-4">
        Built fast with Tailwind utilities.
      </p>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Action
      </button>
    </div>
  );
}
```

**Documentation**: Built into Reactive MD, no setup needed

## Decision Framework

Use this flowchart to choose the right styling approach:

```
START: What are you building?
│
├─ Is this a wireframe or early-stage mockup?
│  └─ YES → Use Wireframe Design System
│
├─ Does it need theming, branding, or dark mode?
│  └─ YES → Use Elementary Design System
│
├─ Is this a demonstration pattern for stakeholder review?
│  └─ YES → Use Elementary Design System
│
├─ Is this a one-time example or quick demo?
│  └─ YES → Use Tailwind CSS
│
└─ Default: Use Elementary Design System
```

### Component Patterns

The reactive-md component library uses **semantic children** and **custom properties for customization**:

```jsx live
{/* Component with semantic children (no .wf- prefix) */}
<section className="wf-hero">
  <span className="badge">New</span>
  <h1 className="title">Product Title</h1>
  <p className="description">Supporting text</p>
</section>
```

**Customization via custom properties:**

```jsx live
<section className="wf-hero" style={{
  '--c-title': 'var(--c-primary)',  /* Custom title color */
  '--m-title': 'var(--s-8)'         /* Custom title margin */
}}>
  <h1 className="title">Custom Styled Title</h1>
</section>
```

**Pattern**: Component classes use `.wf-*` prefix (`.wf-hero`, `.wf-card`), but semantic children (`.title`, `.description`, `.badge`) are unprefixed for natural HTML structure.

**See also:**
- [reactive-md.css](./reactive-md.css) - A component library (`.wf-*` classes) designed for quick communication of ideas.
- [Wireframe tokens](./wireframe/tokens.md) - Low-fidelity token values
- [Elementary tokens](./elementary/tokens.md) - High-fidelity token values
- [Use cases](./use-cases/) - Complete demonstrations

---

## Best Practices

### ✅ Do

- **Choose one system per recipe** - Consistency within a document
- **Import tokens at file top** - Once per markdown file
- **Document your choice** - Add comment explaining system selection
- **Test interactivity** - Systems shouldn't block state management
- **Use semantic names** - Prefer `--c-text` over `#333333`

### ❌ Don't

- **Mix aesthetics** - Don't combine wireframe monospace with Elementary shadows
- **Override system fundamentals** - Don't add gradients to wireframe components
- **Ignore the decision tree** - Follow the flowchart unless you have good reason
- **Create one-off tokens** - Use system tokens or fall back to Tailwind
- **Forget dark mode** - Test Elementary system components in both themes

---

## When to Create a New System

Consider creating a new design system when:

1. **Existing systems don't fit** - Completely different aesthetic needed
2. **Reuse across recipes** - Justify the abstraction overhead
3. **Complex theming requirements** - Beyond Elementary's capabilities
4. **Brand-specific work** - Client work with strict design guidelines

**Don't create a new system for**:
- One-off components (use Tailwind)
- Minor tweaks (override Elementary tokens locally)
- Exploration (use Wireframe)

**Browse examples**: See [USE-CASES.md](../USE-CASES.md) for the complete recipe index organized by category.

## Getting Help

- **Wireframe questions**: See [wireframe/tokens.md](./wireframe/tokens.md)
- **Elementary questions**: See [elementary/tokens.md](./elementary/tokens.md)
- **Tailwind questions**: See [public/GUIDE.md](../../GUIDE.md)
- **Can't decide?**: Follow the decision flowchart above

---

*Last updated: January 2026*
