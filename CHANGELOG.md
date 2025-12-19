# Changelog

All notable changes to Reactive MD will be documented here.

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
