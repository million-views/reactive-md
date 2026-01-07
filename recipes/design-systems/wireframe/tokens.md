# Wireframe Design System

**Version 1.0 (Low-Fidelity Construction Standard)**

---

## Philosophy: Identical Token Names, Low-Fidelity Values

The Wireframe system uses **identical token names** as the [Elementary Design System](../elementary/tokens.md). Only the **values** differ—monospace fonts, flat grayscale colors, no shadows—to create a deliberate low-fidelity aesthetic.

**Architecture**: See [Elementary Design System](../elementary/tokens.md) for complete architecture documentation. This document only covers **differences**.

**Naming Convention**: Component custom properties follow the pattern `--<property>-of-<element>` (e.g., `--r-badge` = radius of badge, `--m-actions` = margin of actions). See Elementary documentation for full taxonomy.

---

## What's Different from Elementary

### Colors (`--c-`, `--bg-`)
- **Elementary**: Full oklch color palette with theme support
- **Wireframe**: Flat grayscale only (`--c-slate-*` primitives)

```css
/* Wireframe primitives are grayscale */
--c-slate-600: #525252;   /* vs Elementary's branded colors */
--c-primary: var(--c-slate-600);  /* Muted gray accent */
```

### Typography (`--ff-`, `--fs-`, `--t-`)
- **Elementary**: System sans-serif fonts, composed typography presets
- **Wireframe**: Monospace only for sketch aesthetic

```css
--ff-sans: 'SF Mono', 'Monaco', 'Consolas', monospace;
--ff-body: var(--ff-sans);  /* Monospace everywhere */
--t-body: var(--fw-400) var(--fs-3) var(--ff-sans);  /* Same structure, monospace font */
```

### Effects (`--x-`)
- **Elementary**: Box shadows, blur, gradients
- **Wireframe**: Mostly `none` for flat appearance, with one exception

```css
--x-0: none;
--x-1: 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15);  /* UI affordances */
--x-2: none;
--x-card-shadow: none;
--x-glass: none;
--x-primary-glow: none;
```

**Exception**: `--x-1` has a subtle shadow for **UI affordances** (toggle thumbs, draggable elements). Even low-fidelity wireframes need basic affordances for interactive elements to be usable. All other effects remain flat.

### Opacity (`--o-`)
- **Elementary**: Full 0.0–1.0 range for transparency effects
- **Wireframe**: Typically 1.0 (fully opaque) or discrete values only

```css
--o-disabled: 0.5;  /* Reduced opacity for disabled states */
--o-overlay: 0.9;   /* Subtle overlay transparency */
```

### Border Radius (`--r-`)
- **Elementary**: Up to 12px for polished look
- **Wireframe**: Max 6px to avoid polish

```css
--r-card: var(--r-3);
```

---

## What's Identical to Elementary

**100% compatible** - no changes needed:
- **Spacing** (`--s-*`): 4px increments, `--s-0` through `--s-9`
- **Font sizes** (`--fs-*`): `--fs-1` through `--fs-9`
- **Font weights** (`--fw-*`): `--fw-400`, `--fw-600`, `--fw-700`, `--fw-900`
- **Typography structure** (`--t-*`): Same composition pattern (weight + size + family)
- **Border weights** (`--b-*`): `--b-0` through `--b-4`
- **Z-index** (`--z-*`): `--z-0` through `--z-6`
- **Animation** (`--a-*`): `--a-fast`, `--a-base`, `--a-slow`
- **Layout** (`--w-*`, `--h-*`): Container widths, heights

---

## Usage: Import Swapping

Switch between systems by changing one line:

```css live
/* For wireframe sketches */
@import '../wireframe/tokens.css';

/* For polished UI */
@import '../elementary/tokens.css';
```

All component code using semantic tokens (`--c-text`, `--bg-surface`, `--p-card`) works with both systems.

## Component Architecture

Wireframe components use **semantic HTML elements** with **CSS nesting** and **custom properties for customization**.

### Pattern: Semantic Elements + Custom Properties

```jsx live
{/* Semantic HTML with wireframe component class */}
<section className="wf-hero">
  <span className="badge">New Feature</span>
  <h1 className="title">Page Title</h1>
  <p className="description">Supporting text that explains the feature.</p>
</section>
```

```css live
/* wireframe.css - Component definition */
.wf-hero {
  background-color: var(--c-text);
  padding: var(--p-card);
  
  /* Nested contextual children */
  & .title {
    font-size: var(--t-title, var(--fs-6));
    color: var(--c-title, var(--c-white));
  }
  
  & .description {
    font-size: var(--t-desc, var(--fs-3));
    color: var(--c-desc, var(--c-text-secondary));
  }
}
```

### Customization via Custom Properties

Override defaults by setting custom properties on the component:

```jsx live
<section className="wf-hero" style={{
  '--t-title': 'var(--fs-8)',
  '--c-title': 'var(--c-primary)'
}}>
  <h1 className="title">Larger Custom Title</h1>
</section>
```

**Key principles:**
- **Semantic HTML**: Use appropriate elements (`<section>`, `<article>`, `<h1>`, `<p>`)
- **Component classes**: `.wf-hero`, `.wf-card`, `.wf-btn` describe component purpose
- **CSS nesting**: Children styled within parent context
- **Custom properties**: Component-level tokens for easy customization
- **Sensible defaults**: Works without configuration, customizable when needed

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

**Use Elementary System:**
- High-fidelity prototypes
- Brand demonstrations
- Marketing page mockups
- Polished UI explorations


*See [Elementary Design System](../elementary/tokens.md) for complete token documentation.*

---

*Part of the [Reactive MD Design Systems](../README.md)*
