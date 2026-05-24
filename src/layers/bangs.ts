import type { BangsStyle } from '../store/portrait';
import type { SvgComp } from './types';

import None from '../assets/bangs/none.svg?react';
import Demo from '../assets/bangs/demo.svg?react';

export const BANGS: Record<BangsStyle, SvgComp> = {
  none: None, demo: Demo,
};
