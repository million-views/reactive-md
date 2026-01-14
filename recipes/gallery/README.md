---
title: UI Patterns Gallery
author: million-views
status: implemented
date: 2026-01-13
instruction: "Reusable interaction and layout patterns for common UI challenges. Each pattern includes a live, interactive example you can customize, plus explanations of when and how to use it."
tags: ["gallery", "patterns", "components", "interactions"]
related-jtbd: "Design User Interfaces"
---

# UI Patterns Gallery

> Common patterns for layouts, interactions, and feedback states

## What Is This Gallery?

The gallery contains **reusable UI patterns** — common design challenges with working solutions. Unlike templates (which are starting points for full projects), patterns are **focused, copyable components** you can integrate into any project.

Each pattern includes:
- **Live, interactive demo** you can modify in place
- **Code examples** showing implementation
- **When to use it** and design considerations
- **Variations** and customization options

## Collection

### Layout Patterns

#### Cards and Lists
**File:** `cards-and-lists.md`

Fundamental patterns for displaying collections:
- Grid layouts with responsive columns
- List views with proper spacing and typography
- Card components with status indicators
- Hover states and interaction feedback

**When to use:** Portfolios, product grids, dashboard overviews, any collection display

---

#### Navigation Patterns
**File:** `navigation.md`

Wayfinding systems that help users understand where they are:
- Responsive navbars with desktop/mobile variants
- Collapsible sidebars and hamburger menus
- Breadcrumb trails for hierarchical navigation
- Active state indicators and visual feedback

**When to use:** Any application with multiple pages, nested hierarchy, mobile responsiveness needed

---

### Interaction Patterns

#### Drag and Drop
**File:** `drag-and-drop.md`

Reordering and kanban board interactions:
- Sortable lists with keyboard fallbacks
- Kanban board patterns with drop zones
- Visual feedback during drag operations
- Accessibility considerations for non-mouse users

**When to use:** Task management, reorderable lists, kanban boards, preference customization

---

#### Data Tables
**File:** `data-tables.md`

Interactive tables for structured information:
- Column sorting with visual indicators
- Filter inputs for data refinement
- Row selection and bulk actions
- Pagination controls and page size selector

**When to use:** Admin panels, analytics dashboards, data exploration, user management

---

#### Infinite Scroll
**File:** `infinite-scroll.md`

Loading patterns for continuous content:
- Intersection observers for auto-loading
- Loading states and spinners
- Error recovery and retry mechanisms
- Accessibility and performance considerations

**When to use:** Social feeds, search results, content discovery (evaluate alternatives first)

---

### Modal and Overlay Patterns

#### Modals and Dialogs
**File:** `modals-and-dialogs.md`

Capturing user attention and getting decisions:
- Confirmation dialogs for destructive actions
- Form modals for data entry
- Alert patterns for notifications
- Focus management and keyboard support

**When to use:** Critical actions, form submissions, confirmation, alerts (use sparingly)

---

### Feedback Patterns

#### Feedback States
**File:** `feedback-states.md`

Guiding users through uncertain moments:
- Loading states with skeleton screens
- Success confirmations with visual celebration
- Error messages with recovery suggestions
- Empty states with helpful guidance

**When to use:** Any async operation, data loading, error scenarios, initial empty state

---

### Real-Time Patterns

#### Real-Time Updates
**File:** `real-time-updates.md`

Building collaborative, live experiences:
- Activity feeds with live updates
- Presence indicators showing who's online
- Live notifications of team activity
- Conflict resolution and optimistic updates

**When to use:** Collaborative tools, team dashboards, live notifications, multiplayer experiences

---

### Feature Patterns (Pre-Built)

These folders contain complete, copy-ready implementations:

#### Dark Mode Toggle
**Folder:** `dark-mode-toggle/`

Theme switching system with localStorage persistence. See [spec.md](./dark-mode-toggle/spec.md)

---

#### Data Loading
**Folder:** `data-loading/`

Complete data fetching with loading states, error handling, and retry logic. See [README.md](./data-loading/README.md)

---

#### Notification System
**Folder:** `notification-system/`

Toast notification patterns for transient feedback. See [spec.md](./notification-system/spec.md)

---

## How to Use

1. **Find a pattern** - Browse this list and identify the interaction you need
2. **Read the guide** - Open the `.md` file to understand when and why to use it
3. **Preview the example** - Click "▶ Preview" to see the interactive demo
4. **Customize** - Modify colors, text, or logic right in the preview
5. **Copy the code** - Use the code examples to implement in your project

## Data Files (Supporting)

- `projects.json` - Sample project data used by CardGrid.jsx
- `tasks.json` - Sample task data used by ListView.jsx

These demonstrate how to import local JSON files instead of hardcoding data in components.

## Related Resources

- **Use Cases**: [../use-cases.md](../use-cases.md) for workflows that combine multiple patterns
- **Case Studies**: [../case-studies/](../case-studies/) for complete, real-world examples
- **Design Systems**: [../design-systems/README.md](../design-systems/README.md) for token and styling system
- **Templates**: [../prd-templates/](../prd-templates/) for starting points for PRDs and specs

---

*These patterns are part of Reactive MD — bringing literate programming to product design.*
