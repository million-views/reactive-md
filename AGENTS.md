# Working on Reactive MD Public Documentation (Agent Guide)

**CRITICAL**: This AGENTS.md file lives at the **root of the repository**. All git operations must be performed from this directory (where this AGENTS.md is located).

---

## What is This Project?

**Reactive MD** is a VS Code extension that brings instant preview of React components to markdown files. Think Jupyter Notebooks for UI/UX work.

**This Repository** (github.com/million-views/reactive-md) contains:
- Public documentation for end users
- Example recipes demonstrating what's possible
- Reusable design systems for styling recipes
- Templates for common product work (PRDs, wireframes, user journeys)

**Key Insight**: Recipes aren't just demos - they're real tools for product teams to communicate ideas with live, interactive prototypes embedded in markdown.

---

## Repository Organization

**User-Facing Documentation** (top-level):
- **README.md** - "What is Reactive MD?" overview
- **GUIDE.md** - How-to guide for common workflows
- **TROUBLESHOOTING.md** - Solutions to user-reported issues
- **CHANGELOG.md** - Version history with user-facing changes

**Recipes** (`./recipes/`) - Templates organized by job-to-be-done:
- **use-cases.md** - Complete cross-category index (start here to find recipes)
- **README.md** - Recipe philosophy and what makes a good recipe
- Each category folder has its own README explaining the use case
- Categories: prd-templates, user-journeys, feature-concepts, ui-catalog, case-studies

**Design Systems** (`./recipes/design-systems/`) - Styling infrastructure:
- **README.md** - Master reference for styling decisions (frozen, authoritative)
- **elementary/** - Token contract definition (master)
  - `tokens.md` - Complete token taxonomy and philosophy
  - `tokens.css` - Elementary theme implementation (polished, light/dark)
- **wireframe/** - Wireframe theme (same token names, different values)
  - `tokens.md` - Documents differences from Elementary theme
  - `tokens.css` - Wireframe theme implementation (monospace, grayscale)
- **reactive-md.css** - Optional component library (works with both themes)

**Critical Architecture**:
- Elementary = token contract (master reference)
- Wireframe & Elementary = themes (same token names, different values)
- Token parity MUST be maintained across themes
- Tailwind = separate system (built into reactive-md, no imports needed)

---

## Core Workflows

### Making Changes

**Rule**: Always work from the repository root (the directory containing this AGENTS.md file).

```bash
# Ensure you're in the repository root
# (same directory as AGENTS.md)
pwd  # Should show path ending in 'reactive-md' or similar

# Make your changes to files...

# Stage and commit (from repository root)
git add -A
git commit -m "feat(category): description

Detailed explanation of changes..."

# Push changes
git push
```

### Adding a New Recipe
1. **Determine category**: Use `./use-cases.md` to find appropriate folder
2. **Choose styling approach**: Consult `./recipes/design-systems/README.md` decision framework
3. **Follow recipe patterns**: Reference similar recipes in the same category
4. **Update use-cases.md**: Add your recipe to the index
5. **Test with Reactive MD**: Open in VS Code and use `Cmd+K P` to preview

### Updating Documentation (./README.md, ./GUIDE.md, ./TROUBLESHOOTING.md):
- Focus on user problems and solutions
- Include working examples
- Keep language approachable

**Recipe docs** (README files in ./recipes/ subdirectories):
- Explain the job-to-be-done
- Show how recipes solve real problems
- Reference the philosophy in `./recipes/README.md`

**Design system docs** (tokens.md files in ./recipes/design-systems/):
- Document token naming conventions
- Explain semantic vs primitive tokens
- Maintain token parity documentation between systems

### Maintaining Design Systems

**Critical Rule**: Elementary and Wireframe design systems MUST have **identical token names**. Only values differ.

**Where details live**:
- Complete taxonomy: `./recipes/design-systems/elementary/tokens.md`
- Wireframe differences: `./recipes/design-systems/wireframe/tokens.md`
- Decision framework: `./recipes/design-systems/README.md`

**When adding/changing tokens**:
1. Update token in BOTH `./recipes/design-systems/elementary/tokens.css` AND `./recipes/design-systems/wireframe/tokens.css`
2. Use different values, same names
3. Document any new tokens in `./recipes/design-systems/elementary/tokens.md`
4. Document wireframe differences in `./recipes/design-systems/wireframe/tokens.md` if applicable

---

## Documentation Maintenance Tasks

### 1. Recipe Index (use-cases.md)
- Keep organized by job-to-be-done categories
- Add new recipes when created
- Update descriptions if recipe scope changes
- Link to actual recipe files

### 2. Design System Documentation
- **./recipes/design-systems/elementary/tokens.md**: Complete reference for all tokens
- **./recipes/design-systems/wireframe/tokens.md**: Document differences, not repetition
- **./recipes/design-systems/README.md**: Decision framework and comparisons
- **Component documentation**: Document new components in recipe files where they're introduced

### 3. User Guides
- **./README.md**: Keep concise, focus on "what is this?"
- **./GUIDE.md**: How-to guides for common workflows
- **./TROUBLESHOOTING.md**: Solutions to user-reported issues

### 4. Recipe Documentation
- Each recipe category has a README explaining the use case
- Individual recipe files should be self-documenting with clear explanations
- **./recipes/README.md** explains the overall philosophy

### 5. Changelog
- **./CHANGELOG.md**: Document user-facing changes
- Group by category (Added, Changed, Fixed, Removed)
- Link to relevant documentation

---

## Critical Knowledge for All Work

### Design System Token Parity

Both Elementary and Wireframe MUST have identical token **names**. See `design-systems/elementary/tokens.md` for complete list.

Example - same name, different values:
```css
/* Elementary: system fonts, shadows, dark mode */
--t-body: var(--fw-400) var(--fs-3) var(--ff-sans);

