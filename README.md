<!-- IMPORTANT: This file is the single source of truth for the README.
     The source-root README.md is a symlink pointing here.
     ALWAYS use absolute GitHub URLs in this file — relative links do
     NOT resolve on the VS Code Marketplace or in the packaged .vsix. 
-->
# Reactive MD

**Literate UI/UX for product teams.**

## The Idea

> *"Instead of imagining that our main task is to instruct a computer what to do, let us concentrate rather on explaining to human beings what we want a computer to do."*
> — Donald Knuth, *Literate Programming* (1984)

Knuth's insight was simple but radical: programs should be written for people first, machines second. This idea gave us Jupyter Notebooks for data science and Org mode for Emacs wizards.

**Reactive MD brings literate programming to UI/UX.**

Write product specs, wireframes, and user journeys with embedded, interactive React components. Unlike static mockups or separate prototyping tools, these documents let you **tell a story with working visuals** — prose and prototypes in one scrollable narrative.

<figure>
  <img src="https://github.com/million-views/reactive-md/blob/main/demo.gif?raw=true" alt="Reactive MD Demo" />
  <figcaption style="text-align: center"><b>Ideate, visualize, and collaborate all in one place</b></figcaption>
</figure>

## Quick Links

- 📦 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)
- 🐛 [Report Issues](https://github.com/million-views/reactive-md/issues)
- 📖 [User Guide](https://github.com/million-views/reactive-md/blob/main/GUIDE.md)
- 🚀 [Deploy Guide](https://github.com/million-views/reactive-md/blob/main/DEPLOY.md)
- 🔧 [Troubleshooting](https://github.com/million-views/reactive-md/blob/main/TROUBLESHOOTING.md)

## Installation

Requires **VS Code 1.106.0+**. No internet connection required (100% offline support).

1. Open VS Code
2. Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)
3. Search for "Reactive MD"
4. Click Install

Or install from the command line:
```bash
code --install-extension million-views.reactive-md
```

## 🚀 Quick Start

### Option 1: JSX/TSX Files
1. Open any `.jsx` or `.tsx` file
2. Press `Cmd+K P` (Mac) / `Ctrl+K P` (Windows/Linux)
3. Start coding — preview updates live!

### Option 2: Markdown Code Fences
~~~markdown
```jsx live
function Hello() {
  return <h1 className="text-2xl font-bold text-blue-600">Hello World!</h1>;
}
```
~~~

## 🎯 Two Preview Modes

| Mode | Keyboard | Best For |
|------|----------|----------|
| **Markdown Preview** | `Cmd+Shift+V` | Documentation, static examples, fast review |
| **Interactive Preview** | `Cmd+K P` | Hooks, state, animations, responsive testing |

**Markdown Preview** renders server-side HTML (hooks show initial state).
**Interactive Preview** runs full React runtime with live reload and pre-bundled libraries.

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| ⚡ **Live Reload** | See changes as you type — no manual refresh |
| 📝 **Markdown Fences** | `jsx live` renders inline in both previews |
| 📱 **Device Emulation** | Test responsive designs with a synchronized "Document Bus" |
| 🎨 **Tailwind v4** | Full utility support, zero config |
| 📦 **npm Packages** | Pre-bundled high-quality libraries (100% offline) |
| 🔍 **CodeLens** | Click "▶ Preview" above exported components |
| ⚛️ **React 19** | Modern runtime for high-fidelity interactive previews |
| 🎯 **TypeScript** | Full `.tsx` support with type stripping |

## 📦 Works With Your Favorite Libraries

```jsx live
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import dayjs from 'dayjs';

function Demo() {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2 p-4"
    >
      <Heart className="text-red-500" />
      <span>Built with love • {dayjs().format('MMMM D, YYYY')}</span>
    </motion.div>
  );
}
```

## 📦 Bundled Libraries

Reactive MD is designed to work **100% offline**. The following libraries are pre-bundled directly into the extension:

`lucide-react`, `motion/react`, `clsx`, `dayjs`, `uuid`, `es-toolkit`, `zustand`, `jotai`, `react-hook-form`, `zod`, `@hookform/resolvers/zod`, `@heroicons/react`, `tailwind-merge`, `class-variance-authority`.

## 🤖 Agent Skills

AI agents can work more effectively with Reactive MD using available skills:

- **reactive-md skill** — Specialized in creating functional markdown documents with embedded interactive React components for product specs, wireframes, and prototypes.
- **elementary skill** — Token-based design system expertise for themeable interfaces and design system compliance (includes Wireframe/Elementary themes and optional components).

Both skills are available at [github.com/million-views/skills](https://github.com/million-views/skills) and provide domain-specific patterns, examples, and guardrails for working with this tool.

## 💬 Starter Prompts

With the reactive-md skill loaded in your AI assistant, these prompts produce documents that replace meetings — not add to them.

> **Convention**: all reactive-md documents live under `product/` in the source root — avoiding collision with `specs/` (test suites), `docs/` (site tooling), and `design/` (design-system tooling). Two levels, no deeper: `product/<name>/spec.md` for a product or subsystem vision; `product/<name>/<feature>/spec.md` for a feature deep dive. The entry point is always `spec.md` — `find product/ -name "spec.md"` lists every document in the repo.

**Write a product spec with live demos**
> Replace the PRD → mockup → prototype handoff chain with one document.
```
Using the reactive-md skill, write a product spec for [your feature or idea].
Structure it as: WHO this is for → THE PROBLEM → WHY NOW → each screen as a
live demo → end-to-end integration. Add design decisions after every demo —
the choices that can't be seen in the UI. This document should make a kickoff
meeting unnecessary.
```

**Prototype a user flow**
> Wire up the full flow so reviewers can walk through it without a live demo call.
```
Using the reactive-md skill, prototype the [checkout / signup / onboarding / ...]
flow. Show each screen as a live component with navigation state. Wire the full
flow together at the end — first-time user and returning user scenarios.
```

**Propose an A/B test**
> A reviewer should be able to say yes or no without scheduling a follow-up.
```
Using the reactive-md skill, write an A/B test proposal for [CTA copy / pricing
layout / onboarding step / ...]. State the hypothesis, show both variants as live
components side by side, and define the success metric. No follow-up meeting
should be needed to reach a decision.
```

**Write a data story**
> Prose and charts in the same artifact — readable as an article, vivid as a dashboard.
```
Using the reactive-md skill, write a visual essay about [retention funnel /
MAU trends / cohort analysis / ...]. Weave the narrative as prose with embedded
SVG charts. The document should read like an article and argue a point, not just
display numbers.
```

**Audit responsive behavior**
> Verify that your components respond to the emulated device, not the VS Code window.
```
Using the reactive-md skill, audit the mobile and tablet layout of [component or
screen]. Use device emulation (iPhone portrait and tablet landscape) to verify
container query behavior. Document what breaks at each breakpoint and why.
```

**Document a design system with live examples**
> Replace frozen screenshots with components that actually run.
```
Using the reactive-md skill, document [component name / design token / pattern]
in our design system. Show every state as a live example — not a screenshot.
Include usage guidelines as prose alongside each demo.
```

## ⚙️ Configuration

- **`reactiveMd.debounceMs`** (default: 300ms): Controls live reload delay. Increase if updates feel too frequent.
- **`reactiveMd.showCodeLens`** (default: true): Shows "▶ Preview" buttons above exported components.
- **`reactiveMd.previewOverlay`** (default: "full"): Controls error card display ("full", "minimal", or "none").
- **`reactiveMd.updateMode`** (default: "live"): Choose "live" for real-time updates or "on-save" for updates only when files are saved.

Access settings via `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux) and search for "Reactive MD".

## 📋 Requirements

- VS Code 1.106.0+
- No internet connection required (100% offline support via pre-bundled library model)

## 📁 Recipes

Reactive MD documents require the extension to render — raw markdown with live fences is inert on GitHub. Pattern recipes (product specs, user flows, A/B tests, competitive analyses, and more) are available at [github.com/million-views/skills](https://github.com/million-views/skills/tree/main/reactive-md/references/recipes/). Load the `reactive-md` skill in your AI assistant and reference them by name.

## License

MIT © [Million Views](https://m5nv.com)

---
<p align="center">
  <strong>Built by <a href="https://m5nv.com">Million Views</a></strong><br>
  <sub>Literate UI/UX for product teams</sub>
</p>
