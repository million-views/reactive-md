# Design System Fidelity Audit

High-fidelity UI/UX work depends on the **Logical Truth** of your environment: the certainty that a component set to `375px` behaves exactly like a `375px` device, regardless of visual scaling.

> [!IMPORTANT]
> **Logical vs. Literal Truth**: 
> In a webview-based editor, there is a distinction between the **Literal Truth** (the physical size of the VS Code window) and the **Logical Truth** (the emulated size of your component). Standard `@media` queries are "Literally True" to the browser, but useless for design; they would see the whole 1920px screen. Reactive MD prioritizes **Logical Truth**, ensuring your CSS reflects the emulated device dimensions via Container Queries.

> [!TIP]
> **A Container-First Future**: Reactive MD intentionally prioritizes **Container Queries** over standard Media Queries. Because standard media queries target the entire VS Code window, this environment nudges you towards adopting container-aware CSS. This is a powerful architectural shift: your components become truly portable, responding to their immediate emulated viewport (the device) rather than a distant global window. Over time, you'll find this makes your design system significantly more resilient and easier to migrate between platforms.

This document demonstrates how to use Reactive MD to audit your design system's responsiveness and scaling fidelity.

---

## 1. The Plastic Bezel Rule
**The Concept**: Digital devices don't grow physical scrollbars. Software scrolls *inside* the screen.

In this audit, we verify that scrollbars appear inside the emulated device (The Artboard) and never on the outer frame (The Bezel).

```jsx live device=mobile zoom=none
import { ZoomDiagnostic } from './FidelityToolkit.tsx';

export default function BezelAudit() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen flex flex-col items-center gap-6">
      <ZoomDiagnostic title="Bezel Fidelity" />

      {/* Forced lateral overflow */}
      <div className="w-[600px] h-24 bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg rounded-2xl">
        600px OVERFLOW
      </div>

      <div className="h-[800px] w-full bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 font-bold">
         Long Scroll Content
      </div>
    </div>
  );
}
```

**Observation Guide**:
- Hover over the indigo bar and use your scroll wheel.
- The scrollbar MUST appear **inside** the thin border of the device.
- This ensures your components handle overflow within their emulated environment correctly.

---

## 2. Aspect-Ratio & Container Truth
**The Concept**: Components should respond to the device's logical orientation, not the computer's window size.

We use **Container Queries** (`@container`) to ensure that rotating the device triggers layout changes, while resizing the VS Code sidebar does not—maintaining isolated fidelity.

```jsx live device=mobile orientation=landscape
import { ZoomDiagnostic, OrientationIndicator } from './FidelityToolkit.tsx';

export default function RotationAudit() {
  return (
    <div className="h-[100cqh] flex flex-col items-center justify-center p-8 transition-colors duration-700 @portrait:bg-blue-50 @landscape:bg-emerald-50">
      <ZoomDiagnostic title="Rotation Truth" />
      
      <div className="mt-8 flex flex-col @landscape:flex-row items-center gap-8">
        <OrientationIndicator />

        <div className="p-6 bg-white rounded-2xl border-4 border-slate-200 @landscape:border-emerald-500 transition-all shadow-sm">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
            Border turns <span className="text-emerald-600">Emerald</span> in Landscape.
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Observation Guide**:
- Click the **Rotate** icon in the header.
- The background should turn Emerald and the box should rotate.
- **The Test**: Shrink your VS Code sidebar. The background must stay Indigo/Blue as long as the device is in Portrait, even if the panel itself becomes "landscape" shaped.

---

## 3. Visual Zoom & Pixel Integrity
**The Concept**: Scaled-down UI must maintain its logical dimensions to satisfy `@container` queries.

```jsx live device=tablet zoom=auto
import { ZoomDiagnostic } from './FidelityToolkit.tsx';

export default function ZoomAudit() {
  return (
    <div className="h-[100cqh] flex flex-col items-center justify-center p-8 bg-slate-50 border-4 border-dashed border-slate-200">
      <ZoomDiagnostic title="Scaling Sync" />

      <div className="mt-8 text-slate-400">
        <p className="text-sm font-medium italic">Adjust panel width to see scale updates.</p>
      </div>
    </div>
  );
}
```

**Observation**:
- As you resize the panel, the `Calculated Scale` in the diagnostic card will update.
- Notice that even when scaled down (e.g., `0.7500x`), the `Resolution` remains a logical `768x1024`. This is the "Logical Truth" that keeps your CSS math consistent.

---

## Conclusion: The Fidelity Advantage
By combining **Logical Truth** (stable resolution), **Plastic Bezel** (internal scrolling), and **Container-First** architecture, Reactive MD provides an environment where your prototypes aren't just "mockups"—they are technically accurate mirror-images of how your code will behave in a real browser or mobile device.

Use this toolkit to audit your design system's resilience. If it works here, it will work anywhere.


---

## 4. Sub-pixel Edge Detection
**The Concept**: 100% width must be exactly 100% width. No "1px ghost gaps."

```jsx live device=mobile orientation=landscape zoom=none
export default function EdgeCheck() {
  return (
    <div className="w-full h-[100cqh] bg-pink-600 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-white/20" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20" />
      
      <div className="w-[100cqw] h-12 bg-white flex items-center justify-center text-pink-600 font-black text-xs">
        100CQW EDGE-TO-EDGE
      </div>
    </div>
  );
}
```

**Observation**:
- The white bar should touch the left and right edges perfectly with no horizontal scrollbars within the device.
