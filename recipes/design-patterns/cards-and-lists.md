# Cards and Lists

> Grid layouts, list views, and card patterns with proper component architecture.

## About This Recipe

Cards and lists are fundamental building blocks for displaying collections. This recipe demonstrates layout patterns, interaction states, and best practices for component organization.

---

## Card Grid

This example shows a responsive card grid with status indicators and action buttons. The component uses realistic project data and demonstrates hover states and visual hierarchy.

**Data Import Pattern**: This example demonstrates importing static data from JSON files instead of hardcoding data in components.

```jsx live
import CardGrid from './CardGrid.jsx';

function CardGridDemo() {
  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Project Dashboard</h2>
      <CardGrid />
    </div>
  );
}
```

## List View

This interactive list demonstrates selection states, bulk operations, and category-based styling. Users can select multiple items and see a running count of selections.

**Data Import Pattern**: Like the card grid, this component imports task data from a JSON file for better maintainability.

```jsx live
import ListView from './ListView.jsx';

function ListViewDemo() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <ListView />
    </div>
  );
}
```

## Component Structure

Following GUIDE.md best practices, this recipe is organized as:

- **`CardGrid.jsx`** - Responsive card grid with status indicators
- **`ListView.jsx`** - Interactive list with selection functionality
- **`projects.json`** - Static project data imported by CardGrid
- **`tasks.json`** - Static task data imported by ListView

## Key Features Demonstrated

### Layout Patterns
- **Responsive Grid**: Adapts from single column on mobile to multi-column on desktop
- **Consistent Spacing**: Uses Tailwind's gap utilities for uniform spacing
- **Visual Hierarchy**: Clear information hierarchy with icons, titles, and metadata

### Interaction States
- **Hover Effects**: Subtle shadow transitions on card hover
- **Selection States**: Visual feedback for selected list items
- **Status Indicators**: Color-coded status badges and category tags

### Data Patterns
- **Static Data**: Imported data structures (not embedded in components)
- **Realistic Content**: Meaningful project and task data
- **Consistent Structure**: Well-formed data objects with all required fields

### JSON Import Benefits

**Why Import Data from JSON Files?**

This pattern provides several advantages over hardcoding data in components:

- **Separation of Concerns**: Data lives separately from presentation logic
- **Easy Maintenance**: Update data without touching component code
- **Reusability**: Same data can be used across multiple components
- **Version Control**: Data changes are clearly tracked in git
- **Testing**: Data can be mocked or replaced for different test scenarios

**How It Works:**
```javascript
// Instead of this (hardcoded):
const projects = [
  { id: 1, title: 'Project Alpha', ... }
];

// Do this (imported):
import projects from './projects.json';
```

This approach scales well for larger applications and makes components more focused on presentation logic.

## Best Practices Applied

- **Component Separation**: UI logic separated from data and presentation
- **Accessibility**: Proper button elements and keyboard navigation
- **Performance**: Efficient rendering with proper key props
- **Maintainability**: Clean, readable component structure

## Use Cases

### When to Use Cards
- **Dashboard Views**: Project overviews, metrics displays
- **Product Catalogs**: Item listings with images and details
- **Content Previews**: Article cards, video thumbnails

### When to Use Lists
- **Task Management**: To-do lists, work queues
- **Data Tables**: Simplified table views without full grid complexity
- **Navigation**: Menu items, file listings

This recipe provides reusable patterns that can be adapted for various data display needs while maintaining consistent interaction patterns.

---
*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
