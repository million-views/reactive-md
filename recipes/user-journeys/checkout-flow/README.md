---
title: Checkout Flow
author: million-views
status: implemented
date: 2026-01-13
instruction: "Guide users through a multi-step e-commerce checkout: cart review, shipping selection, payment, and confirmation. Learn to manage complex state across steps, handle back/forward navigation, and provide clear progress feedback."
tags: ["user-journey", "checkout", "ecommerce", "payment", "multi-step"]
related-jtbd: "Document User Journeys"
---

# E-Commerce Checkout Journey

> Cart → Shipping → Payment → Confirmation

## About This Recipe

Checkout is where conversions happen or abandon. This recipe shows a complete, realistic checkout flow that balances getting the sale with respecting user concerns (shipping costs, payment security).

**What you'll learn:**
- Multi-step flow state management
- Back/forward navigation with step validation
- Conditional step rendering (different content per step)
- Clear progress indication with icons
- Success state design patterns

---

## Interactive Checkout Flow

```jsx live
import CheckoutFlow from './CheckoutFlow.jsx';

function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <CheckoutFlow />
    </div>
  );
}
```

## Flow Overview

**Step 1: Review Cart**
- Display items with prices
- Quick remove action
- Running total
- Validates before advancing

**Step 2: Choose Shipping**
- Three options: Standard (free), Express, Overnight
- Displays cost per option
- Radio button selection
- Shipping cost added to total

**Step 3: Enter Payment**
- Card number field
- Expiry and CVC
- Simple validation
- Clear button text: "Place Order"

**Step 4: Confirmation**
- Success celebration (emoji, color)
- Order number for reference
- Confirmation message
- Restart option to test again

## Key Patterns

### Step State Management
```jsx
const [step, setStep] = useState(0);  // 0-3 for cart→shipping→payment→confirm
```

### Conditional Rendering
Each step has different content, rendered via a switch statement:
```jsx
const renderStep = () => {
  switch (step) {
    case 0: return <CartStep />;
    case 1: return <ShippingStep />;
    // ...
  }
};
```

### Progressive Disclosure
- Only show relevant fields per step
- Hide back button on first step
- Show different button text per step ("Continue" vs "Place Order")
- Final step has different CTA

### Visual Feedback
- Step progress shows which steps are complete vs pending
- Icons for visual identity
- Color changes (gray → blue) for completed steps
- Checkmark (✓) replaces icon when complete

## Testing the Flow

Users can:
1. Review their cart (see 2 sample items)
2. Choose a shipping method
3. Enter payment details (no validation, for demo)
4. See confirmation with order number
5. Restart to try different shipping options
6. Test the back button to revisit previous steps

## Variations to Consider

- **Address validation**: Add a shipping address step before method selection
- **Promo codes**: Let users apply discount codes at cart review
- **Payment methods**: Show multiple payment options (card, PayPal, Apple Pay)
- **Express checkout**: Skip steps for returning customers
- **Order summary sidebar**: Show subtotal, tax, shipping, total throughout flow
- **Error recovery**: Show validation messages if required fields are empty

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
