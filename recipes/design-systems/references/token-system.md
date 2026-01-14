# Token Naming System (Layer 1)

**This is the contract**: Standardized CSS custom property names used across ALL themes.

> **What This Document Contains:** The complete token naming system, architecture, philosophy, and practical usage guide. Token NAMES defined here are shared by all themes (Polished and Sketch). Only the VALUES differ.

## Core Philosophy: Ink & Paper

A good design system should eliminate ambiguity when naming or choosing variables; that alone is winning half the battle. The rest of the battle is in providing a frictionless context and utility.

Every property belongs to one of four physical categories:

1. **Ink (`--c-`)**: The pigment. Anything *on top* of a surface (Text, Icons, Borders)
2. **Paper (`--bg-`)**: The substrate. The surface that holds the ink (Backgrounds, Cards, Layers)
3. **Structure (`--s-`, `--w-`, `--g-`, ...)**: The physics. Dimensions, spacing, geometry, and layout
4. **Atmosphere (`--x-`, `--a-`)**: The _feel_. Lighting, depth, and time

**Rule**: When styling, ask "Is this ink or paper?"

## Three-Layer Architecture

We strictly separate **what we have** (Primitives) from **how we use it** (Semantics) from **where we apply it** (Components).

### Layer 1: Primitives (The Warehouse)

* **Analogy:** The supply depot containing raw building blocks.
* **Scope:** Global (`:root`).
* **Naming:** Strict **Numeric Scales** (e.g., `--s-4`, `--c-slate-500`, `--x-2`).
* **Purpose:** Unopinionated inventory. The warehouse doesn't care if you use a 2x4 for a wall or a floor.
* **Rule:** Never use these directly in components if a Blueprint alias exists.
* **Examples:** `--s-4` (spacing: 16px), `--c-slate-500` (color: gray), `--r-3` (radius: medium)

### Layer 2: Semantics (The Blueprint)

* **Analogy:** The architectural plans.
* **Scope:** Global (`:root`).
* **Naming:** **Intent-based** (e.g., `--p-card`, `--c-primary`, `--x-card-shadow`).
* **Purpose:** Decisions. The architect looks at the warehouse and says, *"We will use Slate-500 for all secondary text."*
* **Rule:** This is the layer you edit to change "Themes" (e.g., Dark Mode).
* **Examples:** `--c-primary` (maps to a primitive color), `--bg-surface` (maps to a primitive background), `--r-btn` (maps to a primitive radius)
* **Usage**: Use these in component code. This is what you customize for themes.

### Layer 3: Components (The Construction)

* **Analogy:** The actual building site.
* **Scope:** Local (e.g., `.bold-pricing`).
* **Naming:** Local constraints or direct consumption of Blueprints, following `--<property>-of-<element>` pattern.
* **Purpose:** Assembling the UI using the plans.
* **Rule:** Follow the Blueprint for consistency; use local measurements only for unique constraints.
* **Examples:** `--r-badge` (radius of badge), `--p-card-content` (padding of card content)

### The Prefix Taxonomy

*The classification system used to organize the Warehouse.*

#### Reading Component Custom Properties

Component-level custom properties follow the pattern `--<property>-of-<element>`:
- `--r-badge` = **radius of badge**
- `--m-actions` = **margin of actions**
- `--fw-heading` = **font-weight of heading**
- `--c-title` = **color of title**

This pattern makes component customization intent immediately clear.

| Prefix | Category | Scale Logic | Examples |
|--------|----------|-------------|----------|
| `--c-` | Color (Ink) | 050–950 | `--c-primary`, `--c-slate-500` |
| `--bg-` | Background (Paper) | Semantic | `--bg-surface`, `--bg-overlay` |
| `--s-` | Space | 0–9 (4px steps) | `--s-4` = 16px, `--s-8` = 32px |
| `--ff-` | Font Family | Categorical | `--ff-sans`, `--ff-mono` |
| `--fw-` | Font Weight | 100–900 | `--fw-400` = normal, `--fw-700` = bold |
| `--fs-` | Font Size | 1–9 | `--fs-3` = body, `--fs-7` = heading |
| `--t-` | Typography | Semantic | `--t-heading`, `--t-body` (shorthand) |
| `--r-` | Radius | 0–6 | `--r-btn`, `--r-card`, `--r-3` |
| `--b-` | Border | 0–4 | `--b-1` = 1px, `--b-2` = 2px |
| `--x-` | Effects (Shadows) | 0–5 | `--x-card`, `--x-overlay` |
| `--o-` | Opacity | 0–9 | `--o-0` = transparent, `--o-9` = opaque |
| `--z-` | Z-Index | 0–6 | `--z-dropdown`, `--z-modal` |
| `--a-` | Animation | Semantic | `--a-fast`, `--a-smooth` |
| `--w-` | Width | Semantic | `--w-container`, `--w-prose` |
| `--h-` | Height | Semantic | `--h-screen`, `--h-hero` |
| `--p-` | Padding | Maps to `--s-` | `--p-card` = `--s-6` |
| `--m-` | Margin | Maps to `--s-` | `--m-section` = `--s-8` |
| `--g-` | Gap | Maps to `--s-` | `--g-grid` = `--s-4` |

### Scale Explanations

**Space Scale (`--s-`)**: 4px increments
```
--s-0: 0px
--s-1: 4px
--s-2: 8px
--s-3: 12px
--s-4: 16px (most common)
--s-5: 20px
--s-6: 24px
--s-7: 28px
--s-8: 32px
--s-9: 36px
```

**Color Scale (`--c-`)**: Lightness/density
```
050: Lightest (almost white)
100-400: Light tones
500: Base color
600-900: Dark tones
950: Darkest (almost black)
```

