# Changelog

All notable changes to Reactive MD will be documented here.

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
