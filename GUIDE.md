# Reactive MD Guide

Reactive MD is an authoring system for **Literate UI/UX**. It treats a document as a cohesive project environment—unifying the narrative (the specification) and the implementation (the prototype) into a single, portable folder.

## The Conceptual Model

To use Reactive MD effectively, a document architect must distinguish between the two primary ways a document is viewed:

- **Markdown Preview**: Provides the **Static Preview**. It renders the initial HTML and CSS for reading and review only when the integrated VS Code markdown preview is opened. It **cannot execute code** because of the markdown extension's security model.
- **Interactive Preview**: Provides the **High-Fidelity Prototype**. It executes the full React 19 lifecycle, enabling stateful testing, animations, and responsive device emulation.

### Code Block Modes
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
├── README.md           # Overview and problem statement
├── spec.md             # The Literate Narrative (Main entry)
├── Component.jsx       # Implementation details (Sidecar)
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
- **Library Discipline**: Use named exports for utilities; reserve `export default` for your primary "App" component.

### 4. Local Imports
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
Use these modifiers in the opening fence header (e.g., ` ```jsx live device="mobile" ... ``` `) to control identity and emulation.

| Key | Category | Description |
| :--- | :--- | :--- |
| **`id`** | Identity | A stable name (e.g., `id="login-form"`) that prevents a **Component Refresh** when you edit the surrounding narrative. |
| **`mid`** | Device | Specific Model ID (e.g., `mid="iphone-15-pro"`). Best for exact viewport and safe-area specs. |
| **`model`** | Device | Human-readable name (e.g., `model="iPhone 14"`). The system will search for the closest match. |
| **`device`** | Device | General category preset: `mobile`, `tablet`, or `desktop`. |
| **`orientation`**| Viewport | Sets the initial rotation: `portrait` or `landscape`. |

> **Precedence**: For device emulation, keywords are resolved in this order: **`mid`** > **`model`** > **`device`**.

### Standard Device Viewports
Reactive MD uses these logical device dimensions:
- **Mobile (`mobile`)**: 375 × 667 (Logical SE)
- **Tablet (`tablet`)**: 768 × 1024 (Logical iPad)
- **Desktop (`desktop`)**: 1440 × 900 (Logical Notebook)

### Specification Flags
Flags are standalone keywords added to the fence header (no `=` required).

- **`lock-view`**: Hides emulation controls in Interactive Preview, strictly enforcing your DSL settings.
- **`no-placeholder`**: Suppresses the helpful guidance cards that normally explain why a component isn't rendering (such as missing libraries or security restrictions).
- **`debug`**: Enables additional runtime logging in the console.


## Styling & Visual System

Reactive MD uses a modern, container-first styling system that ensures your prototypes look and behave correctly across all devices.

### 1. Tailwind CSS (v4)
Tailwind is the primary styling engine. It is available in both **Markdown** and **Interactive** previews.
- **Usage**: Use standard utility classes (e.g., `className="p-8 bg-slate-50"`) directly in your JSX.
- **Container Queries (Recommended)**: Use `@container` on your root element. This allows your UI to respond to the *emulated device* dimensions (using `@md:`, `@lg:`, etc.) rather than the global VS Code window size.
- **Media Queries (Avoid)**: Standard CSS media queries target the entire VS Code editor window, which can cause layout issues during emulation.

### 2. The CSS Context (`css live`)
Use `css live` fences to define document-specific styles, such as custom properties or unique brand tokens. These styles apply to every subsequent component in the document.

```css live
:root {
  --document-accent: #ff3366;
}

.custom-card {
  border: 1px solid var(--document-accent);
}
```

### 3. External Stylesheets
For larger design systems, move your CSS to external `.css` files. These can then be imported in either `jsx` or `css` live fences as below:
- **In JSX**: `import './theme.css';`
- **In CSS Fences**: `@import './theme.css';`

## The Package Ecosystem

