---
title: Support Ticket Flow
author: million-views
status: implemented
date: 2026-01-13
instruction: "Design a customer support request flow that guides users from problem identification through ticket submission. Learn to build category selection, detail capture, and confirmation patterns that reduce support friction."
tags: ["user-journey", "support", "customer-service", "help", "multi-step"]
related-jtbd: "Document User Journeys"
---

# Customer Support Journey

> Category → Details → Submission → Confirmation

## About This Recipe

A well-designed support flow reduces customer frustration and improves issue resolution. This recipe shows how to guide users from identifying their problem through submitting detailed information.

**What you'll learn:**
- Category-based routing for support
- Multi-field form patterns
- Priority selection
- Confirmation states with ticket numbers
- Error handling and state transitions

---

## Interactive Support Flow

```jsx live
import SupportTicketFlow from './SupportTicketFlow.jsx';

function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <SupportTicketFlow />
    </div>
  );
}
```

## Flow Overview

**Stage 1: Select Category**
- Four issue categories with icons:
  - 💳 Billing Issue
  - 🔧 Technical Problem
  - 👤 Account Help
  - ❓ Other
- User selects based on problem type
- Icons make categories quickly scannable

**Stage 2: Provide Details**
- Back button to change category
- Subject line (brief summary)
- Description field (detailed explanation)
- Priority selection: Low / Medium / High
- Visual feedback on selected priority
- Submit button with clear CTA

**Stage 3: Confirmation**
- Success celebration (checkmark emoji)
- Ticket number for reference
- Confirmation message with response time
- Category recap
- Option to submit another ticket

## Key Patterns

### Category Routing
```jsx
const categories = [
  { id: 'billing', label: 'Billing Issue', icon: '💳' },
  { id: 'technical', label: 'Technical Problem', icon: '🔧' },
  // ...
];
```
Helps users find the right category quickly using icons + labels.

### Form State Management
```jsx
const [category, setCategory] = useState(null);
const [priority, setPriority] = useState(null);
```
Maintains selected category and priority throughout flow.

### Priority Selection
- Three clear options: Low, Medium, High
- Visual feedback: Selected button shows blue background
- Helps support team prioritize
- Users understand the impact of their choice

### Progressive Disclosure
- Only show relevant fields (subject + description only on details step)
- Category recap on confirmation (shows what was selected)
- Reduces cognitive load

## Testing the Flow

Users can:
1. Click any category to start (e.g., "Billing Issue")
2. Go back and change category if needed
3. Fill in subject (e.g., "I was charged twice")
4. Fill in description with more context
5. Select priority: Low (general question) → Medium (service issue) → High (urgent)
6. Submit to see confirmation
7. See ticket number and response time
8. Start another ticket to test different categories

## Best Practices Applied

- **Icon usage**: Visual cues help users find category quickly
- **Category as filter**: Directs to right support team immediately
- **Required fields**: Subject and description are essential
- **Priority setting**: Helps team focus on urgent issues
- **Ticket number**: Gives users a way to reference their request
- **Response time**: Sets expectations (24 hours)
- **Restart option**: Friction-free way to submit another issue

## Variations to Consider

- **Knowledge base search**: Show relevant articles before form
- **Attachments**: Let users upload screenshots or files
- **Chat first**: Offer chatbot before escalating to form
- **Suggested solutions**: Auto-suggest solutions based on category
- **Ticket tracking**: Link to ticket status after submission
- **Phone option**: Offer phone support for urgent issues
- **Service selection**: Which service/product is the issue about
- **Canned responses**: Smart suggestions based on category + text
- **Related tickets**: Show if similar issue was reported

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
