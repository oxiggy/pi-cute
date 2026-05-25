/** CSS rules required for the layer-paint system. Must be inlined into the
 *  exported SVG because external stylesheets don't load when an SVG is rendered
 *  inside an <img>. Kept in sync with the rules in src/styles.css. */
const INLINED_PAINT_CSS = `
  .layer-paint { --layer-fill: currentColor; }
  .layer-paint *[fill]:not([fill="none"]) { fill: var(--layer-fill); }
  .layer-paint *[stroke]:not([stroke="none"]) { stroke: var(--layer-fill); }
`;

export async function exportSvgToPng(svg: SVGSVGElement, size = 512): Promise<Blob> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  // Inline the paint CSS so the standalone SVG renders identically to the live preview.
  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = INLINED_PAINT_CSS;
  clone.insertBefore(styleEl, clone.firstChild);

  const xml = new XMLSerializer().serializeToString(clone);
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
