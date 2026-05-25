import { useRef } from 'react';
import { Portrait } from './components/Portrait';
import { Controls } from './components/Controls';
import { exportSvgToPng, exportSvgToSvgBlob, downloadBlob } from './lib/exportPng';

export function App() {
  const svgRef = useRef<SVGSVGElement>(null);

  async function handleExportPng() {
    if (!svgRef.current) return;
    const blob = await exportSvgToPng(svgRef.current, 512);
    downloadBlob(blob, 'portrait.png');
  }

  function handleExportSvg() {
    if (!svgRef.current) return;
    const blob = exportSvgToSvgBlob(svgRef.current);
    downloadBlob(blob, 'portrait.svg');
  }

  return (
    <div className="app">
      <div className="stage">
        <Portrait ref={svgRef} />
      </div>
      <Controls onExportPng={handleExportPng} onExportSvg={handleExportSvg} />
    </div>
  );
}
