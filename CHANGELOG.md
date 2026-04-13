# Changelog

All notable changes to Reactive MD will be documented here.

## [1.2.0] - 2026-04-12

### Added
- **Publish to the Web**: Run `Reactive MD: Publish` from any open `.md` file to build a self-contained static site and deploy it to your own server over SSH. Your interactive components become live islands — no CDN, no build server, no extra tooling required.
- **Multi-Target Deploy**: Set `target` to an array to deploy one project to multiple servers. A picker lets you choose which targets to deploy to.
- **Root Deploy**: Static projects no longer require a `name`. Leave it blank to deploy directly to the server root.
- **Site Nesting**: Use the `site` field to deploy a reactive-md POC as a subfolder of your static site — no nginx changes needed.
- **Protected Publish**: Mark a POC as protected and set a passphrase. The publish URL includes an unguessable token, and a client-side gate prompts your stakeholder for the passphrase before revealing content — no server configuration needed.
- **Config Autocomplete**: `reactive-md.publish.json` now has a built-in JSON schema. You get autocomplete, hover docs, and validation as you edit.
- **Schema-Driven Forms**: `zod` and `zodResolver` (`@hookform/resolvers/zod`) are now bundled alongside `react-hook-form`. Write type-safe form schemas in your prototypes that engineers can carry directly into production.

## [1.1.1] - 2026-03-11

### Fixed
- **VS Code Engine Compatibility**: Dropped minimum required VS Code version to `^1.90.0` (May 2024). This fixes installation failures in Cursor (and other VS Code-based editors) where the previous `^1.106.0` requirement was unnecessarily restrictive.

## [1.1.0] - 2026-01-31

### Added
- **Visual Zoom (Automated Artboards)**: Replaced fixed logic scaling with an ergonomic **Visual Zoom** model. Viewports now default to `zoom=auto`, fitting the artboard to your sidebar width without reflowing content. Added a 3-state icon toggle ([Auto] [Fit] [1:1]) in the component header for high-fidelity verification.
- **Stable Identity (Identity Anchors)**: You can now edit your narrative text without causing the interactive components to reload or lose their state. Use the `id="name"` modifier to "anchor" a component's identity.
- **2D Container Queries**: Enabled full `size` based container queries (width, height, aspect-ratio) on the viewport frame. Components [can] now adapt to their *emulated device size* rather than the global sidebar width using container queries.
- **Shared Document Bus**:
  - **Synchronized Design**: Changing the device or orientation on one component updates the entire document simultaneously.
  - **Component Pinning (📌)**: "Pin" a specific component to take it out of sync, letting you compare mobile and desktop designs side-by-side.
  - **Author Locks (🚫)**: Enforce specific viewports for your readers using the `device="..." lock-view` modifier in your code fences.
- **100% Offline (Pre-bundled Libraries)**: Transitioned to a fully offline library model. All supported npm packages (motion, lucide, zustand, etc.) are pre-bundled, ensuring 100% reliability in restricted network environments without external CDNs.
- **Sync Resilience**: **Interactive Preview** now enters a "Dormant Artifact" state when the Markdown preview is closed, preserving the last rendered view with a warning instead of showing a "Waiting" screen.

### Changed
- **Modern Brand Identity**: Refined UI icons and styling using `lucide-react` for a professional, native feel within VS Code.
- **Term Standardization**: Solidified **Markdown Preview** and **Interactive Preview** as the canonical terms across documentation and UI.
- **Logical Truth Persistence**: Components always render at 1:1 logical dimensions internally to maintain coordinate integrity for Queries, even when visually zoomed.

### Fixed
- **Sync Reliability**: Resolved race conditions and "Initializing..." hangs that occasionally occurred when switching between previews.
- **State Persistence**: Component state (like form data or toggle switches) is now much more resilient during document edits.

## [1.0.8] - 2026-01-09

### Documentation
- **Styling Behavior**: Clarified that JSX components in Markdown Preview may have slightly different list and link styling compared to native markdown **only when using Tailwind CSS in live fences**
  - **No issue** when using regular CSS in live fences or styling components in separate `.jsx` files
  - **Workarounds**: Use regular CSS, or style components separately and import them, or use Interactive Preview mode (`Cmd+K P`) for exact visual matching
  - Markdown Preview provides fast rendering with good-enough styling for most use cases

### Fixed
- **CSS Import Processing**: CSS @import statements inside comments are now properly ignored
  - Prevents accidental processing of commented-out import statements in CSS live fences

## [1.0.7] - 2025-12-21

### Added
- **JSON Data Imports**: Enhanced cards-and-lists recipe with JSON data import patterns
  - Added `projects.json` and `tasks.json` for static data examples
  - Updated `CardGrid.jsx` and `ListView.jsx` to import from JSON files
  - Demonstrates separation of data from presentation logic

### Fixed
- **Dayjs Plugins**: You can now use dayjs plugins in Markdown Preview
  - Import and use plugins: `import relativeTime from 'dayjs/plugin/relativeTime'`
  - Or use pre-extended plugins directly: `dayjs().fromNow()` works without imports
  - Available plugins: `relativeTime`, `duration`, `utc`, `timezone`
