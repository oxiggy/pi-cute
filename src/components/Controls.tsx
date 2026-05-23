import { type ChangeEvent } from 'react';
import { usePortrait, FACE_SHAPES } from '../store/portrait';

type Props = { onExport: () => void };

export function Controls({ onExport }: Props) {
  const { face, skinTone, userImage, setFace, setSkinTone, setUserImage } = usePortrait();

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
