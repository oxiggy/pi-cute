import type { FaceShape } from '../store/portrait';
import type { SvgComp } from './types';

import Default from '../assets/face/default.svg?react';
import Default2 from '../assets/face/default2.svg?react';
import DefaultLong from '../assets/face/default-long.svg?react';
import Round from '../assets/face/round.svg?react';
import Square from '../assets/face/square.svg?react';
import Oval from '../assets/face/oval.svg?react';
import Wide from '../assets/face/wide.svg?react';
import Long from '../assets/face/long.svg?react';
import Var1 from '../assets/face/var1.svg?react';
import Var2 from '../assets/face/var2.svg?react';

export const FACE: Record<FaceShape, SvgComp> = {
  default: Default,
  default2: Default2,
  defaultLong: DefaultLong,
  round: Round,
  square: Square,
  oval: Oval,
  wide: Wide,
  long: Long,
  var1: Var1,
  var2: Var2,
};
