import { create } from 'zustand';

export type FaceShape = 'round' | 'oval' | 'square' | 'long';

export const FACE_SHAPES: { id: FaceShape; label: string }[] = [
  { id: 'round', label: 'Round' },
  { id: 'oval', label: 'Oval' },
  { id: 'square', label: 'Square' },
  { id: 'long', label: 'Long' },
];

type PortraitState = {
  face: FaceShape;
  skinTone: string;
  userImage: string | null;
  setFace: (face: FaceShape) => void;
  setSkinTone: (color: string) => void;
  setUserImage: (dataUrl: string | null) => void;
};

export const usePortrait = create<PortraitState>((set) => ({
  face: 'round',
  skinTone: '#f0c8a0',
  userImage: null,
  setFace: (face) => set({ face }),
  setSkinTone: (skinTone) => set({ skinTone }),
  setUserImage: (userImage) => set({ userImage }),
}));
