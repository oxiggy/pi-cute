import type { MouthStyle } from '../store/portrait';
import type { SvgComp } from './types';

import None from '../assets/mouth/none.svg?react';
import Dot from '../assets/mouth/dot.svg?react';
import Flat from '../assets/mouth/flat.svg?react';
import Smile from '../assets/mouth/smile.svg?react';
import Smile2 from '../assets/mouth/smile2.svg?react';
import Smile3 from '../assets/mouth/smile3.svg?react';
import Smile4 from '../assets/mouth/smile4.svg?react';
import Smile5 from '../assets/mouth/smile5.svg?react';
import Smile6 from '../assets/mouth/smile6.svg?react';
import SmileFun from '../assets/mouth/smile-fun.svg?react';
import O from '../assets/mouth/o.svg?react';
import Oh from '../assets/mouth/oh.svg?react';
import Open from '../assets/mouth/open.svg?react';
import Yeah from '../assets/mouth/yeah.svg?react';
import Phew from '../assets/mouth/phew.svg?react';
import HaHa from '../assets/mouth/ha-ha.svg?react';
import Lips1 from '../assets/mouth/lips1.svg?react';
import Lips2 from '../assets/mouth/lips2.svg?react';
import Lips3 from '../assets/mouth/lips3.svg?react';

export const MOUTH: Record<MouthStyle, SvgComp> = {
  none: None,
  dot: Dot,
  flat: Flat,
  smile: Smile,
  smile2: Smile2,
  smile3: Smile3,
  smile4: Smile4,
  smile5: Smile5,
  smile6: Smile6,
  smileFun: SmileFun,
  o: O,
  oh: Oh,
  open: Open,
  yeah: Yeah,
  phew: Phew,
  haHa: HaHa,
  lips1: Lips1,
  lips2: Lips2,
  lips3: Lips3,
};
