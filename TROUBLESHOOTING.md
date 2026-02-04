# Troubleshooting Reactive MD

Quick solutions for common issues with installing and using Reactive MD.

---

## Installation

### From VS Code Marketplace (Recommended)

#### GUI Installation
1. Open VS Code
2. Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)
3. Search for "Reactive MD"
4. Click **Install**

#### Command Line Installation
```bash
code --install-extension million-views.reactive-md
```

### From Open VSX (Alternative Editors)

For VSCodium, Gitpod, or other VS Code-compatible editors:

#### GUI Installation
1. Open your editor
2. Go to Extensions marketplace
3. Search for "Reactive MD" by "million-views"
4. Click **Install**

#### Command Line Installation
```bash
# For VSCodium
codium --install-extension million-views.reactive-md

# For other editors, check their documentation for extension installation commands
```

### Verification

After installation:
1. Reload VS Code: `Cmd+Shift+P` → "Developer: Reload Window"
2. Open any `.jsx` or `.tsx` file
3. Look for "▶ Preview" above exported components (CodeLens)
4. Try `Cmd+K P` to open Interactive Preview

### Common Installation Issues

#### Extension Not Appearing
- **Check marketplace**: Ensure you're searching in the correct marketplace (VS Code vs Open VSX)
- **Network issues**: Some corporate networks block marketplace access
- **Version compatibility**: Requires VS Code 1.106.0+

#### "Extension host terminated unexpectedly"
- Try reloading window: `Cmd+Shift+P` → "Developer: Reload Window"
- Check VS Code version compatibility

#### CodeLens Not Showing
- Extension may not be activated - open a `.jsx` or `.tsx` file first
- Check settings: `reactiveMd.showCodeLens` should be `true`

---

## Quick Checklist

Before diving into diagnostics:

- [ ] File extension is `.jsx` or `.tsx` (not `.js` or `.ts`)
- [ ] VS Code version is 1.106.0 or higher (`Help → About`)
- [ ] Tried reloading window (`Cmd+Shift+P` → "Developer: Reload Window")
- [ ] Extension is installed and enabled

---

## Common Issues

### Preview Shows Blank/White Screen

Check the VS Code Output panel:
1. `View → Output` or `Cmd+Shift+U`
2. Select **"Reactive MD"** from the dropdown
3. Look for error messages

Common causes:
- Syntax errors in your component or dependencies
- Missing default export for component files
- Large dependencies causing transformation timeouts

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

### Device Emulation Stability

**Issue**: A component isn't syncing with the rest of the document or seems stuck on a specific device.

**Solutions**:
1. **Check for Pins**: Ensure the component header shows the 🔗 icon. If it shows 📌, it is intentionally ignoring the document bus.
2. **Check the Fence Header**: Look at the code fence options. If it contains `lock-view`, it is forced into a specific state by the author and cannot be changed interactively.
3. **Reset the Bus**: Toggling any **Synced (🔗)** component to a different device will force a re-synchronization across the entire document.
4. **Reload Window**: If the state feels out of sync after heavy document restructuring, use `Cmd+Shift+P` → "Developer: Reload Window".

### Content Looks Too Small or Large (Scaling)

**Issue**: The component looks tiny on a large monitor, or requires horizontal scrolling on a small screen.

**Reason**: Reactive MD follows "Technical Truth" scaling. It renders components at 1:1 logical pixels for the selected device (e.g., 375px wide for iPhone SE). Unlike some tools that "shrink-to-fit" content, we preserve the exact physical proportions to ensure your design matches the target hardware.

**Solutions**:
- **Use Scrollbars**: If the device is larger than your IDE pane, use the provided horizontal/vertical scrollbars to navigate the prototype.
- **Switch Presets**: If you have limited screen space, use `device=mobile` to reduce the logical width of the frame.
- **Use Container Queries**: Ensure you are using `@md:`, `@lg:` variants for responsiveness. These will correctly adapt to the frame size.

### Horizontal Scrollbar is Always Visible

**Issue**: Even on mobile presets, a horizontal scrollbar appears.

**Cause**: An element within your component has a fixed width larger than the viewport (e.g., `width: 500px` inside a mobile frame).

**Fix**: Check for fixed-width elements or images without `max-width: 100%`. Use responsive Tailwind classes like `w-full` or `max-w-full`.

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

### "Live updates paused" Warning in Footer

**Issue**: The Interactive Preview shows a footer warning: *"Live updates paused. Open Markdown Preview (Cmd+Shift+V) to resume."*

**Cause**: The Interactive Preview relies on the Markdown Preview to provide updated code and metadata. If the Markdown Preview is closed, the Interactive Preview remains as a "Dormant" artifact. It stays visible so you don't lose your place, but it cannot receive new code edits or sync signals.

**Solution**: Press `Cmd+Shift+V` (Mac) or `Ctrl+Shift+V` (Windows/Linux) to open the Markdown Preview. The connection will be restored automatically.

### Offline Mode & Bundled Packages

Reactive MD is designed to work **100% offline**. All supported libraries are pre-bundled directly into the extension to ensure maximum performance and security without requiring external CDN access.

#### Available Packages (Offline):

- **Animation**: `motion/react` (Framer Motion).
- **Iconography**: `lucide-react`, `@heroicons/react`.
- **State & Logic**: `zustand`, `jotai`, `react-hook-form`, `uuid`.
- **Utilities**: `dayjs`, `es-toolkit`, `clsx`, `tailwind-merge`, `class-variance-authority`.

> **Note**: Importing arbitrary npm packages that are NOT in the bundled list is not currently supported to maintain stability and security.

---

## Platform-Specific Issues

### Mac
- **Marketplace access blocked**: Some corporate networks restrict VS Code Marketplace access
- **Solution**: Try installing from Open VSX or contact IT about network restrictions

### Windows
- **Antivirus blocking**: Some antivirus software may interfere with extension installation
- **Solution**: Temporarily disable antivirus during installation or add VS Code to exclusions

### Linux
- **Snap/Flatpak restrictions**: Sandboxed VS Code installations may have limited network access
- **Solution**: Use the `.deb`/`.rpm` package instead of Snap/Flatpak, or try Open VSX

---

## Still Stuck?

1. **Search existing issues**: [GitHub Issues](https://github.com/million-views/reactive-md/issues)
2. **Open a new issue**: Include VS Code version, OS, and error messages from Developer Tools Console

---

*[Back to README](./README.md)*
