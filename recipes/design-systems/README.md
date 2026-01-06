# Design Systems

**How to style Reactive MD recipes** - Choose the right tool for the right job.

This folder contains design token systems for Reactive MD recipes.

---

## The 3-Tier Strategy

Reactive MD supports three styling approaches, each optimized for different purposes:

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

```css live
@import '../design-systems/wireframe/tokens.css';
@import '../wireframes/wireframe.css';
```

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

**Location**: `design-systems/elementary/`

**Use when**: High-fidelity prototypes, themeable demonstrations, brand exploration

**Characteristics**:
- "Ink & Paper" physical metaphor (inspired by Material Design)
- 3-layer architecture (Primitives → Semantics → Components)
- Dark mode support via semantic tokens
- 16-prefix taxonomy for organization
- Design decisions codified in system

**Best for**:
- Feature concept explorations with theming
- Design pattern demonstrations
- Product case study mockups
- Brand exploration prototypes
- Dark mode demonstrations

**Example**:

```css live
@import '../design-systems/elementary/tokens.css';
```

```jsx live
export default function ElementaryExample() {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      color: 'var(--c-text)',
      padding: 'var(--p-card)',
      borderRadius: 'var(--r-card)',
      boxShadow: 'var(--fx-card-shadow)'
    }}>
      <h2 style={{ marginBottom: 'var(--m-stack)' }}>Themed Component</h2>
      <p style={{ color: 'var(--c-text-secondary)' }}>
        Uses semantic tokens for consistent theming.
      </p>
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

---

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

---

## Detailed Comparison

| Aspect | Wireframe | Elementary | Tailwind |
|--------|-----------|----------|----------|
| **Setup time** | 1 import | 1 import | None |
| **Iteration speed** | Fast | Medium | Fastest |
| **Consistency** | Structural only | Full brand | Per-component |
| **Theming** | Not supported | Dark mode ready | Manual |
| **Learning curve** | Minimal | Medium | Low |
| **Token count** | ~30 tokens | ~109 tokens | N/A |
| **Best use case** | Exploration | Polished demos | Prototyping |
| **Reusability** | Structure patterns | Full demonstrations | Copy/paste |

---

## Style Transformation Examples

These examples show how the same component looks in different systems. Use them as references when switching between styling approaches within a recipe.

### Tailwind → Wireframe

**Scenario**: You built a polished prototype and now need a structural wireframe

**Transformation approach**:

```jsx
// Before (Tailwind)
<div className="bg-linear-to-r from-blue-600 to-purple-700 text-white p-12 rounded-xl shadow-2xl">
  <h1 className="text-4xl font-bold mb-4">Hero Title</h1>
  <button className="px-6 py-3 bg-white text-blue-600 rounded-lg">CTA</button>
</div>

// After (Wireframe)
<div className="wf-surface">
  <div className="wf-label">[Hero Section]</div>
  <h1 className="wf-h1">Hero Title</h1>
  <button className="wf-button-primary">CTA</button>
</div>
```

---

### Tailwind → Elementary

**Scenario**: You need theming support or dark mode for your component

**Transformation approach**:

```jsx
// Before (Tailwind)
<div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-bold mb-3">Card Title</h2>
  <p className="text-gray-600">Description</p>
</div>

// After (Elementary)
<div style={{
  backgroundColor: 'var(--bg-surface)',
  color: 'var(--c-text)',
  padding: 'var(--p-card)',
  borderRadius: 'var(--r-card)',
  boxShadow: 'var(--fx-card-shadow)'
}}>
  <h2 style={{ fontSize: 'var(--t-heading)', fontWeight: 600 }}>Card Title</h2>
  <p style={{ color: 'var(--c-text-secondary)' }}>Description</p>
</div>
```

---

### Elementary → Wireframe

**Scenario**: You need to strip back to structural communication

**Transformation approach**: Replace semantic tokens with wireframe classes, add explicit labels, remove visual polish

---

## Recipe Category Recommendations

Based on the [USE-CASES.md](../USE-CASES.md) framework:

| Recipe Category | Primary System | Secondary Option |
|----------------|---------------|------------------|
| **PRD Templates** | Tailwind | Elementary (for branded templates) |
| **Wireframes** | Wireframe | None |
| **User Journeys** | Tailwind | Elementary (for consistent flows) |
| **Feature Concepts** | Elementary | Tailwind (for quick spikes) |
| **Design Patterns** | Elementary | Tailwind (for simple patterns) |
| **Case Studies** | Elementary | Tailwind (for speed) |

---

## Combining Systems (Advanced)

### Mixing Wireframe + Elementary

Useful for showing "before/after" design progression:

```css live
@import '../design-systems/elementary/tokens.css';
@import '../design-systems/wireframe/tokens.css';
@import '../wireframes/wireframe.css';
```

```jsx live
export default function Comparison() {
  const [polished, setPolished] = React.useState(false);
  
  return (
    <div>
      <button onClick={() => setPolished(!polished)}>
        Toggle: {polished ? 'Polished' : 'Wireframe'}
      </button>
      
      {polished ? (
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--p-card)', borderRadius: 'var(--r-card)' }}>
          Elementary Design
        </div>
      ) : (
        <div className="wf-card">
          <div className="wf-label">[Same Content]</div>
          <p>Wireframe Mode</p>
        </div>
      )}
    </div>
  );
}
```

### Using Tailwind with Design Systems

Add Tailwind utilities for layout when system doesn't provide them:

```jsx
<div className="wf-surface grid grid-cols-3 gap-4">
  {/* Wireframe aesthetics + Tailwind grid */}
</div>
```

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
2. **Reuse across 5+ recipes** - Justify the abstraction overhead
3. **Complex theming requirements** - Beyond Elementary's capabilities
4. **Brand-specific work** - Client work with strict design guidelines

**Don't create a new system for**:
- One-off components (use Tailwind)
- Minor tweaks (override Elementary tokens locally)
- Exploration (use Wireframe)

---

## Examples by System

### Wireframe System Examples

- [Landing Pages](../wireframes/landing-pages.md) - Low-fidelity page layouts
- [Dashboards](../wireframes/dashboards.md) - Data interface structures
- [Empty States](../wireframes/empty-states.md) - Zero-data patterns

### Elementary System Examples

- [Bold Pricing](../case-studies/bold-pricing-manifesto/bold-pricing-spec.md) - Themed component with design tokens
- [Dark Mode Toggle](../feature-concepts/dark-mode-toggle/spec.md) - Theme switching demonstration

### Tailwind Examples

- [Feature Spec Template](../prd-templates/feature-spec.md) - Documentation template
- [Signup Flow](../user-journeys/signup-flow.md) - User journey visualization
- [Infinite Scroll](../feature-concepts/infinite-scroll.md) - Quick interaction pattern

---

## Getting Help

- **Wireframe questions**: See [wireframe/tokens.md](./wireframe/tokens.md)
- **Elementary questions**: See [elementary/tokens.md](./elementary/tokens.md)
- **Tailwind questions**: See [public/GUIDE.md](../../GUIDE.md)
- **Can't decide?**: Follow the decision flowchart above

---

*Last updated: January 2026*
