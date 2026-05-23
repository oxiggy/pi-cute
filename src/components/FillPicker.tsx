import type { LayerFill } from '../store/portrait';

type Props = {
  fill: LayerFill;
  onChange: (fill: LayerFill) => void;
};

export function FillPicker({ fill, onChange }: Props) {
  // Stable defaults so the unused side keeps its values when toggling modes.
  const solidColor = fill.type === 'solid' ? fill.color : '#888888';
  const gradFrom = fill.type === 'gradient' ? fill.from : '#bbbbbb';
  const gradTo = fill.type === 'gradient' ? fill.to : '#333333';
  const gradAngle = fill.type === 'gradient' ? fill.angle : 90;

  return (
    <div className="fill-picker">
      <div className="fill-mode">
        <button
          type="button"
          className={`shape-btn ${fill.type === 'solid' ? 'active' : ''}`}
          onClick={() => onChange({ type: 'solid', color: solidColor })}
        >
          Заливка
        </button>
        <button
          type="button"
          className={`shape-btn ${fill.type === 'gradient' ? 'active' : ''}`}
          onClick={() => onChange({ type: 'gradient', from: gradFrom, to: gradTo, angle: gradAngle })}
        >
          Градиент
        </button>
      </div>

      {fill.type === 'solid' ? (
        <input
          type="color"
          value={fill.color}
          onChange={(e) => onChange({ type: 'solid', color: e.target.value })}
        />
      ) : (
        <>
          <div className="grad-pickers">
            <input
              type="color"
              value={fill.from}
              onChange={(e) => onChange({ ...fill, from: e.target.value })}
              title="Цвет 1"
            />
            <input
              type="color"
              value={fill.to}
              onChange={(e) => onChange({ ...fill, to: e.target.value })}
              title="Цвет 2"
            />
          </div>
          <div className="slider-row">
            <span>∠</span>
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              value={fill.angle}
              onChange={(e) => onChange({ ...fill, angle: Number(e.target.value) })}
            />
            <span className="slider-val">{fill.angle}°</span>
          </div>
        </>
      )}
    </div>
  );
}
