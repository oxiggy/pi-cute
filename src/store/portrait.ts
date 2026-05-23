import { create } from 'zustand';

export type FaceShape =
  | 'default' | 'default2'
  | 'round' | 'square'
  | 'oval' | 'oval2'
  | 'long' | 'long1' | 'long2';
export type EyeStyle = 'none' | 'dot' | 'closed' | 'angry';
export type BrowStyle = 'none' | 'flat' | 'raised' | 'angry' | 'sad';
export type NoseStyle = 'none' | 'dot' | 'curve';
export type MouthStyle = 'none' | 'smile' | 'dot' | 'open' | 'flat';
export type BangsStyle = 'none' | 'demo';
export type HairSideStyle = 'none' | 'demo';
export type EarStyle = 'none' | 'human' | 'cat' | 'lynx' | 'wolf' | 'rabbit';
export type HornStyle = 'none' | 'demon' | 'small';
export type HairAccessoryStyle = 'none' | 'halo' | 'tiara';
export type MakeupStyle = 'none' | 'cheekStripes' | 'freckles' | 'mole' | 'foreheadDot';
export type BeardStyle = 'none' | 'beard' | 'mustache';

/** Fill for any layer — either solid or two-stop linear gradient with angle (deg). */
export type LayerFill =
  | { type: 'solid'; color: string }
  | { type: 'gradient'; from: string; to: string; angle: number };

export type LayerTransform = { x: number; y: number; scale: number; rotation: number };
export const DEFAULT_TRANSFORM: LayerTransform = { x: 0, y: 0, scale: 1, rotation: 0 };

export type CustomLayer = { id: string; type: 'image'; src: string; name: string };

/** Visual layers that can have fill + style + transform. */
export const PAINTABLE_LAYERS = [
  'face', 'bangs', 'hairLeft', 'hairRight',
  'earLeft', 'earRight',
  'hornLeft', 'hornRight',
  'hairAccessory',
  'makeup',
  'eyeLeft', 'eyeRight', 'browLeft', 'browRight', 'nose', 'mouth',
  'beard',
] as const;
export type PaintableLayerId = (typeof PAINTABLE_LAYERS)[number];

export const BUILTIN_LAYERS = [
  'bangs', 'hairLeft', 'hairRight',
  'earLeft', 'earRight',
  'hornLeft', 'hornRight',
  'hairAccessory',
  'makeup',
  'eyeLeft', 'eyeRight', 'browLeft', 'browRight', 'nose', 'mouth',
  'beard',
] as const;
export type BuiltinLayerId = (typeof BUILTIN_LAYERS)[number];

export const BUILTIN_LAYER_LABELS: Record<BuiltinLayerId, string> = {
  bangs: 'Чёлка',
  hairLeft: 'Волосы (лев)',
  hairRight: 'Волосы (прав)',
  earLeft: 'Левое ухо',
  earRight: 'Правое ухо',
  hornLeft: 'Левый рог',
  hornRight: 'Правый рог',
  hairAccessory: 'Аксессуар',
  makeup: 'Макияж',
  eyeLeft: 'Левый глаз',
  eyeRight: 'Правый глаз',
  browLeft: 'Левая бровь',
  browRight: 'Правая бровь',
  nose: 'Нос',
  mouth: 'Рот',
  beard: 'Борода',
};

export const FACE_SHAPES: { id: FaceShape; label: string }[] = [
  { id: 'default', label: 'Default 1' },
  { id: 'default2', label: 'Default 2' },
  { id: 'round', label: 'Round' },
  { id: 'square', label: 'Square' },
  { id: 'oval', label: 'Oval 1' },
  { id: 'oval2', label: 'Oval 2' },
  { id: 'long', label: 'Long 1' },
  { id: 'long1', label: 'Long 2' },
  { id: 'long2', label: 'Long 3' },
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

export const BANGS_STYLES: { id: BangsStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'demo', label: 'Demo' },
];

export const HAIR_SIDE_STYLES: { id: HairSideStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'demo', label: 'Demo' },
];

export const EAR_STYLES: { id: EarStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'human', label: 'Human' },
  { id: 'cat', label: 'Cat' },
  { id: 'lynx', label: 'Lynx' },
  { id: 'wolf', label: 'Wolf' },
  { id: 'rabbit', label: 'Rabbit' },
];

export const HORN_STYLES: { id: HornStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'demon', label: 'Demon' },
  { id: 'small', label: 'Small' },
];

export const HAIR_ACCESSORY_STYLES: { id: HairAccessoryStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'halo', label: 'Halo' },
  { id: 'tiara', label: 'Tiara' },
];

export const MAKEUP_STYLES: { id: MakeupStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'cheekStripes', label: 'Cheek Stripes' },
  { id: 'freckles', label: 'Freckles' },
  { id: 'mole', label: 'Mole' },
  { id: 'foreheadDot', label: 'Forehead Dot' },
];

export const BEARD_STYLES: { id: BeardStyle; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'beard', label: 'Beard' },
  { id: 'mustache', label: 'Mustache' },
];

const solid = (color: string): LayerFill => ({ type: 'solid', color });

