# Reactive MD Guide

Reactive MD is an authoring system for **Literate UI/UX**. It treats a document as a cohesive project environment—unifying the narrative (the specification) and the implementation (the prototype) into a single, portable folder.

## The Conceptual Model

To use Reactive MD effectively, a document architect must distinguish between the two primary ways a document is viewed:

- **Markdown Preview**: It renders the initial HTML and CSS for reading and review only when the integrated VS Code markdown preview is opened. It **cannot execute code** because of the markdown extension's security model.
- **Interactive Preview**: Provides the **High-Fidelity Prototype**. It executes the full React 19 lifecycle, enabling stateful testing, animations, and responsive device emulation.

### Code Fence Modes
The system distinguishes between **interactive prototypes** and **static examples** based on the fence info string:
- **`jsx live` / `tsx live` / `css live`**: Code that is utilized to render a React component in both preview modes.
- **`jsx` / `tsx` / `css` / `json`**: Static syntax highlighting only. Use these for snippets that shouldn't be executed.

## The Literate Prototype

A great document is a **story**, not a code dump. Use Reactive MD to maintain "Conceptual Integrity" by following these principles:

### 1. Narrative over Syntax
Start with the *intent*, the *user journey*, or a problem statement. Code is the proof, not the lead. Use Markdown to explain *why* a specific UX decision was made, and use comments in code only for technical nuance.

### 2. Multi-Fence Narratives
Don't build one giant monolithic component. Break your story down into multiple fences to show the evolution of a design or different edge cases (loading, empty, success state).

### 3. Portability
A prototype should be self-contained and portable. Minimize deep external dependencies so another team member can open and view the document instantly without complex environment setup.

**Stay simple, then add complexity.**


## Authoring Rules

To ensure your prototypes render reliably in both previews, follow these rules for organizing your code.

### 1. The Project Folder
A "Reactive Document" is more than a single file; it is ideally a self-contained project folder. Move implementation details into sidecar files to keep your main narrative clean and portable.

```text
my-prototype/
├── spec.md             # The Literate Narrative (Main entry hub)
├── proto-kit.jsx       # Implementation details (Sidecar)
├── theme.css           # Custom styles (Sidecar)
└── data.json           # Sample data (Sidecar)
```

### 2. Markdown Code Fences
Each `jsx live` fence renders one component — the entry point.
- **One Entry per Fence**: A fence can define multiple functions, but exactly one is the entry point. Resolution order: the sole `export` if present, then the last top-level PascalCase function.
- **The 30-Line Rule**: If a `live` fence exceeds 30 lines of code, extract the implementation to a sidecar file and `import` it.

There are two styles for organizing fences with helpers. Use whichever feels natural:

#### Pattern A: Inner Functions
Helpers scoped inside the entry component. Great for rapid drafting — the entry point is self-evident.

```jsx live
function PricingStory() {
  // Helpers are scoped inside to keep the entry point clean
  function Badge({ children }) {
    return <span className="bg-blue-100 px-2 py-1 rounded">{children}</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3>Professional Plan <Badge>Recommended</Badge></h3>
      <p>The perfect choice for growing teams.</p>
    </div>
  );
}
```

#### Pattern B: Top-Level Helpers
Helpers defined at the top level, entry component marked with `export`. Reads more like production code.

```jsx live
function Badge({ children }) {
  return <span className="bg-blue-100 px-2 py-1 rounded">{children}</span>;
}

export function PricingStory() {
  return (
    <div className="flex flex-col gap-4">
      <h3>Professional Plan <Badge>Recommended</Badge></h3>
      <p>The perfect choice for growing teams.</p>
    </div>
  );
}
```

#### Example: The Ideal Fence (Reference)
Keep your narrative focused on the "Why." Move complex UI logic and large blocks of CSS/Tailwind into external files.

```jsx live
import { TicketList } from './lib/ui/TicketList.jsx';

// The fence just provides the context/usage
function Demo() {
  return (
    <div className="p-8 bg-slate-50">
      <TicketList limit={5} />
    </div>
  );
}
```

### 3. External Files (`.jsx` | `.tsx`)
External files are for shared libraries. They require explicit exports to work with the editor's "Preview" features.
- **Inline Exports**: Use `export function Component()`. This ensures the **▶ Preview** button appears exactly where you defined the code.
- **Avoid Tail-End Exports**: Do not place `export default` at the very bottom of a file. This separates the preview controls from the source code.
- **Helper Components**: When using `export default function`, non-exported helper components in the same file are fully supported — placement doesn't matter since JavaScript hoisting handles it.
- **Library Discipline**: Use named exports for utilities; reserve `export default` for your primary "App" component.

