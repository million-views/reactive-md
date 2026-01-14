# Elementary Design System

> A good design system should eliminate ambiguity when naming or choosing variables; that alone is winning half the battle. The rest of the battle is in providing frictionless context and utility.

`Elementary` is a token-based design system with layer separation. Use tokens directly, or with optional pre-built components.

## Quick Start

### 1. Import a Theme

Polished and Sketch themes use identical token names with different values.

```css
/* Polished, production-ready theme */
@import './assets/elementary/tokens/polished.css';

/* OR Sketch, low-fidelity theme */
@import './assets/elementary/tokens/sketch.css';
```

### 2. Use Tokens in Your CSS

```css
.my-card {
  background-color: var(--bg-surface);
  border-radius: var(--r-card);
  padding: var(--p-card);
  box-shadow: var(--x-card-shadow);
}
```

### 3. Swap Themes (Optional)

Change the import at the top. All token names stay the same.

```css
@import './assets/elementary/tokens/sketch.css';  /* Different visual, same names */
```

### 4. Use Optional Components (Optional)

If you prefer pre-built patterns:

```jsx
<article className="wf-card">
  Card content
</article>
```

```css
@import './assets/elementary/components.css';  /* Only if using components */
```

---

## Architecture

### Layer 1: Token Names
Standardized CSS variable names that never change.

- **Color:** `--c-primary`, `--c-slate-500`, etc.
- **Background:** `--bg-surface`, `--bg-overlay`, etc.
- **Space:** `--s-0`, `--s-4`, `--s-8`, etc. (4px unit scale)
- **Radius:** `--r-0`, `--r-2`, `--r-card`, etc.
- **Typography:** `--t-body`, `--ff-sans`, `--fw-400`, etc.
- **Effects:** `--x-card-shadow`, `--x-0`, etc.

**Both themes use the same token names.** Only values change.

### Layer 2: Theme Values
Implementations of the token names.

**Polished Theme:**
- Full color palette with semantic meaning
- Professional typography and spacing
- Depth effects (shadows, glows)
- Light/dark mode support

**Sketch Theme:**
- Grayscale only
- Monospace typography
- Flat, minimal effects
- Signals "structure, not design"

### Layer 3: Optional Components
Pre-built CSS classes for common patterns.

- `.wf-card`, `.wf-button`, `.wf-input`, `.wf-hero`, `.wf-grid`, etc.
- Work with ANY theme (swap theme, component looks different)
- Completely optional (build your own with tokens)

---

## When to Use Elementary

| Use Elementary | Use Tailwind | Use Custom |
|---|---|---|
| Themeable components | One-off examples | Unique patterns |
| Design system consistency | Speed > reusability | Full control |
| Swappable themes | Quick prototypes | Complex layouts |

---

## Learning Path

1. **Start here:** [Token System](./references/token-system.md) - Understand the naming convention
2. **Choose a theme:** [Themes](./references/themes.md) - Polished vs. Sketch
3. **Learn components:** [Components](./references/components.md) - Pre-built patterns (optional)
4. **See examples:** [Recipes](./references/recipes/) - Real-world implementations

---

## Complete Token Reference

See [Token System](./references/token-system.md) for the complete list of all token names and their scales.

---

## Philosophy

Good design systems eliminate ambiguity. Every token name is intentional. Every value is decided.

**Ink & Paper metaphor:**
- **Ink** (`--c-*`): Colors that sit on top (text, borders, icons)
- **Paper** (`--bg-*`): Surfaces underneath (backgrounds, cards, layers)
- **Structure** (`--s-*`, `--r-*`, `--ff-*`): Dimensions and layout
- **Atmosphere** (`--x-*`): Effects and depth

Token names never change. Theme values do. This allows switching visual fidelity by changing a single CSS import.

---

## Key Decisions

### 1. Token Names vs. Theme Values

Token names (Layer 1) are your contract. They're defined once, used everywhere, and never change.

Theme values (Layer 2) are your implementations. You can have as many as you want—Polished, Sketch, Dark Mode, Brand A, Brand B, etc.

**To swap themes:** Change one CSS import. All names stay the same.

### 2. Component Classes Are Optional

Don't use component classes if you don't need them. Just use tokens directly in your CSS.

```css
/* Option 1: Use components (if available) */
<article className="wf-card">Content</article>

/* Option 2: Use tokens directly (always works) */
<article style={{ padding: 'var(--p-card)', borderRadius: 'var(--r-card)' }}>
  Content
</article>

/* Option 3: Custom CSS with tokens (recommended for reusable patterns) */
.my-card {
  padding: var(--p-card);
  border-radius: var(--r-card);
  background-color: var(--bg-surface);
}
```

All three are valid. Pick based on your needs.

### 3. Inline Styles: Tiny Tweaks Only

Use inline styles for 1-2 property overrides. For anything more, create a CSS class.

```jsx
/* ✅ OK: Tiny override */
<div style={{ color: 'var(--c-error)' }}>Error message</div>

/* ❌ Avoid: Multiple properties inline */
<div style={{
  padding: 'var(--p-card)',
  backgroundColor: 'var(--bg-surface)',
  borderRadius: 'var(--r-card)',
  boxShadow: 'var(--x-card-shadow)'
}}>
  Use a CSS class instead
</div>
```

---

## Documentation

- **[Token System](./references/token-system.md)** - Complete token reference and naming conventions
- **[Themes](./references/themes.md)** - Polished vs. Sketch theme documentation
- **[Components](./references/components.md)** - Pre-built component patterns
- **[Recipes](./references/recipes/)** - Real-world examples and use cases

---

## What's in the Assets Folder

```
assets/elementary/
├── tokens/
│   ├── polished.css      ← Polished theme (production-ready)
│   └── sketch.css        ← Sketch theme (low-fidelity)
└── components.css        ← Optional component classes
```

Import the CSS file for the theme you want. Token names are identical between themes—only the values change.