const DEFAULT_LAYER_COLORS: Record<PaintableLayerId, LayerFill> = {
  face: solid('#f0c8a0'),
  bangs: solid('#4a3020'),
  hairLeft: solid('#4a3020'),
  hairRight: solid('#4a3020'),
  earLeft: solid('#f0c8a0'),
  earRight: solid('#f0c8a0'),
  hornLeft: solid('#2a1a14'),
  hornRight: solid('#2a1a14'),
  hairAccessory: solid('#d4b04e'),
  makeup: solid('#8a3a3a'),
  eyeLeft: solid('#222222'),
  eyeRight: solid('#222222'),
  browLeft: solid('#222222'),
  browRight: solid('#222222'),
  nose: solid('#000000'),
  mouth: solid('#5a2a2a'),
  beard: solid('#4a3020'),
};

type PortraitState = {
  face: FaceShape;
  eyeLeft: EyeStyle;
  eyeRight: EyeStyle;
  browLeft: BrowStyle;
  browRight: BrowStyle;
  nose: NoseStyle;
  mouth: MouthStyle;
  bangs: BangsStyle;
  hairLeft: HairSideStyle;
  hairRight: HairSideStyle;
  earLeft: EarStyle;
  earRight: EarStyle;
  hornLeft: HornStyle;
  hornRight: HornStyle;
  hairAccessory: HairAccessoryStyle;
  makeup: MakeupStyle;
  beard: BeardStyle;

  layerColors: Record<PaintableLayerId, LayerFill>;

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
  setBangs: (bangs: BangsStyle) => void;
  setHairLeft: (hair: HairSideStyle) => void;
  setHairRight: (hair: HairSideStyle) => void;
  setEarLeft: (ear: EarStyle) => void;
  setEarRight: (ear: EarStyle) => void;
  setHornLeft: (h: HornStyle) => void;
  setHornRight: (h: HornStyle) => void;
  setHairAccessory: (a: HairAccessoryStyle) => void;
  setMakeup: (m: MakeupStyle) => void;
  setBeard: (b: BeardStyle) => void;

  setLayerColor: (id: PaintableLayerId, fill: LayerFill) => void;

  addCustomLayer: (src: string, name: string) => string;
  removeCustomLayer: (id: string) => void;
  setActiveLayer: (id: string | null) => void;
  setTransform: (id: string, patch: Partial<LayerTransform>) => void;
  resetTransform: (id: string) => void;
};

let customCounter = 0;

export const usePortrait = create<PortraitState>((set) => ({
  face: 'default',
  eyeLeft: 'dot',
  eyeRight: 'dot',
  browLeft: 'none',
  browRight: 'none',
  nose: 'none',
  mouth: 'smile',
  bangs: 'demo',
  hairLeft: 'none',
  hairRight: 'none',
  earLeft: 'none',
  earRight: 'none',
  hornLeft: 'none',
  hornRight: 'none',
  hairAccessory: 'none',
  makeup: 'none',
  beard: 'none',

  layerColors: DEFAULT_LAYER_COLORS,

  customLayers: [],
  transforms: {
    bangs: { ...DEFAULT_TRANSFORM },
    hairLeft: { ...DEFAULT_TRANSFORM },
    hairRight: { ...DEFAULT_TRANSFORM },
    earLeft: { ...DEFAULT_TRANSFORM },
    earRight: { ...DEFAULT_TRANSFORM },
    hornLeft: { ...DEFAULT_TRANSFORM },
    hornRight: { ...DEFAULT_TRANSFORM },
    hairAccessory: { ...DEFAULT_TRANSFORM },
    makeup: { ...DEFAULT_TRANSFORM },
    beard: { ...DEFAULT_TRANSFORM },
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
  setBangs: (bangs) => set({ bangs }),
  setHairLeft: (hairLeft) => set({ hairLeft }),
  setHairRight: (hairRight) => set({ hairRight }),
  setEarLeft: (earLeft) => set({ earLeft }),
  setEarRight: (earRight) => set({ earRight }),
  setHornLeft: (hornLeft) => set({ hornLeft }),
  setHornRight: (hornRight) => set({ hornRight }),
  setHairAccessory: (hairAccessory) => set({ hairAccessory }),
  setMakeup: (makeup) => set({ makeup }),
  setBeard: (beard) => set({ beard }),

  setLayerColor: (id, fill) =>
    set((s) => ({ layerColors: { ...s.layerColors, [id]: fill } })),

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

/** Convert a fill spec to a CSS value (color string or url(#...)) for use as --layer-fill. */
export function fillToCssValue(fill: LayerFill, gradientId: string): string {
  return fill.type === 'solid' ? fill.color : `url(#${gradientId})`;
}

/** Compute SVG linearGradient endpoints (x1,y1,x2,y2 in 0..1) from an angle in degrees.
 *  0° = left→right, 90° = top→bottom, increasing clockwise. */
export function angleToGradientCoords(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const cx = 0.5, cy = 0.5;
  const dx = Math.cos(rad) / 2;
  const dy = Math.sin(rad) / 2;
  return { x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy };
}
