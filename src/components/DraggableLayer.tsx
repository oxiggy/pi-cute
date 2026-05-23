import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react';
import { usePortrait, transformToString, DEFAULT_TRANSFORM } from '../store/portrait';

type Props = {
  id: string;
  svgRef: RefObject<SVGSVGElement>;
  children: ReactNode;
  /** External style applied to the inner content group (e.g. for --hair-fill, color). */
  contentStyle?: React.CSSProperties;
};

export function DraggableLayer({ id, svgRef, children, contentStyle }: Props) {
  const transform = usePortrait((s) => s.transforms[id]);
  const isActive = usePortrait((s) => s.activeLayer === id);
  const setActiveLayer = usePortrait((s) => s.setActiveLayer);
  const setTransform = usePortrait((s) => s.setTransform);

  const contentRef = useRef<SVGGElement>(null);
  const [bbox, setBbox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    try {
      const b = contentRef.current.getBBox();
      if (b.width > 0 && b.height > 0) {
        setBbox({ x: b.x, y: b.y, w: b.width, h: b.height });
      } else {
        setBbox(null);
      }
    } catch {
      setBbox(null);
    }
  }, [children]);

  function onPointerDown(e: ReactPointerEvent<SVGGElement>) {
    e.stopPropagation();
    setActiveLayer(id);

    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const start = transform ?? DEFAULT_TRANSFORM;
    const startClientX = e.clientX;
    const startClientY = e.clientY;

    function toViewX(px: number) {
      return (px / rect.width) * 128;
    }
    function toViewY(px: number) {
      return (px / rect.height) * 128;
    }

    function onMove(ev: PointerEvent) {
      const dx = toViewX(ev.clientX - startClientX);
      const dy = toViewY(ev.clientY - startClientY);
      setTransform(id, { x: start.x + dx, y: start.y + dy });
    }

    function onUp() {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  return (
    <g
      transform={transformToString(transform)}
      onPointerDown={onPointerDown}
      style={{ cursor: 'move' }}
    >
      <g ref={contentRef} style={contentStyle}>
        {children}
      </g>
      {isActive && bbox && (
        <rect
          x={bbox.x - 2}
          y={bbox.y - 2}
          width={bbox.w + 4}
          height={bbox.h + 4}
          fill="none"
          stroke="#7a5cff"
          strokeWidth={0.8}
          strokeDasharray="3 2"
          pointerEvents="none"
        />
      )}
    </g>
  );
}
