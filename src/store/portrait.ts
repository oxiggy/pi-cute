import { create } from 'zustand';

export type FaceShape = 'round' | 'oval' | 'square' | 'long';
export type EyesStyle = 'none' | 'dots' | 'smile' | 'wink' | 'angry';
export type BrowsStyle = 'none' | 'flat' | 'raised' | 'angry' | 'sad';
export type NoseStyle = 'none' | 'dot' | 'curve';
export type MouthStyle = 'none' | 'smile' | 'dot' | 'open' | 'flat';
export type HairStyle = 'none' | 'short' | 'bob' | 'long' | 'ponytail';

export type HairFill =
  | { type: 'solid'; color: string }
  | { type: 'gradient'; from: string; to: string };

export type TransformableLayer = 'hair' | 'eyes' | 'brows' | 'nose' | 'mouth' | 'userImage';

export type LayerTransform = { x: number; y: number; scale: number; rotation: number };

export const DEFAULT_TRANSFORM: LayerTransform = { x: 0, y: 0, scale: 1, rotation: 0 };

export const LAYER_LABELS: { id: TransformableLayer; label: string }[] = [
  { id: 'hair', label: 'Волосы' },
  { id: 'eyes', label: 'Глаза' },
  { id: 'brows', label: 'Брови' },
  { id: 'nose', label: 'Нос' },
  { id: 'mouth', label: 'Рот' },
  { id: 'userImage', label: 'Картинка' },
];

export const FACE_SHAPES: { id: FaceShape; label: string }[] = [
  { id: 'round', label: 'Round' },
  { id: 'oval', label: 'Oval' },
  { id: 'square', label: 'Square' },
  { id: 'long', label: 'Long' },
];

export const EYES_STYLES: { id: EyesStyle; label: string }[] = [
  { id: 'dots', label: 'Dots' },
  { id: 'smile', label: 'Smile' },
  { id: 'wink', label: 'Wink' },
  { id: 'angry', label: 'Angry' },
  { id: 'none', label: 'None' },
];

export const BROWS_STYLES: { id: BrowsStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'flat', label: 'Flat' },
  { id: 'raised', label: 'Raised' },
  { id: 'angry', label: 'Angry' },
  { id: 'sad', label: 'Sad' },
];

export const NOSE_STYLES: { id: NoseStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'dot', label: 'Dot' },
  { id: 'curve', label: 'Curve' },
];

export const MOUTH_STYLES: { id: MouthStyle; label: string }[] = [
  { id: 'smile', label: 'Smile' },
  { id: 'dot', label: 'Dot' },
  { id: 'open', label: 'Open' },
  { id: 'flat', label: 'Flat' },
  { id: 'none', label: 'None' },
];

export const HAIR_STYLES: { id: HairStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'short', label: 'Short' },
  { id: 'bob', label: 'Bob' },
  { id: 'long', label: 'Long' },
  { id: 'ponytail', label: 'Ponytail' },
];

type Transforms = Record<TransformableLayer, LayerTransform>;

const initialTransforms: Transforms = {
  hair: { ...DEFAULT_TRANSFORM },
  eyes: { ...DEFAULT_TRANSFORM },
  brows: { ...DEFAULT_TRANSFORM },
  nose: { ...DEFAULT_TRANSFORM },
  mouth: { ...DEFAULT_TRANSFORM },
  userImage: { ...DEFAULT_TRANSFORM },
};

type PortraitState = {
  face: FaceShape;
  eyes: EyesStyle;
  brows: BrowsStyle;
  nose: NoseStyle;
  mouth: MouthStyle;
  hair: HairStyle;
  hairFill: HairFill;
  skinTone: string;
  userImage: string | null;
  transforms: Transforms;
  setFace: (face: FaceShape) => void;
  setEyes: (eyes: EyesStyle) => void;
  setBrows: (brows: BrowsStyle) => void;
  setNose: (nose: NoseStyle) => void;
  setMouth: (mouth: MouthStyle) => void;
  setHair: (hair: HairStyle) => void;
  setHairFill: (fill: HairFill) => void;
  setSkinTone: (color: string) => void;
  setUserImage: (dataUrl: string | null) => void;
  setTransform: (layer: TransformableLayer, patch: Partial<LayerTransform>) => void;
  resetTransform: (layer: TransformableLayer) => void;
};

export const usePortrait = create<PortraitState>((set) => ({
  face: 'round',
  eyes: 'dots',
  brows: 'none',
  nose: 'none',
  mouth: 'smile',
  hair: 'short',
  hairFill: { type: 'solid', color: '#4a3020' },
  skinTone: '#f0c8a0',
  userImage: null,
  transforms: initialTransforms,
  setFace: (face) => set({ face }),
  setEyes: (eyes) => set({ eyes }),
  setBrows: (brows) => set({ brows }),
  setNose: (nose) => set({ nose }),
  setMouth: (mouth) => set({ mouth }),
  setHair: (hair) => set({ hair }),
  setHairFill: (hairFill) => set({ hairFill }),
  setSkinTone: (skinTone) => set({ skinTone }),
  setUserImage: (userImage) => set({ userImage }),
  setTransform: (layer, patch) =>
    set((s) => ({
      transforms: { ...s.transforms, [layer]: { ...s.transforms[layer], ...patch } },
    })),
  resetTransform: (layer) =>
    set((s) => ({
      transforms: { ...s.transforms, [layer]: { ...DEFAULT_TRANSFORM } },
    })),
}));

export function transformToString(t: LayerTransform): string {
  const cx = 64;
  const cy = 64;
  // Translate to center, apply rotate+scale, translate back, then apply user offset.
  return `translate(${cx + t.x} ${cy + t.y}) rotate(${t.rotation}) scale(${t.scale}) translate(${-cx} ${-cy})`;
}