**Radius Scale (`--r-`)**: Corner roundness
```
--r-0: 0px (square)
--r-1: 2px (subtle)
--r-2: 4px (soft)
--r-3: 8px (medium)
--r-4: 12px (rounded)
--r-5: 16px (very rounded)
--r-6: 24px (pill-like)
```

## Nuance & Rules

### The "Zero Protocol"

We reserve `0` as a functional token to explicitly reset properties:

* **`--s-0`**: `0px` (Use to remove padding/margin).
* **`--r-0`**: `0px` (Use to square off corners).
* **`--b-0`**: `0` (Use to remove borders).
* **`--x-0`**: `none` (Use to remove shadows/filters).
* **`--o-0`**: `0` (Use for fully transparent).

**Use case**: Explicitly resetting properties, not default styling.

### The Font Size Exception

**`--fs-0` does not exist** and never will.

**Why**: There is no valid "neutral" font size:
- `0px` is invisible (meaningless)
- `inherit` breaks the numeric scale
- `initial` resets to browser default (16px), which is larger than `--fs-1`

**Rule**: Font size scale starts at `--fs-1` (smallest legible text). If you need to hide text, use `display: none` or `visibility: hidden`, not font-size.

### Constraint vs. Consistency

* **Consistency Tokens (Global):** If you change this, *every* instance in the app should change.
  * *Place in:* **`:root`**
  * *Examples:* Corner Radius (`--r-card`), Brand Color (`--c-primary`).

* **Constraint Tokens (Local):** If you change this, only *this specific component* should change.
  * *Place in:* **Component CSS**
  * *Examples:* Max Width of a card (`--w-max`), Font size of a specific price tag (`--fs-9`).

## Usage Patterns

### ✅ Correct: Use Semantic Tokens
```css
color: var(--c-primary);
background-color: var(--bg-surface);
padding: var(--s-4);
border-radius: var(--r-btn);
```

### ⚠️ Avoid: Direct Primitive Usage
```css
/* Only use in theme files, not component code */
color: var(--c-slate-700);
padding: var(--s-4); /* This is OK - space primitives are commonly used */
```

### ❌ Wrong: Hardcoded Values
```css
/* Never hardcode - defeats the token system */
color: #333333;
padding: 16px;
```

## Component Creation Checklist

Use this checklist when building new components:

### Token Selection
- [ ] Use semantic tokens (not primitives) for colors, spacing, and effects
- [ ] Create 6-12 component properties maximum
- [ ] Expose only layout constraints, container appearance, and action elements
- [ ] Let typography, colors, and effects inherit from global semantics
- [ ] Follow prefix taxonomy: `--[prefix]-[component]-[modifier]`
- [ ] Avoid redundant naming (~~`--s-card-padding`~~ → `--p-card`)

### Customization Points
- [ ] **Layout**: Max width, padding, gap
- [ ] **Container**: Background, radius, shadow
- [ ] **Actions**: Button padding, radius, colors
- [ ] **Skip**: Individual text sizes, one-off colors, micro-spacing

### Accessibility
- [ ] Minimum 44×44px touch targets for interactive elements
- [ ] 4.5:1 contrast ratio for normal text (3:1 for large text)
- [ ] Focus indicators use `--b-2` or higher with high contrast
- [ ] Semantic HTML with proper ARIA when needed

## Decision Framework

### Should I Create a New Token?

**Create a semantic token** if:
- Multiple components need this exact value
- Value changes across themes (light/dark)
- Represents intent ("primary action", "error state")
- Example: `--c-danger`, `--p-section`, `--x-elevated`

**Create a component property** if:
- Only this component needs customization
- Value is a constraint, not a theme concern
- Users might want to override it
- Example: `--w-modal-max`, `--p-card-content`

**Use existing tokens** if:
- Typography for body text → `var(--fs-3)`, `var(--c-text)`
- Standard spacing → `var(--s-4)`, `var(--g-standard)`
- Common effects → `var(--x-card-shadow)`, `var(--r-btn)`

### Which Layer?

```
Need a color for all error states? → Semantic (--c-danger)
Need card padding that themes don't change? → Component (--p-my-card)
Need the raw 16px value for calculation? → Primitive (--s-4)
```

## Common Mistakes

### ❌ Don't Override Global Semantics in Components
```css
/* BAD: Component changes global meaning */
.my-component {
  --c-primary: var(--c-blue-500);
  --c-text: var(--c-slate-900);
}
```
```css
/* GOOD: Use global semantics directly */
.my-component {
  color: var(--c-text);
  background: var(--c-primary);
}
```

### ❌ Don't Use Primitives When Semantics Exist
```css
/* BAD: Bypasses theme system */
.card {
  padding: var(--s-8);
  border-radius: var(--r-4);
}
```
```css
/* GOOD: Uses semantic aliases */
.card {
  padding: var(--p-card);
  border-radius: var(--r-card);
}
```

### ❌ Don't Create Single-Use Component Tokens
```css
/* BAD: Over-specified for one element */
.pricing {
  --c-pricing-subtitle: var(--c-muted);
  --p-pricing-subtitle: var(--s-2);
}
```
```css
/* GOOD: Use global tokens directly */
.pricing p {
  color: var(--c-muted);
  padding: var(--s-2);
}
```

### ❌ Don't Mix Prefix Categories
```css
/* BAD: Wrong prefix for padding */
.button {
  --s-button-padding: var(--s-4);
}
```
```css
/* GOOD: Use correct prefix */
.button {
  --p-button: var(--s-4);
}
```

## See Also

- `themes.md` - How token values differ across themes
- `components.md` - How component classes use these tokens
- `../assets/elementary/tokens/polished.css` - Polished theme values for primitive and semantic tokens
- `../assets/elementary/tokens/sketch.css` - Sketch theme values for primitive and semantic tokens
