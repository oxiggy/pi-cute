import type { NoseStyle } from '../store/portrait';
import type { SvgComp } from './types';

import None from '../assets/nose/none.svg?react';
import Dot from '../assets/nose/dot.svg?react';
import Curve from '../assets/nose/curve.svg?react';

export const NOSE: Record<NoseStyle, SvgComp> = {
  none: None, dot: Dot, curve: Curve,
};
