# Blueprints

**Blueprints** are living product requirement documents (PRDs) with embedded interactive JSX components. They bridge the gap between static documentation and working prototypes.

## What is a Blueprint?

A blueprint is a Markdown file with embedded JSX that:
- **Describes** a feature or product concept
- **Demonstrates** the UI with live, interactive components
- **Documents** user journeys and edge cases
- **Evolves** as the product matures

## Structure

```
blueprints/
├── README.md              # This file
├── templates/             # Blueprint templates
│   └── feature-spec.md    # Standard feature blueprint template
├── components/            # Reusable UI patterns
│   └── button-variants.md # Button component exploration
├── features/              # Feature-specific blueprints
│   └── dark-mode.md       # Dark mode feature spec
└── explorations/          # Experimental ideas
    └── ai-assist.md       # AI-assisted editing exploration
```

## Contributing a Blueprint

1. Copy a template from `templates/`
2. Fill in the sections with your feature idea
3. Add interactive JSX examples
4. Submit a PR

## Example

Here's a minimal blueprint structure:

```markdown
# Feature: [Name]

## Problem Statement
What user problem does this solve?

## Proposed Solution
How does this feature address the problem?

## Interactive Demo
\`\`\`jsx
export default function Demo() {
  return <button>Try Me</button>;
}
\`\`\`

## User Journey
1. User opens...
2. User clicks...
3. User sees...

## Success Metrics
- Metric 1
- Metric 2
```

## Why Blueprints?

- **Stakeholder alignment**: Everyone sees the same interactive prototype
- **Faster iteration**: Change code, see results immediately
- **Living documentation**: Specs stay in sync with implementation
- **Community input**: Contributors can propose features as working prototypes