/* Wireframe: monospace, flat, low-fidelity */
--t-body: var(--fw-400) var(--fs-3) var(--ff-sans);
```

Why: Allows recipes to switch design systems by changing one import line.

### Styling Decision Framework

**Choose ONE system per recipe**:

- **Elementary design system** - Token-based with two themes (Wireframe low-fi / Elementary high-fi)
- **Tailwind CSS** - Utility-first, built into reactive-md

**CRITICAL: NEVER mix Elementary tokens with Tailwind utilities.**

```
What are you building?

├─ Low-fidelity wireframe/mockup?  → Elementary (Wireframe theme)
├─ Needs theming/dark mode?        → Elementary (Elementary theme)
├─ Polished stakeholder demo?      → Elementary (Elementary theme)
├─ One-off quick example?          → Tailwind CSS
└─ Default                         → Elementary (Elementary theme)
```

**See**: [recipes/design-systems/README.md](./recipes/design-systems/README.md) for complete guide.

### Component Architecture Principles

1. **Semantic HTML**: Use `<article>`, `<section>`, `<header>`, proper heading levels
2. **Custom properties for config**: `--card-text-align`, `--m-title`, etc.
3. **No inline styles** (except for setting custom properties)
4. **Small presentational components**: Decompose, don't conditionalize
5. **Typography uses `font:` shorthand**: Not separate font-size/weight/family

**Detailed patterns**: See individual design system documentation and existing recipes.

---

## Testing & Validation Checklist

Before committing:

- [ ] **Visual test**: Preview all changed `.md` files with `Cmd+K P` in VS Code
- [ ] **Token parity**: If tokens changed, verify both systems have matching names
- [ ] **Semantic HTML**: No unnecessary `<div>` wrappers
- [ ] **No hardcoded values**: Use tokens for spacing, colors, animations
- [ ] **Documentation updated**: README, use-cases, or relevant docs reflect changes
- [ ] **Category consistency**: Styling approach matches recipe location
- [ ] **Git workflow**: Commit from repository root (where this AGENTS.md lives) with descriptive message

---

## Common Pitfalls

1. **Wrong directory**: Running git and other commands from outside of repository root (where this AGENTS.md lives)
2. **Repeating documentation**: Writing information that exists elsewhere
3. **Breaking token parity**: Changing token names without updating both systems
4. **Wrong styling in wireframes**: Using Tailwind instead of `wireframe.css` in `./recipes/wireframes/`
5. **Hardcoded values**: Not using design tokens when they exist
6. **Forgetting to update index**: Adding recipe but not updating `./use-cases.md`

---

## Getting Unstuck

1. **For component patterns**: Search existing recipes in same category
2. **For token questions**: Read `./recipes/design-systems/elementary/tokens.md` (the source of truth)
3. **For styling decisions**: Follow flowchart in `./recipes/design-systems/README.md`
4. **For recipe structure**: Review `./recipes/README.md` and `./recipes/CONTRIBUTING.md`
5. **For user workflows**: Check `./GUIDE.md` for documented patterns

---

*Last updated: January 2026*
