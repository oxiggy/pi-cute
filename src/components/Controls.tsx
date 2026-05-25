import { useEffect, type ChangeEvent } from 'react';
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
  HORN_STYLES,
  HAIR_ACCESSORY_STYLES,
  MAKEUP_STYLES,
  BEARD_STYLES,
  BUILTIN_LAYERS,
  BUILTIN_LAYER_LABELS,
  DEFAULT_TRANSFORM,
  type PaintableLayerId,
} from '../store/portrait';
import { LayerSection } from './LayerSection';

type Props = {
  onExportPng: () => void;
  onExportSvg: () => void;
};

export function Controls({ onExportPng, onExportSvg }: Props) {
  const {
    face, eyeLeft, eyeRight, browLeft, browRight, nose, mouth,
    bangs, hairLeft, hairRight, earLeft, earRight,
    hornLeft, hornRight, hairAccessory, makeup, beard,
    layerColors, customLayers, transforms, activeLayer,
    setFace, setEyeLeft, setEyeRight, setBrowLeft, setBrowRight, setNose, setMouth,
    setBangs, setHairLeft, setHairRight, setEarLeft, setEarRight,
    setHornLeft, setHornRight, setHairAccessory, setMakeup, setBeard,
    setLayerColor, addCustomLayer, removeCustomLayer,
    setActiveLayer, setTransform, resetTransform,
    layerOrder, moveLayerUp, moveLayerDown,
    autoScrollToActive, setAutoScrollToActive,
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

  // When a layer becomes active, scroll its section into view and auto-expand it.
  useEffect(() => {
    if (!activeLayer || !autoScrollToActive) return;
    const aside = document.querySelector('.controls') as HTMLElement | null;
    const el = document.querySelector(
      `.layer-section[data-layer-id="${activeLayer}"]`,
    ) as HTMLElement | null;
    if (!aside || !el) return;
    if (!el.classList.contains('is-open')) {
      (el.querySelector('.layer-header') as HTMLButtonElement | null)?.click();
    }
    // Wait one frame so any layout caused by auto-expand has settled, then scroll
    // the section to just below the sticky header (its height is dynamic).
    requestAnimationFrame(() => {
      const sticky = aside.querySelector('.layer-section.is-sticky') as HTMLElement | null;
      const stickyH = sticky?.offsetHeight ?? 0;
      const target = el.offsetTop - aside.offsetTop - stickyH - 8;
      aside.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' });
    });
  }, [activeLayer, autoScrollToActive]);

  return (
    <aside className="controls">
      <LayerSection title="Выбранный слой" sticky highlight={!!activeLayer}>
        {activeLayer && t ? (
          <>
            <div className="active-layer-name">
              {(BUILTIN_LAYER_LABELS as Record<string, string>)[activeLayer] ??
                customLayers.find((l) => l.id === activeLayer)?.name ??
                activeLayer}
            </div>

            {(() => {
              const idx = layerOrder.indexOf(activeLayer);
              const total = layerOrder.length;
              return (
                <div className="zorder-row">
                  <span className="zorder-label">
                    Слой {idx >= 0 ? idx + 1 : '?'} / {total}
                  </span>
                  <button
                    className="shape-btn"
                    onClick={() => moveLayerDown(activeLayer)}
                    disabled={idx <= 0}
                    title="Опустить (за другие)"
                  >↓</button>
                  <button
                    className="shape-btn"
                    onClick={() => moveLayerUp(activeLayer)}
                    disabled={idx < 0 || idx >= total - 1}
                    title="Поднять (над другими)"
                  >↑</button>
                </div>
              );
            })()}
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
            <div className="action-row">
              <button className="shape-btn" onClick={() => resetTransform(activeLayer)}>
                Сбросить
              </button>
              <button className="shape-btn" onClick={() => setActiveLayer(null)}>
                Снять выделение
              </button>
            </div>
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

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={autoScrollToActive}
            onChange={(e) => setAutoScrollToActive(e.target.checked)}
          />
          <span>Скроллить до выбранного слоя</span>
        </label>
      </LayerSection>

      <LayerSection title="Лицо" layerId="face" {...fillProps('face')}>
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

      <LayerSection title="Чёлка" layerId="bangs" {...fillProps('bangs')}>
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

      <LayerSection title="Волосы (лев)" layerId="hairLeft" {...fillProps('hairLeft')}>
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

      <LayerSection title="Волосы (прав)" layerId="hairRight" {...fillProps('hairRight')}>
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

      <LayerSection title="Левое ухо" layerId="earLeft" {...fillProps('earLeft')}>
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

      <LayerSection title="Правое ухо" layerId="earRight" {...fillProps('earRight')}>
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

      <LayerSection title="Левый рог" layerId="hornLeft" {...fillProps('hornLeft')}>
        <div className="shape-grid">
          {HORN_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${hornLeft === s.id ? 'active' : ''}`}
              onClick={() => setHornLeft(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Правый рог" layerId="hornRight" {...fillProps('hornRight')}>
        <div className="shape-grid">
          {HORN_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${hornRight === s.id ? 'active' : ''}`}
              onClick={() => setHornRight(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Аксессуар прически" layerId="hairAccessory" {...fillProps('hairAccessory')}>
        <div className="shape-grid">
          {HAIR_ACCESSORY_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${hairAccessory === s.id ? 'active' : ''}`}
              onClick={() => setHairAccessory(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Макияж" layerId="makeup" {...fillProps('makeup')}>
        <div className="shape-grid">
          {MAKEUP_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${makeup === s.id ? 'active' : ''}`}
              onClick={() => setMakeup(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Борода" layerId="beard" {...fillProps('beard')}>
        <div className="shape-grid">
          {BEARD_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${beard === s.id ? 'active' : ''}`}
              onClick={() => setBeard(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </LayerSection>

      <LayerSection title="Левый глаз" layerId="eyeLeft" {...fillProps('eyeLeft')}>
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

      <LayerSection title="Правый глаз" layerId="eyeRight" {...fillProps('eyeRight')}>
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

      <LayerSection title="Левая бровь" layerId="browLeft" {...fillProps('browLeft')}>
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

      <LayerSection title="Правая бровь" layerId="browRight" {...fillProps('browRight')}>
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

      <LayerSection title="Нос" layerId="nose" {...fillProps('nose')}>
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

      <LayerSection title="Рот" layerId="mouth" {...fillProps('mouth')}>
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

      <LayerSection title="Фон" {...fillProps('background')} allowNoneFill />

      <div className="export-row">
        <button className="btn" onClick={onExportPng}>
          Скачать PNG
        </button>
        <button className="btn btn-secondary" onClick={onExportSvg}>
          Скачать SVG
        </button>
      </div>
    </aside>
  );
}