### 4. Component Resilience (Preview Safety)
When you open a sidecar file (`.jsx` or `.tsx`) directly in the **Interactive Preview**, the extension defaults to **Gallery Mode** to show all exported components at once. In this configuration, each component is rendered in isolation with an empty object as its props.

To prevent the **"Minified React error #130"** (attempting to render `undefined`), always provide default values for props that are used as components or iterated over.

**❌ Fragile Pattern**:
```jsx
export function FeatureIcon({ icon: Icon }) {
  return <Icon size={24} />; // Crashes if Icon is undefined
}
```

**✅ Resilient Pattern**:
```jsx
// Defaulting Icon to a null component ensures the preview remains stable
export function FeatureIcon({ icon: Icon = () => null }) {
  return <Icon size={24} />;
}
```

### 5. Local Imports
Organize data and logic into sidecar files.

| File Type | Purpose | Syntax |
| :--- | :--- | :--- |
| **`.json`** | Data stores. | `import data from './users.json'` |
| **`.jsx`**  | UI modules. | `import { Card } from './Card.jsx'` |
| **`.css`**  | Shared styles. | `import './theme.css'` (JSX) or `@import './theme.css'` (CSS) |
| **`.ts`**   | Type-safe logic. | `import { util } from './util.ts'` |

### 6. Recommended Template
Maintain conceptual integrity across your team by following a standard structure:

````markdown
# Feature Name

## The Problem
What user problem does this solve?

## Interactive Demo
```jsx live
import './theme.css';
import Component from './Component.jsx';

export function Demo() {
  return <Component />;
}
```

## Edge Cases
Showcase loading, empty, or error states in separate fences.
````


## Fence Specification Reference

### Key Modifiers
Use these modifiers in the opening fence header (e.g., ` ```jsx live device=mobile ... ``` `) to control identity and emulation.

| Key | Category | Description |
| :--- | :--- | :--- |
| **`id`** | Identity | A stable name (e.g., `id=login-form`) that prevents a **Component Refresh** when you edit the surrounding narrative. |
| **`mid`** | Device | Specific Model ID (e.g., `mid=iphone-15-pro`). Best for exact viewport and safe-area specs. |
| **`model`** | Device | Human-readable name (e.g., `model="iPhone 14"`). The system will search for the closest match. |
| **`device`** | Device | General category preset: `mobile`, `tablet`, `desktop`, or **`none`** (no emulation). |
| **`orientation`**| Viewport | Sets the initial rotation: `portrait` or `landscape`. |
| **`zoom`** | Viewport | Sets the zoom strategy: `fill`, `auto` (default/capped), or `none` (1:1). |
| **`lock-view`** | Flag | Hides emulation controls in Interactive Preview, strictly enforcing your header settings. |
| **`no-placeholder`** | Flag | Suppresses the guidance cards that normally explain why a component isn't rendering. |

> **Precedence**: For device emulation, keywords are resolved in this order: **`mid`** > **`model`** > **`device`**.

### No-Emulation Default
If no device modifiers are specified, the system defaults to **`device=none`** — no device emulation.
- **Physics**: The component behaves like a standard block element, expanding to fit its content height (`height: auto`).
- **Use Case**: Best for simple UI components, buttons, or snippets that don't require a full-screen emulated context.
- **Intent-Based Upgrading**: Interactive controls remain available. Providing a partial modifier like `orientation=landscape` or `zoom=fill` will automatically upgrade the fence to a mobile viewport to honor your request for specific emulation.

### Standard Device Viewports
Reactive MD uses these logical device dimensions (derived from physical hardware standards):
- **Mobile (`mobile`)**: 375 × 667 (iPhone SE)
- **Tablet (`tablet`)**: 768 × 1024 (iPad Classic)
- **Desktop (`desktop`)**: 1920 × 1080 (Desktop HD)


## Styling & Visual System

Reactive MD uses a modern, container-first styling system. This ensures that your interactive prototypes behave correctly regardless of the physical size of the VS Code editor window.

### The Glossary of Fidelity

To master Literate UI/UX, you must align with the system's core definitions of "Truth":

- **Logical Truth (Target Reality)**: The dimensions of the intended device (e.g., 375x667 for Mobile). This is the baseline for all layout calculations. Components "believe" they are on this device, triggering correct responsive logic even when squinting at a sidebar.
- **Literal Truth (Physical Reality)**: The actual pixels available in your VS Code window (e.g., a 400px wide side panel). This is irrelevant for layout but critical for visibility.
- **Visual Zoom (The Bridge)**: The technology that maps **Logical Truth** into the **Literal Truth** of your sidebar. It uses `transform: scale()` to shrink or grow the artifact to fit your screen without reflowing the layout.
- **The Sovereign Reset (Fidelity Pass)**: To ensure 1:1 parity with production browsers, the system automatically neutralizes VS Code's ambient markdown styles. It forces a clean slate (`line-height: normal`, `font-size: 16px`), ensuring your Tailwind utilities behave exactly as they would on a standalone website.

