# Hello World

The simplest Reactive MD example — a `jsx live` fence that renders instantly.

## The Code

```jsx live
function HelloWorld() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Hello, Reactive MD! 👋
      </h1>
      <p className="mt-2 text-gray-600">
        Edit this code and watch it update in real-time.
      </p>
    </div>
  );
}
```

## How It Works

1. The `jsx live` fence tells Reactive MD to render this code
2. Changes update instantly — no save required
3. Tailwind classes work out of the box

## Try It

- Change the greeting text
- Modify the colors (`text-blue-600` → `text-green-600`)
- Add more elements

## Key Points

- Use `jsx live` (not just `jsx`) to enable rendering
- Export is optional for single components
- Tailwind v4 utilities are always available
