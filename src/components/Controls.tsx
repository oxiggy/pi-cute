import { type ChangeEvent } from 'react';
import {
  usePortrait,
  FACE_SHAPES,
  EYES_STYLES,
  BROWS_STYLES,
  NOSE_STYLES,
  MOUTH_STYLES,
  HAIR_STYLES,
} from '../store/portrait';

type Props = { onExport: () => void };

export function Controls({ onExport }: Props) {
  const {
    face, eyes, brows, nose, mouth, hair, hairFill, skinTone, userImage,
    setFace, setEyes, setBrows, setNose, setMouth, setHair, setHairFill,
    setSkinTone, setUserImage,
  } = usePortrait();

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUserImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  // For the gradient pickers we keep stable defaults when toggling modes.
  const solidColor = hairFill.type === 'solid' ? hairFill.color : '#4a3020';
  const gradFrom = hairFill.type === 'gradient' ? hairFill.from : '#7a4a2a';
  const gradTo = hairFill.type === 'gradient' ? hairFill.to : '#2a1810';

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
        <label>Глаза</label>
        <div className="shape-grid">
          {EYES_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${eyes === s.id ? 'active' : ''}`}
              onClick={() => setEyes(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Брови</label>
        <div className="shape-grid">
          {BROWS_STYLES.map((s) => (
            <button
              key={s.id}
              className={`shape-btn ${brows === s.id ? 'active' : ''}`}
              onClick={() => setBrows(s.id)}
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
        <label>Своя картинка</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {userImage && (
          <button className="shape-btn" onClick={() => setUserImage(null)}>
            Убрать
          </button>
        )}
      </div>

      <button className="btn" onClick={onExport}>
        Скачать PNG
      </button>
    </aside>
  );
}
