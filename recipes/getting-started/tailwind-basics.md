# Tailwind v4 Basics

Reactive MD includes Tailwind CSS v4 with zero configuration.

## Layout & Spacing

```jsx live
function LayoutDemo() {
  return (
    <div className="flex gap-4 p-6 bg-gray-100 rounded-lg">
      <div className="w-24 h-24 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
        Box 1
      </div>
      <div className="w-24 h-24 bg-green-500 rounded flex items-center justify-center text-white font-bold">
        Box 2
      </div>
      <div className="w-24 h-24 bg-purple-500 rounded flex items-center justify-center text-white font-bold">
        Box 3
      </div>
    </div>
  );
}
```

## Typography

```jsx live
function TypographyDemo() {
  return (
    <div className="space-y-2 p-6">
      <h1 className="text-4xl font-black text-gray-900">Heading 1</h1>
      <h2 className="text-2xl font-bold text-gray-800">Heading 2</h2>
      <h3 className="text-xl font-semibold text-gray-700">Heading 3</h3>
      <p className="text-base text-gray-600">Body text with normal weight.</p>
      <p className="text-sm text-gray-500">Small text for captions.</p>
    </div>
  );
}
```

## Interactive States

```jsx live
function ButtonStates() {
  return (
    <div className="flex gap-3 p-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition">
        Hover me
      </button>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 active:bg-gray-400 transition">
        Secondary
      </button>
      <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:border-gray-400 transition">
        Outline
      </button>
    </div>
  );
}
```

## Responsive Design

```jsx live
function ResponsiveCard() {
  return (
    <div className="p-6">
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500" />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900">Card Title</h3>
          <p className="mt-2 text-gray-600">
            This card uses shadows, gradients, and rounded corners.
          </p>
          <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Key Points

- All Tailwind v4 utilities work automatically
- No `@tailwind` directives needed
- Hover, focus, and active states work in Interactive Preview
- Use `Cmd+K P` for full interactivity
