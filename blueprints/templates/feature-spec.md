# Feature Blueprint: [Feature Name]

> **Status**: Draft | In Review | Approved | Implemented
> **Author**: [Your Name]
> **Date**: YYYY-MM-DD

## Problem Statement

*What user problem does this feature solve? Who experiences this problem?*

## Proposed Solution

*High-level description of the feature.*

## Interactive Demo

```jsx
export default function FeatureDemo() {
  const [state, setState] = React.useState(false);
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Feature Demo</h2>
      <button 
        onClick={() => setState(!state)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {state ? 'Active' : 'Inactive'}
      </button>
    </div>
  );
}
```

## User Journey

1. **Entry point**: How does the user discover this feature?
2. **Activation**: What action triggers the feature?
3. **Feedback**: What does the user see/experience?
4. **Completion**: How does the user know it worked?

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Empty input | Show placeholder message |
| Error state | Display error with retry option |
| Loading | Show spinner or skeleton |

## Technical Considerations

- Dependencies required
- Performance implications
- Backwards compatibility

## Success Metrics

- [ ] Metric 1: Description
- [ ] Metric 2: Description

## Open Questions

- Question 1?
- Question 2?

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| YYYY-MM-DD | Name | Initial draft |
