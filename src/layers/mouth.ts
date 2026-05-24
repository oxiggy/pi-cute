import type { MouthStyle } from '../store/portrait';
import type { SvgComp } from './types';

import None from '../assets/mouth/none.svg?react';
import Dot from '../assets/mouth/dot.svg?react';
import Smile from '../assets/mouth/smile.svg?react';
import Open from '../assets/mouth/open.svg?react';
import Flat from '../assets/mouth/flat.svg?react';

export const MOUTH: Record<MouthStyle, SvgComp> = {
  none: None, dot: Dot, smile: Smile, open: Open, flat: Flat,
};
