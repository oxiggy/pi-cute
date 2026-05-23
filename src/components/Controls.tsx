import { type ChangeEvent } from 'react';
import {
  usePortrait,
  FACE_SHAPES,
  EYE_STYLES,
  BROW_STYLES,
  NOSE_STYLES,
  MOUTH_STYLES,
  BANGS_STYLES,
  HAIR_SIDE_STYLES,
  EAR_STYLES,
  BUILTIN_LAYERS,
  BUILTIN_LAYER_LABELS,
  DEFAULT_TRANSFORM,
  type PaintableLayerId,
} from '../store/portrait';
import { LayerSection } from './LayerSection';

type Props = { onExport: () => void };

export function Controls({ onExport }: Props) {
  const {
    face, eyeLeft, eyeRight, browLeft, browRight, nose, mouth,
    bangs, hairLeft, hairRight, earLeft, earRight,
    layerColors, customLayers, transforms, activeLayer,
    setFace, setEyeLeft, setEyeRight, setBrowLeft, setBrowRight, setNose, setMouth,
    setBangs, setHairLeft, setHairRight, setEarLeft, setEarRight,
    setLayerColor, addCustomLayer, removeCustomLayer,
    setActiveLayer, setTransform, resetTransform,
  } = usePortrait();

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => addCustomLayer(reader.result as string, file.name);
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  // Helper to bind a paintable layer's fill to LayerSection props.
  const fillProps = (id: PaintableLayerId) => ({
    fill: layerColors[id],
    onFillChange: (f: typeof layerColors[PaintableLayerId]) => setLayerColor(id, f),
  });

  const t = activeLayer ? transforms[activeLayer] ?? DEFAULT_TRANSFORM : null;

  return (
    <aside className="controls">
      <LayerSection title="Лицо" {...fillProps('face')}>
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
      </LayerSection>

      <LayerSection title="Чёлка" {...fillProps('bangs')}>
        <div className="shape-grid">
          {BANGS_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${bangs === s.id ? 'active' : ''}`}
              onClick={() => setBangs(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Волосы (лев)" {...fillProps('hairLeft')}>
        <div className="shape-grid">
          {HAIR_SIDE_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${hairLeft === s.id ? 'active' : ''}`}
              onClick={() => setHairLeft(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Волосы (прав)" {...fillProps('hairRight')}>
        <div className="shape-grid">
          {HAIR_SIDE_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${hairRight === s.id ? 'active' : ''}`}
              onClick={() => setHairRight(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Левое ухо" {...fillProps('earLeft')}>
        <div className="shape-grid">
          {EAR_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${earLeft === s.id ? 'active' : ''}`}
              onClick={() => setEarLeft(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Правое ухо" {...fillProps('earRight')}>
        <div className="shape-grid">
          {EAR_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${earRight === s.id ? 'active' : ''}`}
              onClick={() => setEarRight(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Левый глаз" {...fillProps('eyeLeft')}>
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
      </LayerSection>

      <LayerSection title="Правый глаз" {...fillProps('eyeRight')}>
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
      </LayerSection>

      <LayerSection title="Левая бровь" {...fillProps('browLeft')}>
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
      </LayerSection>

      <LayerSection title="Правая бровь" {...fillProps('browRight')}>
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
      </LayerSection>

      <LayerSection title="Нос" {...fillProps('nose')}>
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
      </LayerSection>

      <LayerSection title="Рот" {...fillProps('mouth')}>
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
      </LayerSection>

      <LayerSection title="Кастомные слои">
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
      </LayerSection>

      <LayerSection title="Выбранный слой">
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
            Кликни по слою на портрете или выбери из списка:
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
      </LayerSection>

      <button className="btn" onClick={onExport}>
        Скачать PNG
      </button>
    </aside>
  );
}
