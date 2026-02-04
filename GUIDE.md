# Reactive MD Guide

Reactive MD is an authoring system for **Literate UI/UX**. It treats a document as a cohesive project environment—unifying the narrative (the specification) and the implementation (the prototype) into a single, portable folder.

## The Conceptual Model

To use Reactive MD effectively, a document architect must distinguish between the two primary ways a document is viewed:

- **Markdown Preview**: It renders the initial HTML and CSS for reading and review only when the integrated VS Code markdown preview is opened. It **cannot execute code** because of the markdown extension's security model.
- **Interactive Preview**: Provides the **High-Fidelity Prototype**. It executes the full React 19 lifecycle, enabling stateful testing, animations, and responsive device emulation.

### Code Fence Modes
The system distinguishes between **interactive prototypes** and **static examples** based on the fence info string:
- **`jsx live` / `css live`**: Code that is utilized to render a React component in both preview modes.
- **`jsx` / `css` / `json`**: Static syntax highlighting only. Use these for snippets that shouldn't be executed.

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
Each `jsx live` fence is treated as a standalone component.
- **One Component per Fence**: Define exactly one primary component to be the entry point for the fence.
- **Scope Helpers**: If you need small helper components, define them **inside** your main component function to keep your fence focused on a single, clear entry point.
- **The 30-Line Rule**: If a `live` fence exceeds 30 lines of code, extract the implementation to a sidecar file and `import` it.

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

#### Example: The Iterative Fence (Drafting)
When rapidly prototyping a concept *within* the document, keep helpers scoped inside your main entry point. Once the design stabilizes, move them to a sidecar file.

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

### 3. External Files (`.jsx` | `.tsx`)
External files are for shared libraries. They require explicit exports to work with the editor's "Preview" features.
- **Inline Exports**: Use `export function Component()`. This ensures the **▶ Preview** button appears exactly where you defined the code.
- **Avoid Tail-End Exports**: Do not place `export default` at the very bottom of a file. This separates the preview controls from the source code.
- **Helper Components**: When using `export default function`, you can utilize helper components (non-exported functions) defined in the same file. To ensure they are correctly included in the preview, always define these helpers **before** the main `export default` function.
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

### 5. Recommended Template
Maintain conceptual integrity across your team by following a standard structure:

````markdown
# Feature Name

## The Problem
What user problem does this solve?

