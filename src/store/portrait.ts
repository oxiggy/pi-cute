import { create } from 'zustand';

export type FaceShape =
  | 'round1' | 'round2'
  | 'oval1' | 'oval2'
  | 'square1' | 'square2'
  | 'long1' | 'long2';
export type EyeStyle = 'none' | 'dot' | 'closed' | 'angry';
export type BrowStyle = 'none' | 'flat' | 'raised' | 'angry' | 'sad';
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

export const BUILTIN_LAYERS = ['hair', 'eyeLeft', 'eyeRight', 'browLeft', 'browRight', 'nose', 'mouth'] as const;
export type BuiltinLayerId = (typeof BUILTIN_LAYERS)[number];

export const BUILTIN_LAYER_LABELS: Record<BuiltinLayerId, string> = {
  hair: 'Волосы',
  eyeLeft: 'Левый глаз',
  eyeRight: 'Правый глаз',
  browLeft: 'Левая бровь',
  browRight: 'Правая бровь',
  nose: 'Нос',
  mouth: 'Рот',
};

export const FACE_SHAPES: { id: FaceShape; label: string }[] = [
  { id: 'round1', label: 'Round 1' },
  { id: 'round2', label: 'Round 2' },
  { id: 'oval1', label: 'Oval 1' },
  { id: 'oval2', label: 'Oval 2' },
  { id: 'square1', label: 'Square 1' },
  { id: 'square2', label: 'Square 2' },
  { id: 'long1', label: 'Long 1' },
  { id: 'long2', label: 'Long 2' },
];

export const EYE_STYLES: { id: EyeStyle; label: string }[] = [
  { id: 'dot', label: 'Dot' },
  { id: 'closed', label: 'Closed' },
  { id: 'angry', label: 'Angry' },
  { id: 'none', label: 'None' },
];

export const BROW_STYLES: { id: BrowStyle; label: string }[] = [
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
  eyeLeft: EyeStyle;
  eyeRight: EyeStyle;
  browLeft: BrowStyle;
  browRight: BrowStyle;
  nose: NoseStyle;
  mouth: MouthStyle;
  hair: HairStyle;
  hairFill: HairFill;
  skinTone: string;
  customLayers: CustomLayer[];
  transforms: Record<string, LayerTransform>;
  activeLayer: string | null;
  setFace: (face: FaceShape) => void;
  setEyeLeft: (eye: EyeStyle) => void;
  setEyeRight: (eye: EyeStyle) => void;
  setBrowLeft: (brow: BrowStyle) => void;
  setBrowRight: (brow: BrowStyle) => void;
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
  face: 'round1',
  eyeLeft: 'dot',
  eyeRight: 'dot',
  browLeft: 'none',
  browRight: 'none',
  nose: 'none',
  mouth: 'smile',
  hair: 'short',
  hairFill: { type: 'solid', color: '#4a3020' },
  skinTone: '#f0c8a0',
  customLayers: [],
  transforms: {
    hair: { ...DEFAULT_TRANSFORM },
    eyeLeft: { ...DEFAULT_TRANSFORM },
    eyeRight: { ...DEFAULT_TRANSFORM },
    browLeft: { ...DEFAULT_TRANSFORM },
    browRight: { ...DEFAULT_TRANSFORM },
    nose: { ...DEFAULT_TRANSFORM },
    mouth: { ...DEFAULT_TRANSFORM },
  },
  activeLayer: null,
  setFace: (face) => set({ face }),
  setEyeLeft: (eyeLeft) => set({ eyeLeft }),
  setEyeRight: (eyeRight) => set({ eyeRight }),
  setBrowLeft: (browLeft) => set({ browLeft }),
  setBrowRight: (browRight) => set({ browRight }),
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
