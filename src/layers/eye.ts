import type { EyeStyle } from '../store/portrait';
import type { SvgComp } from './types';

import NoneLeft from '../assets/eye/none/left.svg?react';
import NoneRight from '../assets/eye/none/right.svg?react';
import DotLeft from '../assets/eye/dot/left.svg?react';
import DotRight from '../assets/eye/dot/right.svg?react';
import ClosedLeft from '../assets/eye/closed/left.svg?react';
import ClosedRight from '../assets/eye/closed/right.svg?react';
import AngryLeft from '../assets/eye/angry/left.svg?react';
import AngryRight from '../assets/eye/angry/right.svg?react';

export const EYE_LEFT: Record<EyeStyle, SvgComp> = {
  none: NoneLeft, dot: DotLeft, closed: ClosedLeft, angry: AngryLeft,
};

export const EYE_RIGHT: Record<EyeStyle, SvgComp> = {
  none: NoneRight, dot: DotRight, closed: ClosedRight, angry: AngryRight,
};
