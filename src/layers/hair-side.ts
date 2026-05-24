import type { HairSideStyle } from '../store/portrait';
import type { SvgComp } from './types';

import LeftNone from '../assets/hair-left/none.svg?react';
import LeftDemo from '../assets/hair-left/demo.svg?react';
import RightNone from '../assets/hair-right/none.svg?react';
import RightDemo from '../assets/hair-right/demo.svg?react';

export const HAIR_LEFT: Record<HairSideStyle, SvgComp> = {
  none: LeftNone, demo: LeftDemo,
};

export const HAIR_RIGHT: Record<HairSideStyle, SvgComp> = {
  none: RightNone, demo: RightDemo,
};