### Automatic Containment & Hardware Emulation
To ensure your UI responds to the **Logical Truth** of the emulated device size rather than the global VS Code window, the extension automatically wraps every component in a "Containment Context" (`container-type: size`).

- **No manual setup**: You do not need to add `@container` to your root element; the frame itself provides the context.
- **Hardware Fidelity**: When a specific device model is selected (e.g., `mid=iphone-15-pro`), the system emulates physical hardware features such as the **Dynamic Island**, notches, and safe-area insets.
- **Container Query Support**: Tailwind v4 container variants (e.g., `@md:p-8`) and native CSS `@container` rules automatically respond to the emulated device viewport. Orientation variants (`@landscape`, `@portrait`) target rotation changes.

### Technical Truth Scaling (Automated Zoom)
Components always render at 1:1 scale so `@container` queries calculate correctly against the emulated device dimensions. The entire artifact is then zoomed to fit your sidebar via CSS transforms:
- **Adaptive Zoom (`auto`)**: Default. Shrinks to fit the panel width, capped at 1.0× to preserve pixel-perfect sharpness.
- **Responsive Fill (`fill`)**: Stretches to the full panel width regardless of logical size.
- **1:1 (Zoom: None)**: Use the toggle in the header to verify exact pixel crispness. May cause horizontal scrolling.

### Zero-Clipping Physics
To prevent the common "right-edge clipping" issues found in standard markdown previews, Reactive MD injects a mandatory **2px "Environmental Air"** buffer around your prototypes. This ensures that focused borders, shadows, and sub-pixel details are never cut off by the container walls.

### Styling Strategy: Native CSS & Tailwind
Reactive MD is styling-neutral and **Container-First**. Components respond to the emulated device dimensions (Logical Truth), not the VS Code window. This means you must use **Container Queries** instead of standard media queries.

Standard media queries — and Tailwind's unprefixed responsive variants (`md:`, `lg:`, `sm:`) — target the global VS Code window and **will not respond** to device presets.

**Tailwind v4**: Use the `@` prefix for responsive container variants. These respond to the emulated device frame, not the window.
- `@md:grid-cols-2`, `@lg:p-8` (container-aware)
- `@landscape:flex-row`, `@portrait:flex-col` (orientation-aware)

**Native CSS**: Use `@container` rules and container units (`cqw`, `cqh`) instead of `@media` and viewport units (`vw`, `vh`).
- `@container (min-width: 768px) { ... }` (container-aware)
- `@container (orientation: landscape) { ... }` (orientation-aware)

### The CSS Context (`css live`)
Use `css live` fences to define document-specific styles, such as custom properties or unique brand tokens. These styles apply to every subsequent component in the document.

- **Theme-Aware Variables**: The system automatically injects CSS variables that adapt to the active VS Code theme. Use `--rmd-bg` and `--rmd-fg` to ensure your components remain readable in both light and dark modes.

```css live
:root {
  --document-accent: var(--rmd-fg);
}

.custom-card {
  border: 1px solid var(--document-accent);
}
```

### External Stylesheets
For larger design systems, move your CSS to external `.css` files. These can then be imported in either `jsx` or `css` live fences as below:
- **In JSX**: `import './theme.css';`
- **In CSS Fences**: `@import './theme.css';`

## The Library Ecosystem

Reactive MD is designed to work **100% offline**. To ensure high performance and zero configuration, a curated selection of the most popular libraries is pre-bundled directly into the extension.

### Pre-bundled Libraries (Available Offline)
The following libraries are available in both **Markdown Preview** and **Interactive Preview**. They are maintained at their latest stable versions for full compatibility:

- **Animation**: `motion/react` (Framer Motion).
- **Iconography**: `lucide-react`, `@heroicons/react`.
- **State & Logic**: `zustand`, `jotai`, `react-hook-form`, `uuid`.
- **Validation**: `zod`, `@hookform/resolvers/zod` (use `zodResolver` with `react-hook-form` for schema-driven forms).
- **Utilities**: `dayjs`, `es-toolkit`, `clsx`, `tailwind-merge`, `class-variance-authority` (cva).

### How to use
Simply use standard ESM import statements in your `jsx live` fences. You do not need to install these packages; they are provided by the environment:
```jsx
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { create } from 'zustand';
```


## Emulation & Synchronization

