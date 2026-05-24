import type { HairSideStyle } from '../store/portrait';
import type { SvgComp } from './types';

import LeftNone from '../assets/hair-left/none.svg?react';
import LeftV1 from '../assets/hair-left/v1.svg?react';
import LeftV2 from '../assets/hair-left/v2.svg?react';
import LeftV2a from '../assets/hair-left/v2-1.svg?react';
import LeftV3 from '../assets/hair-left/v3.svg?react';
import LeftV4 from '../assets/hair-left/v4.svg?react';
import LeftV5 from '../assets/hair-left/v5.svg?react';
import LeftV6 from '../assets/hair-left/v6.svg?react';
import LeftV7 from '../assets/hair-left/v7.svg?react';
import LeftV8 from '../assets/hair-left/v8.svg?react';
import LeftV9 from '../assets/hair-left/v9.svg?react';
import LeftV10 from '../assets/hair-left/v10.svg?react';
import LeftV11 from '../assets/hair-left/v11.svg?react';
import LeftV12 from '../assets/hair-left/v12.svg?react';
import LeftV13 from '../assets/hair-left/v13.svg?react';
import LeftV15 from '../assets/hair-left/v15.svg?react';
import LeftV16 from '../assets/hair-left/v16.svg?react';
import LeftV17 from '../assets/hair-left/v17.svg?react';
import LeftV18 from '../assets/hair-left/v18.svg?react';
import LeftW1 from '../assets/hair-left/w1.svg?react';
import LeftY1 from '../assets/hair-left/y1.svg?react';

import RightNone from '../assets/hair-right/none.svg?react';
import RightV1 from '../assets/hair-right/v1.svg?react';
import RightV2 from '../assets/hair-right/v2.svg?react';
import RightV2a from '../assets/hair-right/v2-1.svg?react';
import RightV3 from '../assets/hair-right/v3.svg?react';
import RightV4 from '../assets/hair-right/v4.svg?react';
import RightV5 from '../assets/hair-right/v5.svg?react';
import RightV6 from '../assets/hair-right/v6.svg?react';
import RightV7 from '../assets/hair-right/v7.svg?react';
import RightV8 from '../assets/hair-right/v8.svg?react';
import RightV9 from '../assets/hair-right/v9.svg?react';
import RightV10 from '../assets/hair-right/v10.svg?react';
import RightV11 from '../assets/hair-right/v11.svg?react';
import RightV12 from '../assets/hair-right/v12.svg?react';
import RightV13 from '../assets/hair-right/v13.svg?react';
import RightV15 from '../assets/hair-right/v15.svg?react';
import RightV16 from '../assets/hair-right/v16.svg?react';
import RightV17 from '../assets/hair-right/v17.svg?react';
import RightV18 from '../assets/hair-right/v18.svg?react';
import RightW1 from '../assets/hair-right/w1.svg?react';
import RightY1 from '../assets/hair-right/y1.svg?react';

export const HAIR_LEFT: Record<HairSideStyle, SvgComp> = {
  none: LeftNone,
  v1: LeftV1, v2: LeftV2, v2a: LeftV2a,
  v3: LeftV3, v4: LeftV4, v5: LeftV5, v6: LeftV6, v7: LeftV7, v8: LeftV8, v9: LeftV9,
  v10: LeftV10, v11: LeftV11, v12: LeftV12, v13: LeftV13,
  v15: LeftV15, v16: LeftV16, v17: LeftV17, v18: LeftV18,
  w1: LeftW1, y1: LeftY1,
};

export const HAIR_RIGHT: Record<HairSideStyle, SvgComp> = {
  none: RightNone,
  v1: RightV1, v2: RightV2, v2a: RightV2a,
  v3: RightV3, v4: RightV4, v5: RightV5, v6: RightV6, v7: RightV7, v8: RightV8, v9: RightV9,
  v10: RightV10, v11: RightV11, v12: RightV12, v13: RightV13,
  v15: RightV15, v16: RightV16, v17: RightV17, v18: RightV18,
  w1: RightW1, y1: RightY1,
};
