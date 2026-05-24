import type { BrowStyle } from '../store/portrait';
import type { SvgComp } from './types';

import NoneLeft from '../assets/brow/none/left.svg?react';
import NoneRight from '../assets/brow/none/right.svg?react';
import FlatLeft from '../assets/brow/flat/left.svg?react';
import FlatRight from '../assets/brow/flat/right.svg?react';
import RaisedLeft from '../assets/brow/raised/left.svg?react';
import RaisedRight from '../assets/brow/raised/right.svg?react';
import AngryLeft from '../assets/brow/angry/left.svg?react';
import AngryRight from '../assets/brow/angry/right.svg?react';
import SadLeft from '../assets/brow/sad/left.svg?react';
import SadRight from '../assets/brow/sad/right.svg?react';

export const BROW_LEFT: Record<BrowStyle, SvgComp> = {
  none: NoneLeft, flat: FlatLeft, raised: RaisedLeft, angry: AngryLeft, sad: SadLeft,
};

export const BROW_RIGHT: Record<BrowStyle, SvgComp> = {
  none: NoneRight, flat: FlatRight, raised: RaisedRight, angry: AngryRight, sad: SadRight,
};
