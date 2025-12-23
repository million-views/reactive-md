# User Flow Template

> Copy this template for multi-step user journeys.

---
title: [Flow Name] User Journey
author: @your-handle
status: draft
date: YYYY-MM-DD
---

# [Flow Name] User Journey

## Overview

*Brief description of the complete journey.*

**Entry point**: Where does the user start?  
**Goal**: What is the user trying to accomplish?  
**Exit point**: How do they know they're done?

## Flow Diagram

```
[Entry] → Step 1 → Step 2 → Step 3 → [Success]
                ↓
            [Error Handling]
```

---

## Step 1: [Step Name]

*What happens in this step? What decisions does the user make?*

```jsx live
export default function Step1() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="text-sm text-gray-500 mb-4">Step 1 of 3</div>
      <h2 className="text-xl font-bold mb-4">Welcome! Let's get started</h2>
      <p className="text-gray-600 mb-6">
        First, we need some basic information.
      </p>
      <input 
        type="email" 
        placeholder="Enter your email"
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Continue
      </button>
    </div>
  );
}
```

**User can**:
- Enter their email
- Click Continue to proceed

**Possible errors**:
- Invalid email format → Show inline validation

---

## Step 2: [Step Name]

*What happens next?*

```jsx live
export default function Step2() {
  const [selected, setSelected] = React.useState(null);
  const options = [
    { id: 'personal', label: 'Personal', desc: 'For individual use' },
    { id: 'team', label: 'Team', desc: 'For small teams' },
    { id: 'enterprise', label: 'Enterprise', desc: 'For large organizations' },
  ];
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="text-sm text-gray-500 mb-4">Step 2 of 3</div>
      <h2 className="text-xl font-bold mb-4">Choose your plan</h2>
      <div className="space-y-3 mb-6">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`w-full p-4 border rounded-lg text-left ${
              selected === opt.id ? 'border-blue-500 bg-blue-50' : ''
            }`}
          >
            <div className="font-medium">{opt.label}</div>
            <div className="text-sm text-gray-500">{opt.desc}</div>
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <button className="flex-1 py-2 border rounded">Back</button>
        <button 
          disabled={!selected}
          className="flex-1 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
```

**User can**:
- Select a plan
- Go back to Step 1
- Continue to Step 3

**Possible errors**:
- No selection → Disable Continue button

---

## Step 3: [Step Name]

*Final step before completion.*

```jsx live
export default function Step3() {
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };
  
  if (done) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-xl font-bold mb-2">You're all set!</h2>
        <p className="text-gray-600 mb-6">Welcome aboard. Let's get started.</p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded">
          Go to Dashboard
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="text-sm text-gray-500 mb-4">Step 3 of 3</div>
      <h2 className="text-xl font-bold mb-4">Confirm your details</h2>
      <div className="bg-gray-50 p-4 rounded mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Email</span>
          <span>user@example.com</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Plan</span>
          <span>Team</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 py-2 border rounded">Back</button>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </div>
    </div>
  );
}
```

---

## Error Handling

*What happens when things go wrong?*

```jsx live
export default function ErrorState() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="text-center">
        <div className="text-4xl mb-4">😕</div>
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          We couldn't create your account. Please try again.
        </p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded">
          Try Again
        </button>
      </div>
    </div>
  );
}
```

---

## Metrics

| Step | Success Criteria |
|------|------------------|
| Step 1 → Step 2 | 90% proceed |
| Step 2 → Step 3 | 80% proceed |
| Step 3 → Complete | 95% complete |
| Overall | 70% complete signup |

## Open Questions

1. Should we allow skipping optional steps?
2. Save progress for users who abandon mid-flow?
3. A/B test single-page vs multi-step?

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
