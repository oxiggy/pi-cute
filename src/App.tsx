import { useRef } from 'react';
import { Portrait } from './components/Portrait';
import { Controls } from './components/Controls';
import { exportSvgToPng, downloadBlob } from './lib/exportPng';

export function App() {
  const svgRef = useRef<SVGSVGElement>(null);

  async function handleExport() {
    if (!svgRef.current) return;
    const blob = await exportSvgToPng(svgRef.current, 512);
    downloadBlob(blob, 'portrait.png');
  }

  return (
    <div className="app">
      <div className="stage">
        <Portrait ref={svgRef} />
      </div>
      <Controls onExport={handleExport} />
    </div>
  );
}
