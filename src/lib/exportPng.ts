/** CSS rules required for the layer-paint system. Must be inlined into the
 *  exported SVG because external stylesheets don't load when the SVG is opened
 *  standalone or rendered inside an <img>. Kept in sync with src/styles.css. */
const INLINED_PAINT_CSS = `
  .layer-paint { --layer-fill: currentColor; }
  .layer-paint *[fill]:not([fill="none"]) { fill: var(--layer-fill); }
  .layer-paint *[stroke]:not([stroke="none"]) { stroke: var(--layer-fill); }
`;

/** Produces a standalone SVG string from the live portrait `<svg>` element,
 *  with the paint CSS inlined so it renders identically outside the app. */
function serializeStandaloneSvg(svg: SVGSVGElement): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = INLINED_PAINT_CSS;
  clone.insertBefore(styleEl, clone.firstChild);

  return new XMLSerializer().serializeToString(clone);
}

/** Save the portrait as a standalone SVG (vector, scalable, editable). */
export function exportSvgToSvgBlob(svg: SVGSVGElement): Blob {
  const xml = serializeStandaloneSvg(svg);
  return new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
}

/** Save the portrait as a rasterized PNG of `size`×`size`. */
export async function exportSvgToPng(svg: SVGSVGElement, size = 512): Promise<Blob> {
  const xml = serializeStandaloneSvg(svg);
  const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, size, size);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png');
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
