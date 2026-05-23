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

export type LayerTransform = { x: number; y: number; scale: number; rotation: number };

export const DEFAULT_TRANSFORM: LayerTransform = { x: 0, y: 0, scale: 1, rotation: 0 };

export type CustomLayer = {
  id: string;
  type: 'image';
  src: string;
  name: string;
};

export const BUILTIN_LAYERS = ['hair', 'eyes', 'brows', 'nose', 'mouth'] as const;
export type BuiltinLayerId = (typeof BUILTIN_LAYERS)[number];

export const BUILTIN_LAYER_LABELS: Record<BuiltinLayerId, string> = {
  hair: 'Волосы',
  eyes: 'Глаза',
  brows: 'Брови',
  nose: 'Нос',
  mouth: 'Рот',
};

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

type PortraitState = {
  face: FaceShape;
  eyes: EyesStyle;
  brows: BrowsStyle;
  nose: NoseStyle;
  mouth: MouthStyle;
  hair: HairStyle;
  hairFill: HairFill;
  skinTone: string;
  customLayers: CustomLayer[];
  transforms: Record<string, LayerTransform>;
  activeLayer: string | null;
  setFace: (face: FaceShape) => void;
  setEyes: (eyes: EyesStyle) => void;
  setBrows: (brows: BrowsStyle) => void;
  setNose: (nose: NoseStyle) => void;
  setMouth: (mouth: MouthStyle) => void;
  setHair: (hair: HairStyle) => void;
  setHairFill: (fill: HairFill) => void;
  setSkinTone: (color: string) => void;
  addCustomLayer: (src: string, name: string) => string;
  removeCustomLayer: (id: string) => void;
  setActiveLayer: (id: string | null) => void;
  setTransform: (id: string, patch: Partial<LayerTransform>) => void;
  resetTransform: (id: string) => void;
};

let customCounter = 0;

export const usePortrait = create<PortraitState>((set) => ({
  face: 'round',
  eyes: 'dots',
  brows: 'none',
  nose: 'none',
  mouth: 'smile',
  hair: 'short',
  hairFill: { type: 'solid', color: '#4a3020' },
  skinTone: '#f0c8a0',
  customLayers: [],
  transforms: {
    hair: { ...DEFAULT_TRANSFORM },
    eyes: { ...DEFAULT_TRANSFORM },
    brows: { ...DEFAULT_TRANSFORM },
    nose: { ...DEFAULT_TRANSFORM },
    mouth: { ...DEFAULT_TRANSFORM },
  },
  activeLayer: null,
  setFace: (face) => set({ face }),
  setEyes: (eyes) => set({ eyes }),
  setBrows: (brows) => set({ brows }),
  setNose: (nose) => set({ nose }),
  setMouth: (mouth) => set({ mouth }),
  setHair: (hair) => set({ hair }),
  setHairFill: (hairFill) => set({ hairFill }),
  setSkinTone: (skinTone) => set({ skinTone }),
  addCustomLayer: (src, name) => {
    const id = `custom-${++customCounter}`;
    set((s) => ({
      customLayers: [...s.customLayers, { id, type: 'image', src, name }],
      transforms: { ...s.transforms, [id]: { ...DEFAULT_TRANSFORM } },
      activeLayer: id,
    }));
    return id;
  },
  removeCustomLayer: (id) =>
    set((s) => {
      const { [id]: _omit, ...rest } = s.transforms;
      void _omit;
      return {
        customLayers: s.customLayers.filter((l) => l.id !== id),
        transforms: rest,
        activeLayer: s.activeLayer === id ? null : s.activeLayer,
      };
    }),
  setActiveLayer: (activeLayer) => set({ activeLayer }),
  setTransform: (id, patch) =>
    set((s) => ({
      transforms: {
        ...s.transforms,
        [id]: { ...(s.transforms[id] ?? DEFAULT_TRANSFORM), ...patch },
      },
    })),
  resetTransform: (id) =>
    set((s) => ({
      transforms: { ...s.transforms, [id]: { ...DEFAULT_TRANSFORM } },
    })),
}));

export function transformToString(t: LayerTransform | undefined): string {
  const tr = t ?? DEFAULT_TRANSFORM;
  const cx = 64;
  const cy = 64;
  return `translate(${cx + tr.x} ${cy + tr.y}) rotate(${tr.rotation}) scale(${tr.scale}) translate(${-cx} ${-cy})`;
}
