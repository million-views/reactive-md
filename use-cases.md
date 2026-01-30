# Reactive MD: Jobs To Be Done
> Recipe catalog organized by user intent

### 1. Create Product Specifications

**The Job**: Write PRDs with live, interactive examples that stakeholders can actually experience.
  > Define what to build and why it matters.

**Workflow**:
1. Browse `recipes/prd-templates/` or `recipes/case-studies/` for a starting point (or create a new markdown file)
2. Add interactive wireframes using Reactive MD
3. Include live component demos in your spec
4. Get stakeholder feedback without leaving your editor

*tags: prd, spec, feature, competitive, case study*

### 2. Design User Interfaces

**The Job**: Design interfaces with instant visual feedback, no build setup required.
  > Create visual concepts and page layouts.

**Workflow**:
1. Browse `recipes/design-systems/references/recipes/` for layout patterns (landing pages, dashboards, settings) or `recipes/gallery/` for component examples
2. Preview layouts instantly with `Cmd+K P`
3. Iterate on spacing, colors, and interactions
4. Share clickable prototypes with your team

*tags: landing, dashboard, settings, nav, table, modal, card, button, form*

### 3. Document User Journeys

**The Job**: Create interactive journey documentation that users can actually walk through.
  > Map out complete user experiences and flows.

**Workflow**:
1. Start with templates from `recipes/user-journeys/` (signup, checkout, search-to-purchase, support)
2. Add interactive steps with working components
3. Test the flow end-to-end in Reactive MD
4. Validate UX assumptions before development

*tags: signup, checkout, flow, journey, onboarding*

### 4. Prototype Features

**The Job**: Prototype features with real components, instant feedback, and no configuration overhead.
  > Validate ideas and explore possibilities quickly.

**Workflow**:
1. Pick a pattern from `recipes/gallery/` (notifications, dark mode, infinite scroll, drag-and-drop, real-time, data loading)
2. Customize the interactive demo
3. Test user interactions and edge cases
4. Decide whether to build or iterate further

*tags: notification, dark, scroll, drag, realtime, data*

### 5. Build Design Systems

**The Job**: Develop components with immediate visual feedback, then document them with live examples.
  > Create and maintain reusable component libraries.

**Workflow**:
1. Read `recipes/design-systems/README.md` for architectural inspiration (token contracts, theming patterns)
2. Create your own design system with live token examples
3. Prove it out by implementing use-cases or porting examples from `recipes/design-systems/references/recipes/`
4. Document your system with interactive component demos

*tags: component, library, design system, pattern*

### 6. Audit Design Fidelity
**The Job**: Verify that your components behave correctly across devices with pixel-perfect accuracy.
  > Audit rotation, scaling, and container query fidelity.

**Workflow**:
1. Open `recipes/gallery/fidelity-benchmark/spec.md` to see the "Logical Truth" diagnostics
2. Use the **Fidelity Toolkit** in your own documents to debug layout shifts
3. Verify that `@container` queries respond to emulated device sizes
4. Ensure hardware metaphors (like scrollbars) are respected

*tags: audit, fidelity, benchmark, diagnostic, container-query*

### 7. Write Technical Documentation

**The Job**: Write docs with code examples that actually run and render.
  > Create documentation that developers can learn from and trust.

**Workflow**:
1. Browse recipes for documentation patterns (all categories include live examples)
2. Add `jsx live` code fences for interactive examples
3. Include working components that readers can modify
4. Keep examples current and testable

*tags: docs, documentation, tutorial, guide, example*

### 8. Data Journalism & Visual Essays

**The Job**: Create immersive, narrative-driven data stories where the prose and visualizations are deeply integrated.
  > Turn complex measurements into human-centered insights.

**Workflow**:
1. Gather datasets in `.json` sidecars
2. Write the narrative hub in your markdown file
3. Implement custom chart logic or SVG visualizations in sidecar files
4. Embed interactive components that let readers explore the data through filters or scrollytelling

*tags: journalism, essay, visualization, data-story, svg, storytelling*