To ensure performance and reliability, Reactive MD categorizes packages into two tiers:

### 1. Built-in (Available Everywhere)
These packages are bundled with the extension and work in both **Markdown** and **Interactive** previews.
- **Foundational**: `lucide-react`, `motion/react`, `clsx`, `uuid`.
- **Utilities**: `dayjs`, `es-toolkit`.

### 2. External (Interactive Only)
Any ESM-compatible package on NPM can be used in **Interactive Preview** (`Cmd+K P`). These are resolved via the `esm.sh` CDN.
- **Known to work**: `@heroicons/react`, `zustand`, `jotai`, `react-hook-form`, `tailwind-merge`.
- **Known Limitations**: The following packages are currently unsupported due to environment constraints:
    - `recharts` (transitive dependency resolution issues)
    - `swr` (missing React context shim)
    - `@tanstack/react-query` (multiple React instance conflicts)


## Emulation & Synchronization

In **Interactive Preview**, you can control device emulation (phone, tablet, desktop) directly from the header of each rendered component.

- **Sync Mode (🔗)**: By default, components are synchronized. Changing the device on any synced component updates every other synced component in the document simultaneously.
- **Pin Mode (📌)**: Click the Pin icon to take a specific component out of sync. This lets you lock one component to "Mobile" while the rest of the document stays on "Desktop."


## The Lifecycle of a Prototype

Reactive MD keeps your prototypes alive even as you work on them, but it distinguishes between **minor tweaks** and **full refreshes** of the component lifecycle.

### 1. The Component Refresh
Whenever you change the **Source Code** or **CSS**, the component must be refreshed. This unmounts the current React instance and remounts a fresh one.

- **What is lost**: Ephemeral React state (like `useState` values or form focus).
- **What is preserved**: Data saved to `localStorage` or `sessionStorage`. If your prototype requires persistent state across refreshes, use standard Web Storage APIs.
- **Maintenance**: You can manually wipe all document data using the **Clear Storage** (🗑️) button located in the Interactive Preview header.

### 2. The UI Tweak
Changing the viewport (rotating the device or switching between presets) is a **UI Tweak**. The component stays mounted, the instance is preserved, and your state is safe.

> **Persistence Tip**: Modifying the fence header in your Markdown file (e.g., changing `device="mobile"`) is a source change that triggers a **Component Refresh**. To change the device without losing form data, use the emulation buttons in the component header instead.

### 3. Stable Identity (The `id` modifier)
If you want to edit your narrative text or move a fence to a different section without triggering a refresh, give it a stable `id`. This acts as an **Identity Anchor**:

````markdown
```jsx live id="signup-form"
// edits to the markdown text *outside* this fence won't refresh this component
```
````
Without an `id`, Reactive MD identifies components by their position or a hash of their content. Changing the text *above* a fence can sometimes change its internal index, causing a brief refresh as the system re-aligns its state. Explicit IDs eliminate this.

## Troubleshooting

### The Quick Checklist
If a component fails to render, go through this checklist to help isolate the issue:
1. **File Extension**: Ensure you are using `.jsx` or `.tsx` (required for parser detection).
2. **React Imports**: You **must** still import any hooks you use (e.g., `import { useState } from 'react'`). You only skip the generic `import React from 'react'` for JSX usage, as the modern React 19 runtime is handled automatically.
3. **The Import Pattern**: Always use ESM `import` statements (e.g., `import data from './data.json'`). Reactive MD handles the security handshake and URI translation for you. **Never use standard `fetch()` for local files.**
4. **Interactive vs Markdown**: If it works in the Interactive Preview but not in the static Markdown Preview, check if you are relying on `useEffect` or browser events that are not available during the static render.
5. **Output Log**: Check `View → Output → "Reactive MD"` for specific transformation or bundling errors.

### External APIs
You can fetch data from the public internet. Ensure these calls are wrapped in `useEffect` or a similar hook so they do not block the **Markdown Preview's** static render.
