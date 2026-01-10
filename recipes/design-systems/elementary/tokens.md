# The Elementary Design System Manual

**Version 1.0 (Construction Standard)**

> **Acknowledgment:** Elementary is inspired by the foundational principles of Google's Material Design, particularly the "ink and paper" metaphor. We're grateful for their pioneering work in design systems.

**Quick Start:**
- [Reactive-MD components](../reactive-md.css) - Complete component library (works with these tokens)
- [Wireframe tokens](../wireframe/tokens.md) - Low-fidelity alternative to Elementary
- [Use cases](../use-cases/) - Complete demonstrations

## 1. The Core Philosophy: "Ink & Paper"

A good design system should eliminate ambiguity when naming or choosing variables; that alone is winning half the battle. The rest of the battle is in providing a frictionless context and utility.

This design system uses "Ink & Paper" as the physical metaphor for context. Every property belongs to one of four physical categories:

1. **Ink (`--c-`)**: The pigment. Anything that sits *on top* of a surface (Text, Icons, Borders).
2. **Paper (`--bg-`)**: The surface. The substrate that holds the ink (Backgrounds, Cards, Layers).
3. **Structure (`--s-`, `--w-`, `--g-`, ...)**: The physics. Dimensions, spacing, geometry, and layout.
4. **Atmosphere (`--x-`, `--a-`)**: The _feel_. Lighting, depth, and time.

---

## 2. The Architecture: "Warehouse vs. Blueprint"

We strictly separate **what we have** (Primitives) from **how we use it** (Semantics).

### Layer 1: Primitives (The Warehouse)

* **Analogy:** The supply depot containing raw building blocks.
* **Scope:** Global (`:root`).
* **Naming:** Strict **Numeric Scales** (e.g., `--s-4`, `--c-slate-500`, `--x-2`).
* **Purpose:** Unopinionated inventory. The warehouse doesn't care if you use a 2x4 for a wall or a floor.
* **Rule:** Never use these directly in components if a Blueprint alias exists.

### Layer 2: Semantics (The Blueprint)

* **Analogy:** The architectural plans.
* **Scope:** Global (`:root`).
* **Naming:** **Intent-based** (e.g., `--p-card`, `--c-primary`, `--x-card-shadow`).
* **Purpose:** Decisions. The architect looks at the warehouse and says, *"We will use Slate-500 for all secondary text."*
* **Rule:** This is the layer you edit to change "Themes" (e.g., Dark Mode).

### Layer 3: Components (The Construction)

* **Analogy:** The actual building site.
* **Scope:** Local ( e.g `.bold-pricing`).
* **Naming:** Local constraints or direct consumption of Blueprints.
* **Purpose:** Assembling the UI using the plans.
* **Rule:** Follow the Blueprint for consistency; use local measurements only for unique constraints.

---

## 3. The Prefix Taxonomy

*The classification system used to organize the Warehouse.*

### Reading Component Custom Properties

Component-level custom properties follow the pattern `--<property>-of-<element>`:
- `--r-badge` = **radius of badge**
- `--m-actions` = **margin of actions**
- `--fw-heading` = **font-weight of heading**
- `--c-title` = **color of title**

This pattern makes component customization intent immediately clear.

### System Token Prefixes