In **Interactive Preview**, you can control device emulation (phone, tablet, desktop) directly from the header of each rendered component.

- **Sync Mode (🔗)**: By default, components are synchronized. Changing the device on any synced component updates every other synced component in the document simultaneously.
- **Pin Mode (📌)**: Click the Pin icon to take a specific component out of sync. This lets you lock one component to "Mobile" while the rest of the document stays on "Desktop."

## Navigation & Focus

Reactive MD ensures you never lose context while navigating complex documents.

- **Cursor Sync & Spotlight**: The Interactive Preview automatically follows your cursor position in the Markdown file. As you scroll or type, the relevant component is spotlighted and brought into view.
- **Full Circle Navigation**: Clicking internal links within your prototype (e.g., a link to another section of the spec) will automatically scroll the VS Code editor to the corresponding line, keeping your prose and prototype in perfect alignment.
- **Session Persistence**: Your chosen zoom levels, device pins, and scroll positions are remembered even if you switch files or restart VS Code, ensuring a seamless workflow across sessions.

## The Lifecycle of a Prototype

Reactive MD keeps your prototypes alive even as you work on them, but it distinguishes between **minor tweaks** and **full refreshes** of the component lifecycle.

### 1. The Component Refresh
Whenever you change the **Source Code** or **CSS**, the component must be refreshed. This unmounts the current React instance and remounts a fresh one.

- **Prose Stability**: Edits to the narrative text *outside* of a code fence (fixing typos, adding paragraphs) do not trigger a refresh. The system uses an intelligent cache to ensure your prototype remains responsive while you refine the story.
- **What is lost**: Ephemeral React state (like `useState` values or form focus).
- **What is preserved**: Data saved to `localStorage` or `sessionStorage`. If your prototype requires persistent state across refreshes, use standard Web Storage APIs.
- **Maintenance**: You can manually wipe all document data using the **Clear Storage** (🗑️) button located in the Interactive Preview header.

### 2. The UI Tweak
Changing the viewport (rotating the device or switching between presets) is a **UI Tweak**. The component stays mounted, the instance is preserved, and your state is safe.

> **Persistence Tip**: Modifying the fence header in your Markdown file (e.g., changing `device=mobile`) is a source change that triggers a **Component Refresh**. To change the device without losing form data, use the emulation buttons in the component header instead.

### 3. Stable Identity (The `id` modifier)
If you want to edit your narrative text or move a fence to a different section without triggering a refresh, give it a stable `id`. This acts as an **Identity Anchor**:

````markdown
```jsx live id="signup-form"
// edits to the markdown text *outside* this fence won't refresh this component
```
````
Without an `id`, Reactive MD identifies components by their position or a hash of their content. Changing the text *above* a fence can sometimes change its internal index, causing a brief refresh as the system re-aligns its state. Explicit IDs eliminate this.

## Diagnostics & Safety

Reactive MD includes a robust diagnostic framework to help you debug prototypes without leaving the narrative.

- **High-Fidelity Error Cards**: If a component fails to render due to a library error or security restriction, instead of a blank screen, you'll see a branded diagnostic card providing clear instructions on how to fix it.
- **Blank Animation Detection**: If your component is blank because it's waiting for an animation that only triggers in Interactive Preview, the Markdown Preview will provide a helpful hint to switch views.
- **Safety Precedence**: Critical errors (like syntax mistakes) will always break through "hidden" states (like `no-placeholder`) to ensure you never lose visibility into the system's state.

## Deploying Your Prototype

Once your prototype is ready, deploy it to your own server with a single command.
See **[DEPLOY.md](./DEPLOY.md)** for the complete guide — server setup, SSH configuration,
project config, access control, and static site publishing.

---

## Troubleshooting

### The Quick Checklist
If a component fails to render, go through this checklist to help isolate the issue:
1. **File Extension**: Ensure you are using `.jsx` or `.tsx` (required for parser detection).
2. **React Imports**: You **must** still import any hooks you use (e.g., `import { useState } from 'react'`). You only skip the generic `import React from 'react'` for JSX usage, as the modern React runtime is handled automatically.
3. **The Import Pattern**: Always use ESM `import` statements (e.g., `import data from './data.json'`). Reactive MD handles the security handshake and URI translation for you. **Never use standard `fetch()` for local files.**
4. **Interactive vs Markdown**: If it works in the Interactive Preview but not in the static Markdown Preview, check if you are relying on `useEffect` or browser events that are not available during the static render.
5. **Output Log**: Check `View → Output → "Reactive MD"` for specific transformation or bundling errors.

### External APIs
You can fetch data from the public internet. Ensure these calls are wrapped in `useEffect` or a similar hook so they do not block the **Markdown Preview's** static render.
