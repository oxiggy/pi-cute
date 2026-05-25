import { useState, type ReactNode } from 'react';
import type { LayerFill } from '../store/portrait';
import { FillPicker } from './FillPicker';

type Props = {
  title: string;
  defaultOpen?: boolean;
  sticky?: boolean;
  highlight?: boolean;
  fill?: LayerFill;
  onFillChange?: (fill: LayerFill) => void;
  allowNoneFill?: boolean;
  /** Optional layer id — exposed as `data-layer-id` so Controls can scroll to it. */
  layerId?: string;
  children?: ReactNode;
};

export function LayerSection({
  title,
  defaultOpen = false,
  sticky = false,
  highlight = false,
  fill,
  onFillChange,
  allowNoneFill = false,
  layerId,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      data-layer-id={layerId}
      className={`layer-section ${open ? 'is-open' : 'is-closed'} ${sticky ? 'is-sticky' : ''} ${highlight ? 'is-highlighted' : ''}`}
    >
      <button
        type="button"
        className="layer-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="layer-title">{title}</span>
        <span className="layer-chevron" aria-hidden>
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open && (
        <div className="layer-body">
          {fill !== undefined && onFillChange && (
            <FillPicker fill={fill} onChange={onFillChange} allowNone={allowNoneFill} />
          )}
          {children}
        </div>
      )}
    </div>
  );
}
