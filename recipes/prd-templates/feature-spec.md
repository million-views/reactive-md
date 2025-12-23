# Feature Specification Template

> Copy this template for single-feature PRDs.

---
title: [Feature Name]
author: @your-handle
status: draft
date: YYYY-MM-DD
---

# [Feature Name]

## Problem Statement

*What user problem does this feature solve? Who experiences it? How painful is it?*

Example:
> Users miss important updates because we lack a unified notification system.
> Currently, critical alerts are buried in email, leading to delayed responses
> and frustrated customers.

## User Stories

*Write from the user's perspective.*

**As a** [type of user],  
**I want** [some goal],  
**so that** [some reason].

## Proposed Solution

*High-level description of the feature.*

### Component 1: [Name]

*Describe what this component does, then show it:*

```jsx live
export default function ExampleComponent() {
  const [active, setActive] = React.useState(false);
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Interactive Example</h3>
      <button 
        onClick={() => setActive(!active)}
        className={`px-4 py-2 rounded ${
          active ? 'bg-green-500' : 'bg-gray-300'
        } text-white`}
      >
        {active ? 'Active' : 'Inactive'}
      </button>
    </div>
  );
}
```

### Component 2: [Name]

*Repeat for each major component...*

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Empty state | Show helpful message with CTA |
| Error state | Display error with retry option |
| Loading state | Show skeleton or spinner |
| Overflow | Truncate with "show more" |

### Empty State Example

```jsx live
export default function EmptyState() {
  return (
    <div className="text-center py-12 text-gray-500">
      <div className="text-4xl mb-4">📭</div>
      <h3 className="font-medium mb-2">No notifications yet</h3>
      <p className="text-sm">When you get notifications, they'll show up here.</p>
    </div>
  );
}
```

## Technical Considerations

- **Dependencies**: What libraries or APIs does this require?
- **Performance**: Any concerns with large data sets?
- **Backwards compatibility**: Does this affect existing features?

## Open Questions

1. Question that needs stakeholder input?
2. Technical decision that's still pending?
3. Edge case we haven't solved?

## Success Metrics

- [ ] Metric 1: [Measurable outcome]
- [ ] Metric 2: [Measurable outcome]
- [ ] Metric 3: [Measurable outcome]

## Changelog

| Date | Author | Change |
|------|--------|--------|
| YYYY-MM-DD | @handle | Initial draft |

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
