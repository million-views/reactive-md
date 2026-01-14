---
title: Search to Purchase
author: million-views
status: implemented
date: 2026-01-13
instruction: "Build a discovery flow from product search through details to purchase. Learn to implement search filtering, product grids, detail views, and state transitions across multiple views."
tags: ["user-journey", "ecommerce", "search", "discovery", "product-detail"]
related-jtbd: "Document User Journeys"
---

# Product Discovery Journey

> Search → Results → Details → Purchase

## About This Recipe

Product discovery is where the customer journey begins. This recipe shows how to guide users from initial search through to purchase with clear navigation and visual feedback.

**What you'll learn:**
- Search filtering with real-time results
- Grid layouts for product display
- Product detail pages with rich information
- State transitions between views (search → detail → purchase)
- Visual feedback with ratings and pricing

---

## Interactive Discovery Flow

```jsx live
import SearchToPurchase from './SearchToPurchase.jsx';

function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Product Catalog</h1>
        <SearchToPurchase />
      </div>
    </div>
  );
}
```

## Flow Overview

**Stage 1: Search & Results**
- Search input with real-time filtering
- Grid of product cards showing:
  - Product image (emoji icon)
  - Name
  - Price
  - Star rating
- Click card to see details

**Stage 2: Product Details**
- Large product image
- Full name
- Rating and price prominent
- Product description
- Call-to-action: "Buy Now"
- Back button to search results

**Stage 3: Confirmation**
- Success celebration
- Order confirmation message
- "Start Over" to search again

## Key Patterns

### Real-Time Search Filtering
```jsx
const filtered = products.filter((p) =>
  p.name.toLowerCase().includes(query.toLowerCase())
);
```
Results update instantly as user types.

### State Management for Navigation
```jsx
const [stage, setStage] = useState('search');  // search → detail → purchased
const [selected, setSelected] = useState(null);  // selected product
```

### Product Grid Display
- Responsive 2-column grid
- Card shows key info (price, rating)
- Hover state provides visual feedback
- Click action: select product and show details

### Detail View
- Large emoji for visual impact
- Price prominent in green (signals value)
- Rating with stars
- Descriptive text
- Clear purchase CTA

## Testing the Flow

Users can:
1. Type in search box to filter products (try "watch", "speaker", etc.)
2. Click any product card to see details
3. Review details and ratings
4. Click "Buy Now" to complete purchase
5. See confirmation with product name
6. Click "Start Over" to search again
7. Try multiple products and paths

## Conversion Optimization Tips

- **Price prominence**: Green color signals savings/value
- **Social proof**: Star rating builds confidence (4.5+ is good)
- **Clear CTA**: "Buy Now" is specific action, not generic "Submit"
- **Quick back button**: Friction-free returns to search
- **Product icons**: Visual distinction helps decision-making
- **Mobile first**: Grid should stack to single column on mobile

## Variations to Consider

- **Wishlist**: Add heart icon to save products
- **Filter by price**: Add range slider for price filtering
- **Category filter**: Filter by type of product
- **Sort options**: By price, rating, relevance
- **Product reviews**: Show user reviews on detail page
- **Related products**: Suggest similar items
- **In-stock indicator**: Show availability
- **Quick view**: Modal detail without leaving search

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