## Interactive Demo
```jsx live
import './theme.css';
import Component from './Component.jsx';

export default function Demo() {
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
| **`device`** | Device | General category preset: `mobile`, `tablet`, `desktop`, or **`none`** (Natural Liquid). |
| **`orientation`**| Viewport | Sets the initial rotation: `portrait` or `landscape`. |
| **`zoom`** | Viewport | Sets the zoom strategy: `fill`, `auto` (default/capped), or `none` (1:1). |

> **Precedence**: For device emulation, keywords are resolved in this order: **`mid`** > **`model`** > **`device`**.

### Liquid-First Architecture (The Default)
If no device modifiers are specified, the system defaults to **`device=none`** (Natural Liquid).
- **Physics**: The component behaves like a standard block element, expanding to fit its content height (`height: auto`).
- **Use Case**: Best for simple UI components, buttons, or snippets that don't require full-screen emulated context.
- **Intent-Based Upgrading**: Interactive controls remain available in Liquid mode. Furthermore, providing a partial modifier like `orientation=landscape` or `zoom=fill` will automatically "upgrade" the fence to a mobile viewport to honor your request for specific emulation.

### Standard Device Viewports
Reactive MD uses these logical device dimensions (derived from physical hardware standards):
- **Mobile (`mobile`)**: 375 × 667 (iPhone SE / Logical Truth)
- **Tablet (`tablet`)**: 768 × 1024 (iPad Classic / Logical Truth)
- **Desktop (`desktop`)**: 1920 × 1080 (Desktop HD / Logical Truth)

### Specification Flags
Flags are standalone keywords added to the fence header (no `=` required).

- **`lock-view`**: Hides emulation controls in Interactive Preview, strictly enforcing your header settings.
- **`no-placeholder`**: Suppresses the helpful guidance cards that normally explain why a component isn't rendering (such as missing libraries or security restrictions).


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
- **Support for @ Variants**: Tailwind v4 utilities using the `@` prefix (e.g., `@md:p-8`) will automatically respond to the emulated device viewport. You can even use `@landscape` and `@portrait` variants to target orientation changes.

### Technical Truth Scaling (Automated Zoom)
The system uses a "Zoom, Not Scale" model to ensure both pixel accuracy and ergonomic design:
- **Logical Truth**: Elements are always rendered at 1:1 scale (1 logical pixel = 1 CSS pixel). This ensures that `@container` queries and media queries calculate correctly.
- **Visual Zoom**: By default, the entire artifact is "zoomed" visually to fit your sidebar using CSS transforms.
- **Adaptive Zoom (`auto`)**: This is the default. It automatically shrinks content to fit the available panel width without reflowing, **capping at 1.0x** to preserve pixel-perfect sharpness.
- **Responsive Fill (`fill`)**: Forces the artifact to stretch to the full width of the panel, regardless of its logical size.
- **Verification**: If you need to verify exact pixel crispness or typography at native size, use the **1:1** toggle (Zoom: None) in the header. This may result in horizontal scrolling but preserves literal fidelity.

### Zero-Clipping Physics
To prevent the common "right-edge clipping" issues found in standard markdown previews, Reactive MD injects a mandatory **2px "Environmental Air"** buffer around your prototypes. This ensures that focused borders, shadows, and sub-pixel details are never cut off by the container walls.

### 1. Styling Strategy: Native CSS & Tailwind
Reactive MD is styling-neutral. Whether you are a master of design system precision (Pure CSS) or a master of utility speed (Tailwind), the system ensures your prototypes remain high-fidelity in both **Markdown** and **Interactive** previews.

#### The Concept: Logical vs. Literal Truth
High-fidelity prototyping in a side-panel environment like VS Code requires a choice between two "Truths":

- **Literal Truth (Standard Media Queries)**: These queries respond to the standard browser window. In Reactive MD, this means they respond to the entire VS Code application window. This is "Literally" true to the browser, but it's useless for testing how a component behaves inside a specific mobile device.
- **Logical Truth (Container Queries)**: These queries respond to the *immediate container* of the component (the emulated device). This ensures that a component set to "Mobile" always triggers the correct mobile styles, even if your VS Code window is 4000 pixels wide.

**Reactive MD is designed for Logical Truth.**

- **Native CSS (The Design System Way)**: For architects building custom design systems, Native CSS is a first-class citizen. Use `css live` fences or imported `.css` files to refine the "UI Grind" with precise control. All Reactive MD emulation features (safe areas, device presets) are available via standard CSS properties and Container Queries.
- **Tailwind v4 (The Utility Way)**: For rapid iteration, Tailwind v4 is available out-of-the-box. Use standard utility classes directly in your JSX.
- **Container Queries (The Golden Standard)**: Regardless of your chosen engine, Reactive MD is a **Container-First** environment.
  - In **CSS**: Use `@container (min-width: ...)` to respond to the emulated frame.
  - In **Tailwind**: Use the `@` prefix for responsive variants (e.g., `@md:p-8`, `@lg:grid-cols-2`).
- **Orientation Variants**: The system provides custom hooks for orientation change. For Tailwind, use `@landscape:flex-row`. For CSS, the `physical-viewport` element is attribute-tagged for orientation-specific styling.
- **Avoid standard Media Queries**: Media queries (and Tailwind's `md:`, `lg:` variants) target the global VS Code window and will not respond to emulated device presets.

### 2. The CSS Context (`css live`)
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

### 3. External Stylesheets
For larger design systems, move your CSS to external `.css` files. These can then be imported in either `jsx` or `css` live fences as below:
- **In JSX**: `import './theme.css';`
- **In CSS Fences**: `@import './theme.css';`

## The Library Ecosystem

Reactive MD is designed to work **100% offline**. To ensure high performance and zero configuration, a curated selection of the most popular libraries is pre-bundled directly into the extension's Tier 2 registry.

### Pre-bundled Libraries (Available Offline)
The following libraries are available in both **Markdown Preview** and **Interactive Preview**. They are maintained at their latest stable versions for full compatibility:

- **Animation**: `motion/react` (Framer Motion).
- **Iconography**: `lucide-react`, `@heroicons/react`.
- **State & Logic**: `zustand`, `jotai`, `react-hook-form`, `uuid`.
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
