import { type ChangeEvent } from 'react';
import {
  usePortrait,
  FACE_SHAPES,
  EYES_STYLES,
  BROWS_STYLES,
  NOSE_STYLES,
  MOUTH_STYLES,
} from '../store/portrait';

type Props = { onExport: () => void };

export function Controls({ onExport }: Props) {
  const {
    face, eyes, brows, nose, mouth, skinTone, userImage,
    setFace, setEyes, setBrows, setNose, setMouth, setSkinTone, setUserImage,
  } = usePortrait();

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUserImage(reader.result as string);
    reader.readAsDataURL(file);
  }

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
