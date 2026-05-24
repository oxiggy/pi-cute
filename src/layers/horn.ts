import type { HornStyle } from '../store/portrait';
import type { SvgComp } from './types';

import LeftNone from '../assets/horn-left/none.svg?react';
import LeftDemon from '../assets/horn-left/demon.svg?react';
import LeftSmall from '../assets/horn-left/small.svg?react';

import RightNone from '../assets/horn-right/none.svg?react';
import RightDemon from '../assets/horn-right/demon.svg?react';
import RightSmall from '../assets/horn-right/small.svg?react';

export const HORN_LEFT: Record<HornStyle, SvgComp> = {
  none: LeftNone, demon: LeftDemon, small: LeftSmall,
};

export const HORN_RIGHT: Record<HornStyle, SvgComp> = {
  none: RightNone, demon: RightDemon, small: RightSmall,
};
