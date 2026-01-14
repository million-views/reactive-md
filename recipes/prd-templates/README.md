---
title: PRD Templates
author: million-views
status: implemented
date: 2026-01-13
instruction: "Starting templates for common product documentation tasks. Copy these templates, customize the content, and add interactive examples to create your own PRDs, proposals, and user flow specifications."
tags: ["template", "prd", "specification", "documentation"]
related-jtbd: "Create Product Specifications"
---

# PRD Templates

> Starting points for product documentation and specifications

## What Are Templates?

Templates are **starting points for your own work**. Unlike case studies (which are complete examples) or patterns (which are reusable pieces), templates provide:

- **Document structure** - How to organize your thinking
- **Section headings** - Common sections and what goes in each
- **Example content** - Realistic examples you can replace
- **Interactive examples** - Places to add your own live component demos

Each template includes placeholders for your content plus guidance on what belongs in each section.

## Collection

### Feature Specification
**Folder:** `feature-spec/`

**Files:** `README.md` + `ExampleComponent.jsx`

Template for writing detailed feature specs with interactive prototypes:

- **Overview** - What is this feature and why does it matter?
- **User Stories** - Who uses it and what do they accomplish?
- **Requirements** - Functional and non-functional requirements
- **Interactive Demo** - Live component showing the feature in action
- **Design System Integration** - Which design tokens and components to use
- **Edge Cases** - Error states, loading states, validation
- **Success Metrics** - How will we know this feature succeeds?

**When to use:** Proposing new features to stakeholders, briefing engineering teams, documenting product decisions

---

### A/B Test Proposal
**Folder:** `a-b-test-proposal/`

**Files:** `README.md` + `ABTestVariants.jsx`

Template for proposing and documenting A/B tests:

- **Hypothesis** - What do you believe will improve?
- **Variants** - Control vs Treatment (with visual comparison)
- **Success Metrics** - What indicates success?
- **Sample Size & Duration** - Statistical rigor and timeline
- **Interactive Comparison** - Side-by-side view of variants
- **Implementation Notes** - Technical considerations
- **Previous Tests** - What have you learned before?

**When to use:** Proposing conversion optimization tests, documenting experiment results, learning from iterations

---

### Competitive Analysis
**Folder:** `competitive-analysis/`

**Files:** `README.md` + `CompetitorScreens.jsx` + `FeatureMatrix.jsx` + `PositioningMatrix.jsx`

Template for competitive research documentation:

- **Market Overview** - Who are the competitors?
- **Feature Comparison** - How do features stack up?
- **Positioning Map** - Price vs Feature maturity
- **Interactive Screenshots** - Actual competitor UI examples
- **Strengths & Weaknesses** - For each competitor
- **Opportunities** - Where do we have advantages?
- **Threats** - Where are we vulnerable?

**When to use:** Market research, strategic planning, product positioning, investor presentations

---

### User Flow Specification
**Folder:** `user-flow/`

**Files:** `README.md`

Template for documenting multi-step user flows:

- **Overview** - What's the user journey? Entry/exit points?
- **Flow Diagram** - Visual representation of steps
- **Step-by-Step Breakdown** - Each step with decisions
- **Interactive Examples** - Live demos for each step
- **Error Handling** - What goes wrong and recovery paths
- **Success Criteria** - How do users know they succeeded?
- **Performance Goals** - Target time, clicks, conversions

**When to use:** Documenting signup flows, checkout flows, onboarding sequences, any multi-step process

---

## How to Use These Templates

### Step 1: Choose a Template
Identify which template matches your documentation need.

### Step 2: Copy & Customize
Copy the template folder and rename it for your project:
```
feature-spec/  →  feature-smart-search/
a-b-test-proposal/  →  a-b-test-checkout-cta/
```

### Step 3: Fill In Content
Replace placeholder text with your actual product requirements, analysis, or specifications.

### Step 4: Add Interactive Examples
In the markdown file, add a `jsx live` code fence with your own component:
```jsx live
import MyComponent from './MyComponent.jsx';

function Demo() {
  return <MyComponent />;
}
```

### Step 5: Share & Iterate
Share the markdown with your team. They can open it in Reactive MD and:
- Read your documentation
- Interact with your prototypes
- Provide feedback directly

## Template Structure

All templates follow a consistent pattern:

```
template-name/
├── README.md                 (Main specification)
├── ExampleComponent.jsx      (Interactive demo component)
└── supporting-images.png     (Optional diagrams, screenshots)
```

The README uses markdown with `jsx live` code fences to embed interactive components.

## Related Resources

- **Use Cases**: [../use-cases.md](../use-cases.md) for workflows that combine templates
- **Case Studies**: [../case-studies/](../case-studies/) for complete, real-world examples
- **User Journeys**: [../user-journeys/](../user-journeys/) for specific flow examples (signup, checkout, etc.)
- **Patterns**: [../gallery/](../gallery/) for reusable components to include in your specs

---

*These templates are part of Reactive MD — bringing literate programming to product design.*
