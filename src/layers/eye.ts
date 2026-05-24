import type { EyeStyle } from '../store/portrait';
import type { SvgComp } from './types';

import LeftNone from '../assets/eye-left/none.svg?react';
import LeftPoint from '../assets/eye-left/point.svg?react';
import LeftPoint2 from '../assets/eye-left/point2.svg?react';
import LeftPoint3 from '../assets/eye-left/point3.svg?react';
import LeftPoint4 from '../assets/eye-left/point4.svg?react';
import LeftLash from '../assets/eye-left/lash.svg?react';
import LeftLash2 from '../assets/eye-left/lash2.svg?react';
import LeftLash3 from '../assets/eye-left/lash3.svg?react';
import LeftLash4 from '../assets/eye-left/lash4.svg?react';
import LeftClosed from '../assets/eye-left/closed.svg?react';
import LeftClosed2 from '../assets/eye-left/closed2.svg?react';
import LeftClosed3 from '../assets/eye-left/closed3.svg?react';
import LeftClosed4 from '../assets/eye-left/closed4.svg?react';
import LeftSquint from '../assets/eye-left/squint.svg?react';
import LeftWink from '../assets/eye-left/wink.svg?react';

import RightNone from '../assets/eye-right/none.svg?react';
import RightPoint from '../assets/eye-right/point.svg?react';
import RightPoint2 from '../assets/eye-right/point2.svg?react';
import RightPoint3 from '../assets/eye-right/point3.svg?react';
import RightPoint4 from '../assets/eye-right/point4.svg?react';
import RightLash from '../assets/eye-right/lash.svg?react';
import RightLash2 from '../assets/eye-right/lash2.svg?react';
import RightLash3 from '../assets/eye-right/lash3.svg?react';
import RightLash4 from '../assets/eye-right/lash4.svg?react';
import RightClosed from '../assets/eye-right/closed.svg?react';
import RightClosed2 from '../assets/eye-right/closed2.svg?react';
import RightClosed3 from '../assets/eye-right/closed3.svg?react';
import RightClosed4 from '../assets/eye-right/closed4.svg?react';
import RightSquint from '../assets/eye-right/squint.svg?react';
import RightWink from '../assets/eye-right/wink.svg?react';

export const EYE_LEFT: Record<EyeStyle, SvgComp> = {
  none: LeftNone,
  point: LeftPoint,
  point2: LeftPoint2,
  point3: LeftPoint3,
  point4: LeftPoint4,
  lash: LeftLash,
  lash2: LeftLash2,
  lash3: LeftLash3,
  lash4: LeftLash4,
  closed: LeftClosed,
  closed2: LeftClosed2,
  closed3: LeftClosed3,
  closed4: LeftClosed4,
  squint: LeftSquint,
  wink: LeftWink,
};

export const EYE_RIGHT: Record<EyeStyle, SvgComp> = {
  none: RightNone,
  point: RightPoint,
  point2: RightPoint2,
  point3: RightPoint3,
  point4: RightPoint4,
  lash: RightLash,
  lash2: RightLash2,
  lash3: RightLash3,
  lash4: RightLash4,
  closed: RightClosed,
  closed2: RightClosed2,
  closed3: RightClosed3,
  closed4: RightClosed4,
  squint: RightSquint,
  wink: RightWink,
};