| Prefix | Category | Physical Analogy | Scale Logic | Meaning |
| --- | --- | --- | --- | --- |
| **`--c-`** | **Color (Ink)** | Pigment | **050–950** | Solid colors (Lightness/Density). |
| **`--bg-`** | **Background** | Paper | **Semantic** | Surface layers. |
| **`--s-`** | **Space** | Ruler | **0–9** | Raw units (4px steps). |
| **`--ff-`** | **Font Family** | Typeface | **Categorical** | Sans, serif, monospace. |
| **`--fw-`** | **Font Weight** | Type density | **100–900** | Thin to black weights. |
| **`--fs-`** | **Font Size** | Typesetting | **1–9** | Size + line-height pairs. |
| **`--t-`** | **Typography** | Complete font | **Semantic** | Font shorthand (weight + size + family). |
| **`--r-`** | **Radius** | Erosion | **0–6** | Corner roundness (0 is square). |
| **`--b-`** | **Border** | Frame | **0–4** | Border Width. |
| **`--x-`** | **Effects** | Atmosphere | **0–5** | Shadows, Glows, Blurs. |
| **`--o-`** | **Opacity** | Transparency | **0–9** | Transparency/visibility level. |
| **`--z-`** | **Z-Index** | Elevation | **0–6** | Layer stacking order. |
| **`--a-`** | **Animation** | Time | **Semantic** | Durations and Easings. |
| **`--w-`** | **Width** | Constraint | **Semantic** | Horizontal boundaries. |
| **`--h-`** | **Height** | Constraint | **Semantic** | Vertical boundaries. |
| **`--p-`** | **Padding** | Alias | **Maps to `--s-`** | Semantic internal spacing. |
| **`--m-`** | **Margin** | Alias | **Maps to `--s-`** | Semantic external spacing. |
| **`--g-`** | **Gap** | Alias | **Maps to `--s-`** | Semantic grid/flex spacing. |

**Scale Logic Key:**
- **`0–9`**: Complete numeric scale for measurable/quantifiable properties
- **`1–9`**: Font size scale (starts at 1, no zero for readability)
- **`050–950`**: Color luminance scale (specialized for contrast)
- **`100–900`**: Font weight scale (thin to black)
- **`Categorical`**: Font families (sans, serif, mono)
- **`Semantic`**: Contextual values that don't follow numeric progression
- **`Maps to --s-`**: Aliases that reference the space scale

---

## 4. Nuance & Rules

### A. The "Zero Protocol"

We reserve `0` as a functional token to explicitly reset properties.

* **`--s-0`**: `0px` (Use to remove padding/margin).
* **`--r-0`**: `0px` (Use to square off corners).
* **`--b-0`**: `0` (Use to remove borders).
* **`--x-0`**: `none` (Use to remove shadows/filters).

### B. The Font Size Exception

**`--fs-0` does not exist.**

* *Why:* There is no valid "neutral" font size. `0px` is invisible, `inherit` breaks the numeric scale, and `initial` resets to 16px (which is larger than `--fs-1`).
* *Rule:* The scale starts at `--fs-1` (Smallest legible text).

### C. Constraint vs. Consistency

* **Consistency Tokens (Global):** If you change this, *every* instance in the app should change.
  * *Place in:* **`:root`**
  * *Examples:* Corner Radius (`--r-card`), Brand Color (`--c-primary`).

* **Constraint Tokens (Local):** If you change this, only *this specific component* should change.
  * *Place in:* **Component CSS**
  * *Examples:* Max Width of a card (`--w-max`), Font size of a specific price tag (`--fs-9`).

---

## 5. Component Creation Checklist

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

---

