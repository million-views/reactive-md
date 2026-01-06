# Wireframe Design System

**Version 1.0 (Low-Fidelity Construction Standard)**

---

## Philosophy: "Same Names, Sketch Values"

The Wireframe system uses **identical token names** as the [Material Design System](../material/tokens.md) but with values optimized for low-fidelity sketching.

**Architecture**: See [Material Design System](../material/tokens.md) for complete architecture documentation. This document only covers **differences**.

---

## What's Different from Material

### Colors (`--c-`, `--bg-`)
- **Material**: Full oklch color palette with theme support
- **Wireframe**: Flat grayscale only (`--c-slate-*` primitives)

```css
/* Wireframe primitives are grayscale */
--c-slate-600: #525252   /* vs Material's branded colors */
--c-primary: var(--c-slate-600)  /* Muted gray accent */
```

### Typography (`--f-`)
- **Material**: System sans-serif fonts
- **Wireframe**: Monospace only for sketch aesthetic

```css
--f-sans: 'SF Mono', 'Monaco', 'Consolas', monospace
--f-body: var(--f-sans)  /* Monospace everywhere */
```

### Effects (`--fx-`)
- **Material**: Box shadows, blur, gradients
- **Wireframe**: All set to `none` for flat appearance

```css
--fx-card-shadow: none
--fx-glass: none
--fx-primary-glow: none
```

### Opacity (`--o-`)
- **Material**: Full 0.0–1.0 range for transparency effects
- **Wireframe**: Typically 1.0 (fully opaque) or discrete values only

```css
--o-disabled: 0.5  /* Reduced opacity for disabled states */
--o-overlay: 0.9   /* Subtle overlay transparency */
```

### Border Radius (`--r-`)
- **Material**: Up to 12px for polished look
- **Wireframe**: Max 6px to avoid polish

```css
--r-card: var(--r-3)  /* 6px vs Material's 8px */
```

---

## What's Identical to Material

**100% compatible** - no changes needed:
- **Spacing** (`--s-*`): 4px increments, `--s-0` through `--s-9`
- **Typography sizes** (`--t-*`): `--t-1` through `--t-9`
- **Border weights** (`--b-*`): `--b-0` through `--b-4`
- **Z-index** (`--z-*`): `--z-0` through `--z-6`
- **Animation** (`--a-*`): `--a-fast`, `--a-base`, `--a-slow`
- **Layout** (`--w-*`, `--h-*`): Container widths, heights

---

## Usage: Import Swapping

Switch between systems by changing one line:

```css
/* For wireframe sketches */
@import '../design-systems/wireframe/tokens.css';

/* For polished UI */
@import '../design-systems/material/tokens.css';
```

All component code using semantic tokens (`--c-text`, `--bg-surface`, `--p-card`) works with both systems.

---

## Component Classes

Use semantic HTML classes that work across design systems:

```jsx
<div className="hero">
  <div className="hero__content">
    <h1 className="hero__title">Title</h1>
  </div>
</div>

<button className="btn btn--primary">Action</button>
<button className="btn btn--secondary">Cancel</button>

<div className="card">
  <header className="card__header">Header</header>
  <div className="card__body">Content</div>
</div>
```

**BEM naming** (`block__element--modifier`) provides clear semantics and works naturally with CSS nesting.

---

## Design Principles

1. **Structure Over Style**: Show architecture, not visual design
2. **Explicit Labels**: Annotate placeholders `[HERO]`, `[IMAGE]`, `[CTA]`
3. **Flat Aesthetic**: No shadows, gradients, or depth effects
4. **Monospace Typography**: Removes typographic personality
5. **Fast Iteration**: Optimize for speed over pixel perfection

---

## When to Use

**Use Wireframe System:**
- Early layout exploration
- Information architecture testing
- Flow-focused user testing
- Designer handoff (structure only)

**Use Material System:**
- Production UI components
- Brand demonstrations
- Marketing pages
- Polished prototypes

---

*See [Material Design System](../material/tokens.md) for complete token documentation.*
```

### Use Inline Styles for Custom Properties

React inline styles work best with CSS custom properties:

```jsx
<div style={{
  backgroundColor: 'var(--wf-paper-gray)',
  border: 'var(--wf-border)',
  padding: 'var(--wf-s-4)',
  borderRadius: 'var(--wf-radius-md)'
}}>
  Content here
</div>
```

### Use Utility Classes for Common Patterns

```jsx
<div className="wf-container">
  <div className="wf-surface">
    <div className="wf-label">[Header Section]</div>
    <h1 className="wf-h1">Page Title</h1>
    <p className="wf-text">Body content</p>
  </div>
</div>
```

### Add Explicit Annotations

Always label placeholder content:

```jsx
<div className="wf-placeholder">
  [HERO IMAGE - 1200x600]
</div>
```

```jsx
<div className="wf-annotation">[Navigation Bar]</div>
```

---

## Anti-Patterns

### ❌ Don't Add Visual Polish

```jsx
// Wrong - Gradients, shadows, colors
<div style={{
  background: 'linear-gradient(to right, #667eea, #764ba2)',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  borderRadius: '12px'
}}>
```

```jsx
// Right - Flat, simple, structural
<div style={{
  backgroundColor: 'var(--wf-paper-gray)',
  border: 'var(--wf-border)',
  borderRadius: 'var(--wf-radius-md)'
}}>
```

### ❌ Don't Use Brand Fonts

```jsx
// Wrong - Custom typography
<h1 style={{ fontFamily: 'Inter, sans-serif' }}>
```

```jsx
// Right - Monospace for sketch feel
<h1 className="wf-h1">
```

### ❌ Don't Hide Structure

```jsx
// Wrong - Unlabeled placeholder
<div style={{ width: '100px', height: '100px', background: '#ddd' }} />
```

```jsx
// Right - Explicit label
<div className="wf-placeholder">
  [USER AVATAR - 100x100]
</div>
```

---

## Design Principles

1. **Structure Over Style**: Show information architecture, not visual design
2. **Explicit Over Implicit**: Label everything, no mystery boxes
3. **Flat Over Depth**: No shadows, gradients, or 3D effects
4. **Sketch Over Polish**: Should feel like graph paper, not production UI
5. **Fast Over Perfect**: Speed of iteration matters more than pixel precision

---

## Comparison: Wireframe vs Material System

| Aspect | Wireframe System | Material System |
|--------|-----------------|-----------------|
| **Purpose** | Exploration | Production |
| **Typography** | Monospace | Sans-serif |
| **Colors** | Grayscale + accent | Full brand palette |
| **Effects** | None | Shadows, blur |
| **Theming** | Not supported | Dark mode support |
| **Use case** | Early design | Final implementation |

---

*Part of the [Reactive MD Design Systems](../README.md)*
