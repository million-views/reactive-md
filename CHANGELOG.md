# Changelog

All notable changes to Reactive MD will be documented here.

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