- **PRD Template Footers**: Added missing Reactive MD footers to template files
  - Fixed `feature-spec.md` and `a-b-test-proposal.md` templates

### Improved
- **Error Messages**: Cleaner package error messages in Markdown Preview
  - Package names now displayed as visual badges only (no duplicate text)
- **Recipe Documentation**: Restructured improvement planning as forward-looking TODO.md
  - Renamed RECIPE_IMPROVEMENTS.md to TODO.md
  - Rewritten as roadmap for future enhancements
  - Focus on remaining feature demonstrations and advanced patterns
- **User Guide**: Complete restructuring with better organization
  - Added extension settings documentation
  - New data and assets section explaining fetch vs import for local files
  - Improved troubleshooting flow
- **Installation Guide**: Enhanced troubleshooting documentation
  - Added proper marketplace and Open VSX installation instructions
  - Removed manual download references
  - Platform-specific installation issue guidance

## [1.0.6] - 2025-12-18

### Fixed
- **Platform Support**: Expanded from 6 to 9 supported platforms via cross-compilation
  - Added: Linux ARM64, Linux ARMhf, Alpine ARM64
  - All platforms now build correctly using cross-compilation on free GitHub runners
  - Improved workflow reliability for multi-platform publishing

## [1.0.5] - 2025-12-18

### Fixed
- **Platform Publishing**: Fixed GitHub Actions workflow to correctly build for all supported platforms
  - Updated from deprecated `macos-13` runner to `macos-14-large` for Intel Mac builds
  - Verified 3-way intersection of VS Code targets, esbuild binaries, and GitHub Actions runners
  - All 6 supported platforms now build correctly: Windows (x64, ARM64), Linux (x64), Alpine (x64), macOS (Intel, Apple Silicon)

### Changed
- Reduced extension package size by ~50% (now 6-9 MB per platform, down from 12-15 MB)
  - Removed 6MB demo.gif from published packages

## [1.0.4] - 2025-12-18

### Changed
- Package size optimization (incomplete - republished as v1.0.5)

## [1.0.3] - 2025-12-18

### Fixed
- Improved publishing workflow reliability and cross-platform compatibility

## [1.0.2] - 2025-12-18

### Fixed
- Extension now works correctly on Windows and Linux
- Resolved "platform mismatch" error when opening Interactive Preview on non-macOS systems
- All platforms now receive optimized builds with correct native dependencies

## [1.0.1] - 2025-12-17

### Fixed
- Multi-component JSX files now render correctly in Interactive Preview
- Fixed extraction of components with destructured parameters (e.g., `function Card({ title, children })`)
- JSDoc comments in JSX files no longer cause rendering errors
- Focus/Gallery toggle now properly enables for files with multiple exported components

## [1.0.0] - 2025-12-16

### Added
- 🎉 **Initial stable release**
- Live preview for JSX/TSX files with hot reload
- Markdown `jsx live` and `css live` code fences
- Tailwind CSS v4 with zero configuration
- Bundled libraries: `motion`, `lucide-react`, `dayjs`, `clsx`, `es-toolkit`, `uuid`
- Local file imports support
- TypeScript support
- Two preview modes: Markdown Preview (static) and Interactive Preview (full React runtime)
- CodeLens "▶ Preview" above exported components
- Configurable debounce, CodeLens visibility, and update modes

### Changed
- Tagline: "Literate UI/UX for product teams"
- Mode toggle uses icons: 🎯 (Spotlight) | ▤ (Gallery)

## [1.0.0-alpha.14] - 2025-12-16

### Fixed
- External CSS files imported via `@import` in `css live` fences now update properly in Markdown Preview
- CSS custom property changes (e.g., `--color: var(--blue)` → `--color: var(--red)`) now refresh immediately

### Added
- Troubleshooting guide section for editor scroll behavior when editing CSS live fences
- Documented workarounds for VS Code scroll sync limitation

## [1.0.0-alpha.13] - 2025-12-16

### Fixed
- Cache invalidation for external CSS file changes

## [1.0.0-alpha.9] - 2025-12-14

### Changed
- **BREAKING**: Renamed extension from `jsx-preview` to `reactive-md`
  - Package name: `jsx-preview` → `reactive-md`
  - Display name: `JSX Preview` → `Reactive MD`
  - Commands: `jsxPreview.*` → `reactiveMd.*`
  - Config keys: `jsxPreview.*` → `reactiveMd.*`
- Framework-agnostic naming for future Svelte/Vue support

## [1.0.0-alpha.8] - 2025-12-13

### Changed
- Marketplace optimization with improved README
- Removed unused `reactVersion` configuration setting

### Fixed
- Documentation cleanup and terminology standardization

## [1.0.0-alpha.7] - 2025-12-12

### Added
- Initial alpha release
- Live JSX/TSX preview with real-time updates
- Interactive prop editing
- Tailwind CSS v4 support
- Responsive viewport testing
