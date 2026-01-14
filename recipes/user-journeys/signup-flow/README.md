---
title: Signup Flow
author: million-views
status: implemented
date: 2026-01-13
instruction: "Walk through a complete account registration, email verification, and profile completion flow. See how to implement multi-step forms with progress tracking, state management, and user feedback."
tags: ["user-journey", "signup", "onboarding", "form", "multi-step"]
related-jtbd: "Document User Journeys"
---

# Account Signup Journey

> Registration → Email Verification → Profile → Welcome

## About This Recipe

Account signup is critical for user acquisition. This recipe shows a complete, realistic signup flow that balances gathering the right information with getting users into the product quickly.

**What you'll learn:**
- Multi-step form patterns with progress tracking
- Validation and state management across steps
- Visual feedback and stage transitions
- Email verification workflows

---

## Interactive Flow

```jsx live
import SignupFlow from './SignupFlow.jsx';

function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <SignupFlow />
    </div>
  );
}
```

## Flow Overview

**Step 1: Create Account**
- Email and password entry
- Input validation (email format, password strength)
- Clear error states

**Step 2: Verify Email**
- Confirmation message with icon
- Link sent to inbox
- Retry option if needed

**Step 3: Complete Profile**
- Name, company, role
- Additional context for personalization
- Optional fields vs. required

**Step 4: Welcome**
- Success state celebration
- Clear call-to-action to next step
- Option to restart for testing

## Key Patterns

### Progress Tracking
- Visual indicator shows current step (numbered, filled, completed states)
- Connection line shows progress through flow
- Users always know where they are in the journey

### Form Handling
- Dynamic field rendering based on step
- Input validation before advancing
- Clear button states (active/disabled)

### Feedback
- Icons for each step create visual identity
- Success states with celebration emoji
- Natural language ("All Set!" vs "Complete")

### State Management
```jsx
const [stage, setStage] = useState(0);  // Current step (0-indexed)
const isComplete = stage >= stages.length;  // Journey complete?
```

## Testing the Flow

Users can:
1. Click "Continue" to advance through steps
2. See validation (empty inputs won't advance)
3. Experience the full journey from start to success
4. Click "Restart Demo" to try again
5. Modify the `stages` array to customize the flow

## Variations to Consider

- **Progress saver**: Save form progress to localStorage between sessions
- **Optional steps**: Skip profile completion for faster signup
- **Social login**: Add OAuth options alongside email/password
- **Multi-language**: Localize all copy
- **Mobile optimization**: Stack form better on small screens

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
