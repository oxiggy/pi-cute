import type { MakeupStyle } from '../store/portrait';
import type { SvgComp } from './types';

import None from '../assets/makeup/none.svg?react';
import CheekStripes from '../assets/makeup/cheekStripes.svg?react';
import Freckles from '../assets/makeup/freckles.svg?react';
import Mole from '../assets/makeup/mole.svg?react';
import ForeheadDot from '../assets/makeup/foreheadDot.svg?react';

export const MAKEUP: Record<MakeupStyle, SvgComp> = {
  none: None,
  cheekStripes: CheekStripes,
  freckles: Freckles,
  mole: Mole,
  foreheadDot: ForeheadDot,
};
