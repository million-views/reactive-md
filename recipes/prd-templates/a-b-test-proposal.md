# A/B Test Proposal Template

> Copy this template for proposing variant experiments.

---
title: [Feature] A/B Test Proposal
author: @your-handle
status: draft
date: YYYY-MM-DD
---

# [Feature] A/B Test Proposal

## Hypothesis

*What do we believe, and why?*

> If we [change X], then [metric Y] will [increase/decrease] by [Z%],
> because [reasoning].

Example:
> If we change the CTA button from "Sign Up" to "Get Started Free", 
> then signup conversions will increase by 15%, because "Free" reduces 
> perceived risk and "Get Started" implies immediate value.

## Current State (Control)

*Show the current implementation:*

```jsx live
export default function ControlVariant() {
  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-sm">
      <h2 className="text-xl font-bold mb-2">Ready to dive in?</h2>
      <p className="text-gray-600 mb-4">
        Join thousands of teams already using our platform.
      </p>
      <button className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium">
        Sign Up
      </button>
    </div>
  );
}
```

**Current metrics**:
- Click-through rate: 3.2%
- Signup completion: 45%

## Variant A

*First alternative:*

```jsx live
export default function VariantA() {
  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-sm">
      <h2 className="text-xl font-bold mb-2">Ready to dive in?</h2>
      <p className="text-gray-600 mb-4">
        Join thousands of teams already using our platform.
      </p>
      <button className="w-full py-3 bg-green-500 text-white rounded-lg font-medium">
        Get Started Free
      </button>
    </div>
  );
}
```

**Changes**:
- Button text: "Sign Up" → "Get Started Free"
- Button color: Blue → Green

**Expected impact**: +15% CTR

## Variant B

*Second alternative (optional):*

```jsx live
export default function VariantB() {
  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-sm">
      <h2 className="text-xl font-bold mb-2">Ready to dive in?</h2>
      <p className="text-gray-600 mb-4">
        Join thousands of teams already using our platform.
      </p>
      <button className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium">
        Start Free Trial →
      </button>
      <p className="text-center text-sm text-gray-500 mt-2">
        No credit card required
      </p>
    </div>
  );
}
```

**Changes**:
- Button text: "Sign Up" → "Start Free Trial →"
- Added "No credit card" reassurance

**Expected impact**: +20% CTR

---

## Side-by-Side Comparison

```jsx live
export default function Comparison() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <div className="text-sm font-medium text-gray-500 mb-2">Control</div>
        <div className="p-4 bg-white rounded-lg shadow">
          <button className="w-full py-2 bg-blue-500 text-white rounded">
            Sign Up
          </button>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-gray-500 mb-2">Variant A</div>
        <div className="p-4 bg-white rounded-lg shadow">
          <button className="w-full py-2 bg-green-500 text-white rounded">
            Get Started Free
          </button>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-gray-500 mb-2">Variant B</div>
        <div className="p-4 bg-white rounded-lg shadow">
          <button className="w-full py-2 bg-blue-500 text-white rounded">
            Start Free Trial →
          </button>
          <p className="text-xs text-gray-500 mt-1">No credit card required</p>
        </div>
      </div>
    </div>
  );
}
```

---

## Test Parameters

| Parameter | Value |
|-----------|-------|
| **Traffic split** | 33% / 33% / 34% |
| **Duration** | 2 weeks minimum |
| **Sample size** | 10,000 visitors per variant |
| **Primary metric** | Signup button CTR |
| **Secondary metrics** | Signup completion, Time to click |
| **Significance level** | 95% confidence |

## Audience

- All new visitors
- Desktop and mobile
- Exclude returning users

## Risks

| Risk | Mitigation |
|------|------------|
| Lower quality signups | Track 7-day retention as guardrail |
| Brand inconsistency | Run by design team before launch |
| Technical issues | QA all variants before going live |

## Timeline

| Date | Milestone |
|------|-----------|
| Week 1 | Implement variants, QA |
| Week 2-3 | Run experiment |
| Week 4 | Analyze results, document learnings |

## Decision Criteria

- **Ship Variant A/B if**: CTR increase ≥ 10% with 95% confidence
- **Iterate if**: Positive signal but < 95% confidence
- **Kill if**: Negative impact on signup completion rate

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
