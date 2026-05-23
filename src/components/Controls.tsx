import { type ChangeEvent } from 'react';
import {
  usePortrait,
  FACE_SHAPES,
  EYE_STYLES,
  BROW_STYLES,
  NOSE_STYLES,
  MOUTH_STYLES,
  HAIR_STYLES,
  BUILTIN_LAYERS,
  BUILTIN_LAYER_LABELS,
  DEFAULT_TRANSFORM,
} from '../store/portrait';

type Props = { onExport: () => void };

export function Controls({ onExport }: Props) {
  const {
    face, eyeLeft, eyeRight, browLeft, browRight, nose, mouth, hair, hairFill, skinTone,
    customLayers, transforms, activeLayer,
    setFace, setEyeLeft, setEyeRight, setBrowLeft, setBrowRight, setNose, setMouth, setHair, setHairFill,
    setSkinTone, addCustomLayer, removeCustomLayer,
    setActiveLayer, setTransform, resetTransform,
  } = usePortrait();

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      addCustomLayer(reader.result as string, file.name);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  const solidColor = hairFill.type === 'solid' ? hairFill.color : '#4a3020';
  const gradFrom = hairFill.type === 'gradient' ? hairFill.from : '#7a4a2a';
  const gradTo = hairFill.type === 'gradient' ? hairFill.to : '#2a1810';

  const t = activeLayer ? transforms[activeLayer] ?? DEFAULT_TRANSFORM : null;

  return (
    <aside className="controls">
      <div className="control-group">
        <label>Форма лица</label>
        <div className="shape-grid">
          {FACE_SHAPES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${face === s.id ? 'active' : ''}`}
              onClick={() => setFace(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Причёска</label>
        <div className="shape-grid">
          {HAIR_STYLES.map((s) => (
            <button
              key={s.id}
              data-hair={s.id}
              className={`shape-btn ${hair === s.id ? 'active' : ''}`}
              onClick={() => setHair(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Цвет волос</label>
        <div className="shape-grid">
          <button
            className={`shape-btn ${hairFill.type === 'solid' ? 'active' : ''}`}
            onClick={() => setHairFill({ type: 'solid', color: solidColor })}
          >
            Заливка
          </button>
          <button
            className={`shape-btn ${hairFill.type === 'gradient' ? 'active' : ''}`}
            onClick={() => setHairFill({ type: 'gradient', from: gradFrom, to: gradTo })}
          >
            Градиент
          </button>
        </div>
        {hairFill.type === 'solid' ? (
          <input
            type="color"
            value={hairFill.color}
            onChange={(e) => setHairFill({ type: 'solid', color: e.target.value })}
          />
        ) : (
          <div className="grad-pickers">
            <input
              type="color"
              value={hairFill.from}
              onChange={(e) => setHairFill({ type: 'gradient', from: e.target.value, to: hairFill.to })}
              title="Верх"
            />
            <input
              type="color"
              value={hairFill.to}
              onChange={(e) => setHairFill({ type: 'gradient', from: hairFill.from, to: e.target.value })}
              title="Низ"
            />
          </div>
        )}
      </div>

      <div className="control-group">
        <label>Левый глаз</label>
        <div className="shape-grid">
          {EYE_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${eyeLeft === s.id ? 'active' : ''}`}
              onClick={() => setEyeLeft(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Правый глаз</label>
        <div className="shape-grid">
          {EYE_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${eyeRight === s.id ? 'active' : ''}`}
              onClick={() => setEyeRight(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Левая бровь</label>
        <div className="shape-grid">
          {BROW_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${browLeft === s.id ? 'active' : ''}`}
              onClick={() => setBrowLeft(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Правая бровь</label>
        <div className="shape-grid">
          {BROW_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${browRight === s.id ? 'active' : ''}`}
              onClick={() => setBrowRight(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Нос</label>
        <div className="shape-grid">
          {NOSE_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${nose === s.id ? 'active' : ''}`}
              onClick={() => setNose(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Рот</label>
        <div className="shape-grid">
          {MOUTH_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${mouth === s.id ? 'active' : ''}`}
              onClick={() => setMouth(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Цвет кожи</label>
        <input
          type="color"
          value={skinTone}
          onChange={(e) => setSkinTone(e.target.value)}
        />
      </div>

      <div className="control-group">
        <label>Кастомные слои</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {customLayers.length > 0 && (
          <ul className="custom-layers">
            {customLayers.map((layer) => (
              <li
                key={layer.id}
                className={activeLayer === layer.id ? 'active' : ''}
                onClick={() => setActiveLayer(layer.id)}
              >
                <span className="layer-name">{layer.name}</span>
                <button
                  className="icon-btn"
                  onClick={(e) => { e.stopPropagation(); removeCustomLayer(layer.id); }}
                  title="Удалить"
                >×</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="control-group">
        <label>Выбранный слой</label>
        {activeLayer && t ? (
          <>
            <div className="active-layer-name">
              {(BUILTIN_LAYER_LABELS as Record<string, string>)[activeLayer] ??
                customLayers.find((l) => l.id === activeLayer)?.name ??
                activeLayer}
            </div>
            <div className="slider-row">
              <span>X</span>
              <input
                type="range" min={-60} max={60} step={0.5} value={t.x}
                onChange={(e) => setTransform(activeLayer, { x: Number(e.target.value) })}
              />
              <span className="slider-val">{t.x.toFixed(1)}</span>
            </div>
            <div className="slider-row">
              <span>Y</span>
              <input
                type="range" min={-60} max={60} step={0.5} value={t.y}
                onChange={(e) => setTransform(activeLayer, { y: Number(e.target.value) })}
              />
              <span className="slider-val">{t.y.toFixed(1)}</span>
            </div>
            <div className="slider-row">
              <span>S</span>
              <input
                type="range" min={0.2} max={3} step={0.05} value={t.scale}
                onChange={(e) => setTransform(activeLayer, { scale: Number(e.target.value) })}
              />
              <span className="slider-val">{t.scale.toFixed(2)}</span>
            </div>
            <div className="slider-row">
              <span>R</span>
              <input
                type="range" min={-180} max={180} step={1} value={t.rotation}
                onChange={(e) => setTransform(activeLayer, { rotation: Number(e.target.value) })}
              />
              <span className="slider-val">{t.rotation}°</span>
            </div>
            <button className="shape-btn" onClick={() => resetTransform(activeLayer)}>
              Сбросить
            </button>
          </>
        ) : (
          <div className="hint">
            Кликни по слою на портрете или выбери из списка ниже:
            <div className="shape-grid" style={{ marginTop: 8 }}>
              {BUILTIN_LAYERS.map((id) => (
                <button
                  key={id}
                  className="shape-btn"
                  onClick={() => setActiveLayer(id)}
                >
                  {BUILTIN_LAYER_LABELS[id]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className="btn" onClick={onExport}>
        Скачать PNG
      </button>
    </aside>
  );
}
