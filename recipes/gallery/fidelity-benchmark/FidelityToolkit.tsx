import React, { useState, useEffect } from 'react';

/**
 * FidelityToolkit: A high-fidelity diagnostic suite for design system auditing.
 * 
 * This toolkit demonstrates how to verify "Logical Truth" in Reactive MD by
 * comparing the Logical Intent (requested via DSL) against the 
 * Experienced Reality (measured in the browser).
 *
 * It uses the public DOM contract provided by the ViewportFrame to read
 * metadata without relying on extension-internal globals.
 */

/**
 * ZoomDiagnostic: Displays resolution and scale diagnostics.
 */
export function ZoomDiagnostic({ title = 'Fidelity Audit' }) {
  const [experienced, setExperienced] = useState({ width: 0, height: 0 });
  const [intent, setIntent] = useState({ width: 0, height: 0, zoom: 'unknown', orientation: 'unknown', label: 'unknown' });
  const rootRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const update = () => {
      const bezel = el.closest('.physical-viewport') as HTMLElement;
      const scroller = el.closest('.canvas-scroller') as HTMLElement;

      if (bezel && scroller) {
        const style = getComputedStyle(bezel);
        const rect = bezel.getBoundingClientRect();

        setIntent({
          width: parseInt(style.getPropertyValue('--logical-width')) || 0,
          height: parseInt(style.getPropertyValue('--logical-height')) || 0,
          zoom: scroller.getAttribute('data-zoom-mode') || 'unknown',
          orientation: bezel.getAttribute('data-orientation') || 'unknown',
          label: bezel.getAttribute('data-device-label') || 'unknown'
        });

        setExperienced({
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        });
      }
      frameId = requestAnimationFrame(update);
    };

    let frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const scale = intent.width > 0 ? experienced.width / intent.width : 1.0;

  const rowStyle = "flex justify-between border-b border-slate-100 py-1 last:border-0";
  const labelStyle = "text-[10px] font-bold text-slate-400 uppercase tracking-tighter";
  const valueStyle = "text-[10px] font-mono text-slate-600";

  return (
    <div ref={rootRef} className="bg-white/95 backdrop-blur-md border-2 border-slate-200 rounded-xl p-4 shadow-xl w-full max-w-sm pointer-events-none select-none my-4">
      <div className="flex items-center gap-2 mb-3 border-b-2 border-slate-100 pb-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">{title}</h3>
      </div>

      <div className="space-y-1">
        <div className="text-[9px] font-black text-indigo-500 mb-1 truncate">
          LOGICAL TRUTH ({intent.label}, {intent.orientation})
        </div>
        <div className={rowStyle}>
          <span className={labelStyle}>Resolution</span>
          <span className={valueStyle}>{intent.width}x{intent.height}</span>
        </div>
        <div className={rowStyle}>
          <span className={labelStyle}>Zoom Mode</span>
          <span className={valueStyle}>{intent.zoom}</span>
        </div>

        <div className="text-[9px] font-black text-emerald-500 mt-3 mb-1">EXPERIENCED REALITY</div>
        <div className={rowStyle}>
          <span className={labelStyle}>Artboard Size</span>
          <span className={valueStyle}>{experienced.width}x{experienced.height}</span>
        </div>
        <div className={rowStyle}>
          <span className={labelStyle}>Calculated Scale</span>
          <span className={`text-[10px] font-mono font-bold ${scale > 1.01 ? 'text-orange-500' : scale < 0.99 ? 'text-blue-500' : 'text-emerald-600'}`}>
            {scale.toFixed(4)}x
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * OrientationIndicator: Visualizes Container Query detection for rotation.
 */
export function OrientationIndicator() {
  return (
    <div className="w-24 h-24 rounded-2xl bg-slate-900 shadow-2xl flex items-center justify-center transition-all duration-700
                    @portrait:scale-90 @landscape:scale-110 group">
      <div className="relative w-12 h-8 border-2 border-white/30 rounded-md transition-all duration-700
                      @portrait:rotate-90 @landscape:rotate-0">
        <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/50" />
      </div>
    </div>
  );
}
