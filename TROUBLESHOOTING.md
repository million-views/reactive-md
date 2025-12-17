# Troubleshooting Reactive MD

Quick solutions for common issues.

---

## Quick Checklist

Before diving into diagnostics:

- [ ] File extension is `.jsx` or `.tsx` (not `.js` or `.ts`)
- [ ] VS Code version is 1.106.0 or higher (`Help → About`)
- [ ] Tried reloading window (`Cmd+Shift+P` → "Developer: Reload Window")

---

## Common Issues

### Preview Shows Blank/White Screen

Check the VS Code Output panel:
1. `View → Output` or `Cmd+Shift+U`
2. Select **"Reactive MD"** from the dropdown
3. Look for error messages

Common causes:
- Network issues (esm.sh CDN unreachable)
- Syntax errors in your component
- Missing default export

### Editor Scrolls When Editing CSS Live Fences

**Issue**: Editor jumps/scrolls when typing in `css live` fences with Markdown Preview open, especially when changes affect layout (e.g., CSS custom properties).

**Cause**: VS Code's built-in scroll synchronization between editor and preview. When CSS changes affect rendered content height, VS Code scrolls the editor to maintain sync.

**Workarounds**:

1. **Close Markdown Preview while editing CSS** (recommended)
   - Edit your CSS without preview open
   - Reopen preview (`Cmd+Shift+V`) when done
   
2. **Use Interactive Preview instead**
   - Open Interactive Preview: `Cmd+K P`
   - Interactive Preview doesn't have this scroll sync issue
   
3. **Remove `live` temporarily**
   - Change ` ```css live` to ` ```css` while editing
   - Add `live` back when done
   
4. **Increase debounce delay** (partial mitigation)
   - Settings → `reactiveMd.debounceMs` → set to `1000` or higher
   - Makes refresh less frequent but doesn't eliminate scroll jumps

**Technical note**: This is a fundamental VS Code limitation. The `markdown.preview.refresh` command always triggers scroll sync, and there's no API to disable it.

### Extension Not Activating

The extension only activates when you open a `.jsx` or `.tsx` file. Opening a `.js` file won't trigger activation.

### "Command 'reactiveMd.open' not found"

**Cause**: Extension failed to activate or isn't installed correctly.

**Fix**:
1. Uninstall: `Cmd+Shift+P` → "Extensions: Uninstall Extension" → search "Reactive MD"
2. Close VS Code completely (all windows)
3. Reinstall from Marketplace
4. Reload window: `Cmd+Shift+P` → "Developer: Reload Window"

---

## VS Code Diagnostic Tools

### Developer Tools Console

**How to open**: `Help → Toggle Developer Tools` → **Console** tab  
**Shortcut**: `Cmd+Option+I` (Mac) or `Ctrl+Shift+I` (Windows/Linux)

Look for red error messages when opening a `.jsx` file or clicking Preview.

### Output Panel

**How to open**: `View → Output` → Select **"Reactive MD"** from dropdown

Extension-specific logs appear here.

### Running Extensions Panel

**How to open**: `Cmd+Shift+P` → "Developer: Show Running Extensions"

Check if `reactive-md` is listed. If not, the extension failed to load.

---

## Network Issues

The extension requires network access for npm packages via esm.sh CDN.

### Test CDN Access

Open in browser: https://esm.sh/react@19

If blocked:
- Check corporate firewall/proxy settings
- Add `esm.sh` to allowlist

### Bundled Packages (Offline)

These packages work offline: `lucide-react`, `motion`, `zustand`, `jotai`, `clsx`, `dayjs`, `es-toolkit`, `react-hook-form`, `swr`, `@tanstack/react-query`.

---

## Platform-Specific Issues

### Mac

**Quarantine warning**: If downloaded manually, macOS may quarantine files:
```bash
xattr -d com.apple.quarantine ~/Downloads/*.vsix
```

### Windows

**Antivirus blocking**: Some antivirus software blocks VS Code extensions. Try adding VS Code to your exclusion list.

### Linux

**Snap/Flatpak sandboxing**: Extensions may have limited network access. Try the `.deb`/`.rpm` package instead.

---

## Still Stuck?

1. **Search existing issues**: [GitHub Issues](https://github.com/million-views/reactive-md/issues)
2. **Open a new issue**: Include VS Code version, OS, and error messages from Developer Tools Console

---

*[Back to README](./README.md)*
