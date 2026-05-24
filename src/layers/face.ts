import type { FaceShape } from '../store/portrait';
import type { SvgComp } from './types';

import Default from '../assets/face/default.svg?react';
import Default2 from '../assets/face/default2.svg?react';
import Round from '../assets/face/round.svg?react';
import Square from '../assets/face/square.svg?react';
import Oval from '../assets/face/oval.svg?react';
import Oval2 from '../assets/face/oval2.svg?react';
import Long from '../assets/face/long.svg?react';
import Long1 from '../assets/face/long1.svg?react';
import Long2 from '../assets/face/long2.svg?react';

export const FACE: Record<FaceShape, SvgComp> = {
  default: Default,
  default2: Default2,
  round: Round,
  square: Square,
  oval: Oval,
  oval2: Oval2,
  long: Long,
  long1: Long1,
  long2: Long2,
};