## 6. Common Mistakes

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
  --fs-pricing-subtitle: var(--fs-3);
  --p-pricing-subtitle: var(--s-2);
}
```
```css
/* GOOD: Use global tokens directly */
.pricing p {
  color: var(--c-muted);
  font-size: var(--fs-3);
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

---

## 7. Decision Framework

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

---

## 8. Token Reference

Primitives define the raw values. Semantics map them to intent.

### 1. Color (`--c-`) — The Ink

**Physical Analogy:** Think of ink in a printing press. You have bottles of different pigments in various shades. The ink sits *on top of* the paper surface, creating visible marks (text, icons, borders).

**Category:** Foreground elements that need color.
* Text content
* Icons and symbols
* Border colors
* Outline strokes

**Scale Logic (050–950):** Based on **luminance and density**, following the OKLCH color space.
* **050–100:** Near-white tints. Inverted text on dark backgrounds.
* **200–300:** Light decorators. Subtle borders, disabled states, placeholder text.
* **400–500:** **The Balance Point.** Accessible contrast against white. Secondary text, branded UI elements.
* **600–700:** Strong contrast. Subheaders, focused states, active elements.
* **800–950:** Near-black. Primary body text, strong headings, maximum contrast.

**Primitives:**
```css
--c-slate-500: oklch(55% 0.04 260);
--c-blue-500: oklch(62% 0.22 260);
--c-emerald-500: oklch(65% 0.18 150);
```

**Semantics:**
```css
--c-text: var(--c-slate-900);
--c-muted: var(--c-slate-500);
--c-primary: var(--c-blue-500);
```

### 2. Space (`--s-`) — The Ruler

**Physical Analogy:** A measuring tape used in construction. Every measurement is taken from the same graduated scale, ensuring consistency. The 4px base unit is like the smallest tick mark on your ruler.

**Category:** The fundamental unit of measurement for the entire system.
* Padding (internal spacing)
* Margin (external spacing)
* Gap (grid/flex spacing)
* Any dimensional measurement

**Scale Logic (0–9):** Linear progression in **0.25rem (4px)** increments.
* **Why 4px?** It's the smallest perceptible unit on most screens and divides evenly into common viewport sizes (320, 375, 768, 1024, 1920).
* **Optical consistency:** Using multiples of 4 creates visual rhythm.

**The Scale:**
* **`--s-0` (0px):** Reset/remove spacing entirely.
* **`--s-1` (4px):** Fine tuning. Icon optical adjustments.
* **`--s-2` (8px):** **The Atom.** Smallest standard gap (text + icon).
* **`--s-3` (12px):** Compact spacing. Small buttons, tight layouts.
* **`--s-4` (16px):** **The Base.** Standard padding for inputs, buttons.
* **`--s-5` (20px):** Comfortable spacing. Form fields, list items.
* **`--s-6` (24px):** Generous spacing. Card content, modal padding.
* **`--s-7` (28px):** Section breathing room.
* **`--s-8` (32px):** Layout separation. Major component spacing.
* **`--s-9` (36px):** Maximum separation. Page-level sections.

**Primitives:**
```css
--s-0: 0;
--s-4: 1rem;      /* 16px */
--s-8: 2rem;      /* 32px */
```

**Semantics:**
```css
--p-card: var(--s-8);
--g-standard: var(--s-2);
```

### 3. Font Size (`--fs-`) — The Typesetter

**Physical Analogy:** The type cases in a traditional printing press. Each drawer contains a complete set of characters at a specific size, pre-configured with proper leading (line height) for optimal readability.

**Category:** Preset combinations of font-size and line-height.
* Paragraph text
* Headings and titles
* UI labels and captions
* Display text

**Scale Logic (1–9):** Progressive size steps, **no zero** (see Font Size Exception in Section 4B).
* **Why no `--fs-0`?** There's no valid "neutral" font size. 0px is invisible, and `inherit` breaks the scale.
* **Modular scale:** Each step increases by approximately 1.2× the previous size.

**The Scale:**
* **`--fs-1`:** 12px @ 1.5 line-height. Utility. Captions, legal text, micro-labels.
* **`--fs-2`:** 14px @ 1.5 line-height. Small text. Metadata, table data.
* **`--fs-3`:** 16px @ 1.5 line-height. **Body Base.** The standard reading size.
* **`--fs-4`:** 18px @ 1.4 line-height. Interface text. Emphasized body, button labels.
* **`--fs-5`:** 20px @ 1.4 line-height. Large interface. Input labels, small headings.
* **`--fs-6`:** 24px @ 1.3 line-height. Subheadings. Card titles, section headers.
* **`--fs-7`:** 30px @ 1.2 line-height. Headings. Page sections, h2-level.
* **`--fs-8`:** 36px @ 1.2 line-height. Display. Feature sections, h1-level.
* **`--fs-9`:** 48px @ 1.1 line-height. Heroes. Page titles, major headings.

**Primitives:**
```css
--fs-3: 1rem/1.5;
--fs-7: 1.875rem/1.2;
--fs-9: 3rem/1.1;
```

**Semantics:**
```css
--fs-body: var(--fs-3);
--fs-heading: var(--fs-7);
```

### 4. Font Family (`--ff-`) — The Typeface

**Physical Analogy:** Different physical typeface molds in a print shop. Each mold has a distinct personality (serif, sans-serif, monospace).

**Category:** Font family stacks.
* Typeface families (sans, serif, mono)

**Scale Logic:** Categorical (named families).

**The Scale:**
* **`--ff-sans`:** Sans-serif. The workhorse for 99% of UI text.
* **`--ff-serif`:** Serif. Editorial content, formal headings, marketing.
* **`--ff-mono`:** Monospace. Code blocks, technical data, tabular numbers.

**Primitives:**
```css
--ff-sans: system-ui, sans-serif;
--ff-mono: 'Monaco', monospace;
```

**Semantics:**
```css
--ff-body: var(--ff-sans);
--ff-code: var(--ff-mono);
```

### 5. Font Weight (`--fw-`) — The Type Density

**Physical Analogy:** Pressing down harder with a pen creates thicker, bolder strokes. Font weight is the visual thickness of letterforms.

**Category:** Font weight values.
* Text emphasis levels

**Scale Logic:** Numeric (100-900).
* **Standard weights**: 400 (regular), 700 (bold)
* **Extended range**: 100 (thin) to 900 (black)

**The Scale:**
* **`--fw-100` to `--fw-300`:** Thin to Light. Large display text only.
* **`--fw-400`:** Regular. Standard body text.
* **`--fw-500` to `--fw-600`:** Medium to Semi-Bold. Emphasis, subheadings.
* **`--fw-700`:** Bold. Headings, strong emphasis.
* **`--fw-800` to `--fw-900`:** Extra Bold to Black. Display headings, hero text.

**Primitives:**
```css
--fw-400: 400;
--fw-700: 700;
```

**Semantics:**
```css
--fw-normal: var(--fw-400);
--fw-bold: var(--fw-700);
```

### 7. Typography (`--t-`) — Complete Font Declarations

**Physical Analogy:** Pre-mixed paint colors. Instead of mixing your own pigments (weight + size + family), you grab a pre-configured can labeled "Body Text" or "Heading" that has the perfect combination already prepared.

**Category:** Complete font shorthand declarations.
* Ready-to-use typography presets
* Component typography slots
* Complete font specifications in one token

**Scale Logic:** Semantic (intent-based, not numeric).
* **Why semantic?** Typography presets represent design decisions, not measurable quantities.
* **Composition:** Each `--t-*` token combines `font-weight`, `font-size/line-height`, and `font-family` using CSS font shorthand.

**When to Use:**

**Use `--t-*` (typography presets) when:**
- Setting complete typography for an element: `font: var(--t-body)`
- Creating component typography slots: `--t-title`, `--t-desc`
- You want weight + size + family to change together
- Simplifying component customization (one token controls all)

**Use individual tokens (`--ff-`, `--fw-`, `--fs-`) when:**
- Overriding only one aspect: `font-weight: var(--fw-700)`
- Mixing different scales: `font-size: var(--fs-5); font-family: var(--ff-mono)`
- Creating custom combinations not in presets
- Fine-grained control needed

**The Pattern:**
```css
/* System preset */
--t-body: var(--fw-400) var(--fs-3) var(--ff-sans);

/* Component slot */
.card .title {
  font: var(--t-title, var(--t-heading));
}
```

**Built from these primitives:**
```css
--ff-sans: system-ui, sans-serif;
--fw-400: 400;
--fs-3: 1rem/1.5;
```

**Semantics:**
```css
/* Global typography presets */
--t-body: var(--fw-400) var(--fs-3) var(--ff-sans);
--t-heading: var(--fw-700) var(--fs-7) var(--ff-sans);
--t-code: var(--fw-400) var(--fs-3) var(--ff-mono);

/* Component-level typography slots */
.hero {
  --t-hero-title: var(--fw-900) var(--fs-9) var(--ff-sans);
  --t-hero-subtitle: var(--fw-400) var(--fs-5) var(--ff-sans);
}
```

### 7. Radius (`--r-`) — The Erosion

**Physical Analogy:** Imagine water erosion smoothing the corners of a stone over time. `--r-0` is a freshly cut stone with sharp corners. Higher values represent more erosion, creating smoother, friendlier edges.

**Category:** Border radius (corner roundness).
* Button corners
* Card edges
* Input field borders
* Modal windows
* Image corners

**Scale Logic (0–6):** Geometric progression, doubling at each major step.
* **Why geometric?** Visual perception of "roundness" is logarithmic, not linear.
* **Consistency:** Using powers of 2 creates harmonious relationships.

**The Scale:**
* **`--r-0` (0px):** Square. Technical interfaces, data tables, grids.
* **`--r-1` (2px):** Barely perceptible. Subtle softening for input fields.
* **`--r-2` (4px):** Standard rounding. Buttons, small cards, chips.
* **`--r-3` (8px):** Generous rounding. Modals, large cards, panels.
* **`--r-4` (16px):** Very round. Special accent elements, badges.
* **`--r-5` (24px):** Dramatic rounding. Hero elements, floating actions.
* **`--r-6` (32px):** Maximum rounding. Rare, artistic treatments.

**Primitives:**
```css
--r-0: 0;
--r-2: 4px;
--r-3: 8px;
```

**Semantics:**
```css
--r-btn: var(--r-2);
--r-card: var(--r-3);
```

### 8. Border (`--b-`) — The Frame

**Physical Analogy:** Picture frames of different thicknesses around a painting. Thin frames are subtle and don't compete with the content. Thick frames make a bold statement and demand attention.

**Category:** Border width (outline thickness).
* Input field borders
* Card outlines
* Divider lines
* Focus indicators
* Decorative strokes

**Scale Logic (0–4):** Linear progression in 1px increments.
* **Why linear?** Border thickness perception is fairly linear at small values.
* **Limited range:** Beyond 4px, borders become decorative elements rather than structural ones.

**The Scale:**
* **`--b-0` (0px):** No border. Borderless inputs, reset states.
* **`--b-1` (1px):** Standard borders. Input fields, card outlines, dividers.
* **`--b-2` (2px):** Heavy borders. Focus states, selected items, emphasis.
* **`--b-3` (3px):** Very heavy. Special emphasis, error states, warnings.
* **`--b-4` (4px):** Maximum structural thickness. Rare, usually decorative.

**Primitives:**
```css
--b-0: 0;
--b-1: 1px;
--b-2: 2px;
```

**Semantics:**
```css
--b-standard: 1px solid var(--c-border);
--b-focus: var(--b-2);
```

### 9. Effects (`--x-`) — The Atmosphere

**Physical Analogy:** Lighting in a theater. A spotlight creates shadows beneath elevated objects. The higher the object, the longer and softer the shadow. `--x-0` is flat stage lighting (no shadows). Higher values are like raising an object on a pedestal under dramatic lighting.

**Category:** Visual effects that suggest depth and hierarchy.
* Box shadows (elevation)
* Drop shadows
* Glows and halos
* Blur effects
* Filter effects

**Scale Logic (0–5):** Progressive elevation levels.
* **Why limited range?** Beyond 5 levels, shadows become distracting and lose meaning.
* **Optical design:** Each level represents a distinct z-axis distance in a physical space metaphor.

**The Scale:**
* **`--x-0` (none):** Flat. No shadow or effect. Modern, minimalist designs.
* **`--x-1` (subtle):** Barely elevated. Resting cards, default buttons (2-4px blur).
* **`--x-2` (moderate):** Clearly elevated. Dropdowns, tooltips, hover states (4-8px blur).
* **`--x-3` (significant):** Floating. Modals, sticky headers, drag states (8-16px blur).
* **`--x-4` (dramatic):** Prominently elevated. Notifications, active overlays (12-24px blur).
* **`--x-5` (maximum):** System-level. Full-screen dialogs, critical alerts (16-32px blur).

**Primitives:**
```css
--x-0: none;
--x-2: 0 4px 12px oklch(0% 0 0 / 0.15);
```

**Semantics:**
```css
--x-card-shadow: var(--x-2);
--x-glass: blur(10px);
```

### 10. Background (`--bg-`) — The Paper

**Physical Analogy:** Different types of paper in a stationery shop. You have the base notebook paper, cardstock for cards, translucent vellum for overlays, and specialty papers for different purposes.

**Category:** Surface layers and backgrounds.
* Page backgrounds
* Card surfaces
* Modal backdrops
* Overlay layers
* Section backgrounds

**Scale Logic:** Semantic (no numeric scale).
* **Why semantic?** Backgrounds represent layers and contexts, not quantifiable measurements.

**Primitives:**
```css
--c-slate-50: oklch(98% 0.01 260);
--c-white: oklch(100% 0 0);
```

**Semantics:**
```css
--bg-app: light-dark(var(--c-slate-50), var(--c-slate-950));
--bg-surface: light-dark(var(--c-white), var(--c-slate-900));
--bg-overlay: light-dark(oklch(0% 0 0 / 0.5), oklch(0% 0 0 / 0.7));
```

### 10. Animation (`--a-`) — The Physics

**Physical Analogy:** The motion of objects in the real world. A light switch flips instantly (`--a-fast`), a door swings at normal speed (`--a-base`), and a heavy gate opens slowly (`--a-slow`). Natural motion has acceleration and deceleration—nothing moves at constant speed (linear motion feels robotic).

**Category:** Time duration and easing curves.
* Transition durations
* Animation timings
* Easing functions
* Motion choreography

**Scale Logic:** Semantic (no numeric scale).
* **Why semantic?** Motion timing is context-dependent, not quantifiable on a linear scale.

**Primitives:**
```css
--a-fast: 0.1s;
--a-base: 0.2s;
--a-slow: 0.5s;
--a-ease: ease-in-out;
```

**Semantics:**
```css
--a-hover: var(--a-fast);
--a-dropdown: var(--a-base);
--a-modal: var(--a-slow);
```

### 10. Width (`--w-`) — The Horizontal Constraint

**Physical Analogy:** Doorframes and hallways. Each has a defined width that determines what can pass through. Too narrow and things get cramped; too wide and the space feels empty and unfocused.

**Category:** Horizontal boundaries and containers.
* Container widths
* Column layouts
* Sidebar dimensions
* Content max-widths
* Responsive breakpoints

**Scale Logic:** Semantic (no numeric scale).
* **Why semantic?** Width constraints are context-dependent and related to content, not absolute measurements.

**Semantics:**
```css
--w-container: 1024px;
--w-sidebar: 280px;
--w-prose: 65ch;
```

### 11. Height (`--h-`) — The Vertical Constraint

**Physical Analogy:** Building floor heights and doorway clearances. A standard door is 80 inches tall; cathedral ceilings soar higher. Each serves a different purpose and creates a different feeling.

**Category:** Vertical boundaries and dimensions.
* Header heights
* Hero section heights
* Minimum content heights
* Viewport heights
* Component-specific heights

**Scale Logic:** Semantic (no numeric scale).
* **Why semantic?** Height constraints are highly context-dependent and relate to content hierarchy.

**Semantics:**
```css
--h-header: 64px;
--h-hero: 60vh;
--h-screen-dvh: 100dvh;
```

### 12. Z-Index (`--z-`) — The Layer Stack

**Physical Analogy:** Sheets of acetate stacked on an overhead projector. Each sheet is transparent but sits at a distinct height. When light shines through, you see all layers at once, with higher sheets obscuring what's beneath them.

**Category:** Vertical stacking order (z-axis positioning).
* Modal dialogs
* Dropdown menus
* Tooltips and popovers
* Sticky headers
* Overlays and backdrops
* Notification toasts

**Scale Logic (0–6):** Discrete stacking levels.
* **Why limited range?** More than 6-7 levels creates confusion about hierarchy.

**The Scale:**
* **`--z-0` (0):** Base layer. Normal page content.
* **`--z-1` (10):** Above base. Sticky elements.
* **`--z-2` (20):** Dropdowns, select menus.
* **`--z-3` (30):** Tooltips, popovers.
* **`--z-4` (40):** Sidebars, drawers.
* **`--z-5` (50):** Modal dialogs, notifications.
* **`--z-6` (60):** Critical system alerts.

**Primitives:**
```css
--z-0: 0;
--z-1: 10;
--z-5: 50;
```

**Semantics:**
```css
--z-dropdown: var(--z-2);
--z-modal: var(--z-5);
```

### 13. Padding (`--p-`) — Internal Spacing

**Physical Analogy:** The cushioning inside a product package. It's the protective space between the box walls and the contents. More padding means more comfort and breathing room; less padding means tighter, more compact packaging.

**Category:** Internal spacing within elements.
* Button padding
* Card content padding
* Input field padding
* Container internal spacing

**Scale Logic:** Aliases to Space scale (`--s-`).
* **Why alias?** `--p-card` is more meaningful than `--s-8` in component code.

**Primitives:**
```css
--s-3: 0.75rem;   /* 12px */
--s-4: 1rem;      /* 16px */
--s-8: 2rem;      /* 32px */
```

**Semantics:**
```css
--p-btn: var(--s-4);
--p-card: var(--s-8);
--p-input: var(--s-3);
```

### 14. Margin (`--m-`) — External Spacing

**Physical Analogy:** The empty space between buildings on a city block. Each building needs clearance from its neighbors. Too little margin and buildings feel cramped; too much and the block feels disconnected.

**Category:** External spacing between elements.
* Element separation
* Section spacing
* Stack spacing (vertical rhythm)
* Layout gutters

**Scale Logic:** Aliases to Space scale (`--s-`).
* **Why alias?** `--m-stack` communicates intent better than `--s-6`.

**Primitives:**
```css
--s-4: 1rem;      /* 16px */
--s-6: 1.5rem;    /* 24px */
```

**Semantics:**
```css
--m-stack: var(--s-6);
--m-gutter: var(--s-4);
```

### 15. Gap (`--g-`) — Grid Spacing

**Physical Analogy:** The space between tiles on a floor. The grout lines create consistent, rhythmic separation. Tight grout lines (small gaps) create density; wide grout lines (large gaps) create airiness.

**Category:** Grid and flexbox spacing.
* Flexbox gaps
* CSS Grid gaps
* Multi-column gaps
* Card grid spacing

**Scale Logic:** Aliases to Space scale (`--s-`).
* **Why alias?** `--g-standard` is more expressive than `--s-4` in layout code.

**Primitives:**
```css
--s-2: 0.5rem;    /* 8px */
--s-4: 1rem;      /* 16px */
```

**Semantics:**
```css
--g-tight: var(--s-2);
--g-standard: var(--s-4);
```

### 16. Opacity (`--o-`) — The Transparency Layer

**Physical Analogy:** Layers of tracing paper stacked over a drawing. Each sheet can be fully transparent (invisible), fully opaque (blocks everything beneath), or somewhere in between. The more transparent the layer, the more you see through to what's underneath.

**Category:** Element visibility and transparency.
* Disabled states
* Placeholder text
* Loading overlays
* Hover/focus transparency effects
* Backdrop filters
* Image opacity

**Scale Logic (0–9):** Decimal values representing transparency levels.
* **Why this range?** CSS opacity uses 0.0–1.0, but 1.0 (fully opaque) is the default, so we only need tokens for transparency (0.0–0.9).
* **Precision:** 0.1 increments cover most use cases (0.0, 0.1, 0.2, ..., 0.9).

**The Scale:**
* **`--o-0` (0.0):** Fully transparent. Invisible elements (hidden states, fade-out endpoints).
* **`--o-1` to `--o-2` (0.1–0.2):** Nearly transparent. Subtle overlays, barely-there tints.
* **`--o-3` to `--o-4` (0.3–0.4):** Translucent. Loading overlays, disabled backgrounds.
* **`--o-5` (0.5):** Half transparent. The visual midpoint. Hover states, moderate overlays.
* **`--o-6` to `--o-7` (0.6–0.7):** Mostly opaque. Hover darkening, focus states.
* **`--o-8` to `--o-9` (0.8–0.9):** Nearly opaque. Subtle fading effects, muted states.

**Note:** Fully opaque (1.0) is the browser default, so no token is needed—just omit the opacity property.

**Primitives:**
```css
--o-0:  0;
--o-5:  0.5;
--o-9:  0.9;
```

**Semantics:**
```css
--o-disabled: var(--o-5);
--o-placeholder: var(--o-5);
--o-overlay: var(--o-9);
--o-hover-darken: var(--o-1);
```

---

## 9. Three-Layer Architecture

### Layer Responsibilities

1. **Primitives (read-only)**: Raw values with numeric scales. Never modify these directly.
   * Examples: `--s-8`, `--c-slate-500`, `--r-2`

2. **Semantics (themeable)**: Intent-based tokens that reference primitives. Modify these for global theme changes.
   * Simple aliases: `--p-card: var(--s-8)`, `--r-btn: var(--r-3)`
   * Computed tokens: `light-dark()` functions, `oklch(from ...)` transformations

3. **Component properties (customizable)**: Component-specific overrides following `--[prefix]-[component]-[modifier]` naming.
   * Examples: `--p-bold-pricing`, `--bg-bold-pricing-card`

### Usage Guidelines

* **For global theming**: Modify semantic tokens in `:root`
* **For component customization**: Override component properties
* **Never modify**: Primitive tokens directly

---

## 10. Practical Usage

### Component Property Pattern

Components define customizable properties at the root level, following the prefix taxonomy:

```css live
.bold-pricing {
  /* Core customization points (8 properties) */
  --w-bold-pricing-max: 600px;
  --p-bold-pricing: var(--s-8);
  --g-bold-pricing: var(--g-standard);

  --bg-bold-pricing-card: var(--bg-surface);
  --p-bold-pricing-card: var(--p-card);
  --r-bold-pricing-card: var(--r-card);

  --p-bold-pricing-btn: var(--p-btn);
  --r-bold-pricing-btn: var(--r-btn);
}
```

**Design Philosophy**: Expose only **meaningful customization points** (layout constraints, card appearance, button styling). Typography, colors, and effects inherit from global semantic tokens. Users can override any aspect through:
1. **Component properties** for common customizations
2. **Direct CSS selectors** for specific overrides
3. **Global semantic tokens** for theme-wide changes

### Customization Examples

Override semantic tokens for global theming or component properties for specific customization:

```css live
@import './tokens.css';
@import '../use-cases/bold-pricing-manifesto/bold-pricing.css';

/* Global theme changes */
:root {
  --c-primary: oklch(0.6 0.2 280);
  --bg-surface: var(--bg-app);
}

/* Component-specific customization */
.bold-pricing {
  --w-bold-pricing-max: 800px;
  --bg-bold-pricing-card: var(--c-slate-200);
}

/* Direct selector overrides for edge cases */
.bold-pricing h2 {
  font-size: var(--fs-8);
}
```

```tsx live
import BoldPricing from '../use-cases/bold-pricing-manifesto/BoldPricing';

export default function BoldPricingDemo() {
  return (
    <div>
      <BoldPricing />
    </div>
  );
}
```

