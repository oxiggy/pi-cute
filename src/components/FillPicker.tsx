import type { LayerFill } from '../store/portrait';

type Props = {
  fill: LayerFill;
  onChange: (fill: LayerFill) => void;
  /** Show a "None" option (transparent). Default false. */
  allowNone?: boolean;
};

export function FillPicker({ fill, onChange, allowNone = false }: Props) {
  // Stable defaults so the unused branches keep their values when toggling modes.
  const solidColor = fill.type === 'solid' ? fill.color : '#888888';
  const gradFrom = fill.type === 'gradient' ? fill.from : '#bbbbbb';
  const gradTo = fill.type === 'gradient' ? fill.to : '#333333';
  const gradAngle = fill.type === 'gradient' ? fill.angle : 90;

  return (
    <div className="fill-picker">
      <div className="fill-mode" style={allowNone ? { gridTemplateColumns: '1fr 1fr 1fr' } : undefined}>
        {allowNone && (
          <button
            type="button"
            className={`shape-btn ${fill.type === 'none' ? 'active' : ''}`}
            onClick={() => onChange({ type: 'none' })}
          >
            Нет
          </button>
        )}
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

      {fill.type === 'solid' && (
        <input
          type="color"
          value={fill.color}
          onChange={(e) => onChange({ type: 'solid', color: e.target.value })}
        />
      )}

      {fill.type === 'gradient' && (() => {
        const fromStop = fill.fromStop ?? 0;
        const toStop = fill.toStop ?? 100;
        return (
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
            <div className="slider-row">
              <span>1→</span>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={fromStop}
                onChange={(e) => {
                  const v = Math.min(Number(e.target.value), toStop);
                  onChange({ ...fill, fromStop: v });
                }}
                title="Где цвет 1 ещё чистый"
              />
              <span className="slider-val">{fromStop}%</span>
            </div>
            <div className="slider-row">
              <span>→2</span>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={toStop}
                onChange={(e) => {
                  const v = Math.max(Number(e.target.value), fromStop);
                  onChange({ ...fill, toStop: v });
                }}
                title="Где цвет 2 уже чистый"
              />
              <span className="slider-val">{toStop}%</span>
            </div>
          </>
        );
      })()}
    </div>
  );
}
