import type { BangsStyle } from '../store/portrait';
import type { SvgComp } from './types';

import None from '../assets/bangs/none.svg?react';
import V1 from '../assets/bangs/v1.svg?react';
import V2 from '../assets/bangs/v2.svg?react';
import V3 from '../assets/bangs/v3.svg?react';
import V4 from '../assets/bangs/v4.svg?react';
import V5 from '../assets/bangs/v5.svg?react';
import V6 from '../assets/bangs/v6.svg?react';
import V7 from '../assets/bangs/v7.svg?react';

export const BANGS: Record<BangsStyle, SvgComp> = {
  none: None,
  v1: V1,
  v2: V2,
  v3: V3,
  v4: V4,
  v5: V5,
  v6: V6,
  v7: V7,
};
