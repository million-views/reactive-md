# Design Systems for Reactive MD

**Match your styling approach to your design intent**

Reactive MD provides two styling approaches: **Elementary design system** (use tokens directly or with component library) or **Tailwind CSS** (utility classes). `Elementary` includes a `Wireframe` theme for low-fidelity work.

## Philosophy

Good prototypes communicate intent clearly. A wireframe that looks "unfinished" signals "this is the structure, not the final design." A polished mockup signals "this is what we're building."

**Elementary design system:**
- **Token contract** defined in [elementary/tokens.md](./elementary/tokens.md) (`--c-primary`, `--s-3`, `--r-btn`, etc.)
- **Two themes**: Elementary (polished) and Wireframe (low-fi) - same token names, different values
- **Optional component library** ([reactive-md.css](./reactive-md.css)) that uses these tokens

**Tailwind CSS:**
- Completely separate utility-first system
- Built into reactive-md (no imports needed)
- No shared tokens with Elementary

**Critical: NEVER mix Elementary tokens with Tailwind utilities.** Pick one system and commit to it.

## When to Use Each Approach

### Elementary Design System

Use Elementary tokens when you need themeable, reusable components. Choose a theme based on fidelity needs.

#### Elementary Theme (Default)

**Purpose:** Production-ready aesthetics with automatic light/dark mode.

**Use when:**
- Feature specs showing "this is what we're building"
- Design system documentation with working examples
- Polished prototypes for stakeholder demos
- Dark mode support required

**Implementation:**
```css live
@import '../design-systems/elementary/tokens.css';
@import '../design-systems/reactive-md.css';  /* optional */
```

**Characteristics:**
- Semantic color tokens that adapt to light/dark mode
- Professional typography and spacing
- Light/dark via `light-dark()` CSS function

**See:** [elementary/tokens.md](./elementary/tokens.md)

#### Wireframe Theme

**Purpose:** Low-fidelity structural communication without implying visual design.

**Use when:**
- Exploring layout options quickly
- Reviewing structure before committing to aesthetics
- Creating mockups for user testing
- Documenting "how it works" not "how it looks"

**Implementation:**
```css live
@import '../design-systems/wireframe/tokens.css';
@import '../design-systems/reactive-md.css';  /* optional */
```

**Characteristics:**
- Monospace typography ("sketch aesthetic")
- Grayscale palette
- No unnecessary shadows or polish

**See:** [wireframe/tokens.md](./wireframe/tokens.md)

**Both themes use the same token names.** Swap the import to change fidelity.

### Tailwind v4

**Purpose:** Move fast without Elementary's token contract.

**Use when:**
- Creating PRD templates or documentation
- Building one-off examples
- Speed matters more than reusability

**Implementation:**
```jsx live
function TailwindExample() {
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

**Tailwind v4 is built into reactive-md.** No imports needed—just use utility classes.

**NEVER mix with Elementary.** Pick Elementary OR Tailwind.

## Using Elementary Tokens

### With Component Library

Import tokens + components, use the pre-built component classes:

```css live
@import '../design-systems/elementary/tokens.css';  /* or wireframe */
@import '../design-systems/reactive-md.css';
```

```jsx live
<section className="wf-card">
  <span className="badge">New Feature</span>
  <h2 className="title">Dashboard Analytics</h2>
  <p className="description">
    Real-time metrics tracking user engagement and conversion rates.
  </p>
  <div className="actions">
    <button className="wf-btn action">Enable</button>
    <button className="wf-btn secondary">Learn More</button>
  </div>
</section>
```

**Key components:** `.wf-hero`, `.wf-btn`, `.wf-card`, `.wf-features`, `.wf-grid`, and more
**Common modifiers:** `.primary`, `.secondary`, `.action`, `.full`, and more

**See [reactive-md.css](./reactive-md.css) for complete component catalog.**

### Without Component Library (Recommended Pattern)

Import tokens, define custom CSS classes using the token contract:

```css live
@import '../design-systems/elementary/tokens.css';  /* or wireframe */
.notifications {
  display: flex;
  flex-direction: column;
  gap: var(--g-standard);
}
.card {
  background-color: var(--bg-surface);
  border: var(--b-standard);
  border-radius: var(--r-card);
  padding: var(--p-card);
  box-shadow: var(--x-card-shadow);

  &.error {
    background-color: var(--bg-error);
    border-color: var(--c-error);

    .title {
      color: var(--c-text);
    }
  }

  .title {
    color: var(--c-text-secondary);
    font: var(--t-heading);
    margin-bottom: var(--m-stack);
  }

  .message {
    color: var(--c-text-secondary);
    font: var(--t-body);
  }
}
```

```jsx live
function StatusNotification({ type, title, message }) {
  return (
    <article className={`card ${type}`}>
      <h3 className="title">{title}</h3>
      <p className="message">{message}</p>
    </article>
  );
}

export default function NotificationDemo() {
  return (
    <div className="notifications">
      <StatusNotification
        type="error"
        title="Build Failed"
        message="TypeScript compilation error in src/components/Button.tsx"
      />
      <StatusNotification
        title="Deployment Successful"
        message="Your changes are now live in production"
      />
    </div>
  );
}
```

**This pattern demonstrates:**
- Modern CSS nesting (no preprocessor required)
- Contextual modifiers (`.error` state changes child `.title` color)
- Semantic tokens (`--c-text`, `--bg-error`) that convey meaning
- Spacing scale (`--p-card`, `--m-stack`, `--g-standard`) for consistent rhythm
- Typography tokens (`--t-heading`, `--t-body`) for hierarchy
- Theme-aware colors that automatically adapt to light/dark mode
- Same token names work with wireframe or elementary themes

**Inline styles (escape hatch only):**

Use for one-off customizations that don't warrant a CSS class:

```jsx live
<div style={{
  padding: 'var(--s-4)',
  backgroundColor: 'var(--bg-surface)',
  borderRadius: 'var(--r-card)'
}}>
  Quick override
</div>
```

**Prefer custom CSS classes.** Use inline styles sparingly.

**Token reference:** [elementary/tokens.md](./elementary/tokens.md)

## Common Mistakes

**Mixing Elementary with Tailwind:**
```jsx
/* ❌ DON'T: Tailwind utilities + Elementary tokens */
<button className="px-4 bg-[var(--c-primary)]">Bad</button>

/* ✅ DO: Pick one system */
<button className="wf-btn primary">Good (Elementary + components)</button>
<button style={{ padding: 'var(--s-3)' }}>Good (Elementary tokens only)</button>
<button className="px-4 bg-blue-600">Good (Tailwind)</button>
```

**Using tokens in Tailwind arbitrary values:**
```jsx
/* ❌ DON'T */
<div className="p-[var(--s-4)]">Bad</div>

/* ✅ DO: Use inline styles for Elementary tokens */
<div style={{ padding: 'var(--s-4)' }}>Good</div>
```

## Reference Documentation

- **[elementary/tokens.md](./elementary/tokens.md)** - Token contract (master reference)
- **[elementary/tokens.css](./elementary/tokens.css)** - Token implementation (source)
- **[wireframe/tokens.md](./wireframe/tokens.md)** - Wireframe theme documentation
- **[wireframe/tokens.css](./wireframe/tokens.css)** - Wireframe theme implementation
- **[reactive-md.css](./reactive-md.css)** - Component library source
- **[use-cases/](./use-cases/)** - Complete examples

---

**Goal:** Use Elementary for reusable, themeable components. Use Tailwind for quick one-offs. Never mix them.
