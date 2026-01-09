# Wireframe Design System

**Version 1.0 (Low-Fidelity Construction Standard)**

---

**Quick Start:**
- [Reactive-MD components](../reactive-md.css) - Complete component library (works with these tokens)
- [Elementary tokens](../elementary/tokens.md) - High-fidelity alternative to Wireframe
- [Use cases](../use-cases/) - Complete demonstrations

## Philosophy: Identical Token Names, Low-Fidelity Values

The Wireframe system uses **identical token names** as the [Elementary Design System](../elementary/tokens.md). Only the **values** differ—monospace fonts, flat grayscale colors to create a deliberate low-fidelity aesthetic.

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

## Design Principles

1. **Structure Over Style**: Show architecture, not visual design
2. **Explicit Labels**: Annotate placeholders `[HERO]`, `[IMAGE]`, `[CTA]`
3. **Flat Aesthetic**: No shadows, gradients, or depth effects
4. **Monospace Typography**: Removes typographic personality
5. **Fast Iteration**: Optimize for speed over pixel perfection

---

*See [Elementary Design System](../elementary/tokens.md) for complete token documentation and [Design Systems README](../README.md) for system selection guidance.*

---

*Part of the [Reactive MD Design Systems](../README.md)*
