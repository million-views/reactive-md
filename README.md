# Reactive MD

**Reactive markdown for developers and product teams** — preview React components instantly in VS Code.

## Quick Links

- 📦 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)
- 🏠 [Homepage](https://m5nv.com)
- 🐛 [Report Issues](https://github.com/million-views/reactive-md/issues)

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| ⚡ **Live Reload** | See changes as you type — no manual refresh |
| 📝 **Markdown Fences** | `jsx live` renders inline in markdown preview |
| 🎨 **Tailwind v4** | Full utility support, zero config |
| 📦 **npm Packages** | Most packages work via esm.sh CDN |
| 🔍 **CodeLens** | Click "▶ Preview" above exported components |
| 🎯 **TypeScript** | Full `.tsx` support with type stripping |

## Installation

1. Open VS Code
2. Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)
3. Search for "Reactive MD"
4. Click Install

Or install from the command line:
```bash
code --install-extension million-views.reactive-md
```

## 🚀 Quick Start

### Option 1: JSX/TSX Files
1. Open any `.jsx` or `.tsx` file  
2. Press `Cmd+K P` (Mac) / `Ctrl+K P` (Windows/Linux)  
3. Start coding — preview updates live!

### Option 2: Markdown Code Fences
~~~markdown
```jsx live
function Hello() {
  return <h1 className="text-2xl font-bold text-blue-600">Hello World!</h1>;
}
```
~~~

Press `Cmd+Shift+V` for markdown preview, or `Cmd+K P` for interactive mode.

## Blueprints

This repository contains **blueprints** - living product requirement documents with embedded interactive JSX components. See the [blueprints/](./blueprints/) folder for examples.

## Contributing

We welcome contributions! Please see:
- [blueprints/](./blueprints/) - Contribute product ideas as interactive specs
- [Issues](https://github.com/million-views/reactive-md/issues) - Report bugs or request features

## License

MIT © [Million Views](https://m5nv.com)
