import type { EarStyle } from '../store/portrait';
import type { SvgComp } from './types';

import LeftNone from '../assets/ear-left/none.svg?react';
import LeftHuman from '../assets/ear-left/human.svg?react';
import LeftCat1 from '../assets/ear-left/cat 1.svg?react';
import LeftCat2 from '../assets/ear-left/cat 2.svg?react';
import LeftDeer from '../assets/ear-left/deer.svg?react';
import LeftDeer2 from '../assets/ear-left/deer 2.svg?react';
import LeftLynx from '../assets/ear-left/lynx.svg?react';
import LeftRabbit2 from '../assets/ear-left/rabbit 2.svg?react';
import LeftRabbit3 from '../assets/ear-left/rabbit 3.svg?react';
import LeftSheep from '../assets/ear-left/sheep.svg?react';
import LeftWolf from '../assets/ear-left/wolf.svg?react';

import RightNone from '../assets/ear-right/none.svg?react';
import RightHuman from '../assets/ear-right/human.svg?react';
import RightCat1 from '../assets/ear-right/cat 1.svg?react';
import RightCat2 from '../assets/ear-right/cat 2.svg?react';
import RightDeer from '../assets/ear-right/deer.svg?react';
import RightDeer2 from '../assets/ear-right/deer 2.svg?react';
import RightLynx from '../assets/ear-right/lynx.svg?react';
import RightRabbit2 from '../assets/ear-right/rabbit 2.svg?react';
import RightRabbit3 from '../assets/ear-right/rabbit 3.svg?react';
import RightSheep from '../assets/ear-right/sheep.svg?react';
import RightWolf from '../assets/ear-right/wolf.svg?react';

export const EAR_LEFT: Record<EarStyle, SvgComp> = {
  none: LeftNone,
  human: LeftHuman,
  cat1: LeftCat1,
  cat2: LeftCat2,
  deer: LeftDeer,
  deer2: LeftDeer2,
  lynx: LeftLynx,
  rabbit2: LeftRabbit2,
  rabbit3: LeftRabbit3,
  sheep: LeftSheep,
  wolf: LeftWolf,
};

export const EAR_RIGHT: Record<EarStyle, SvgComp> = {
  none: RightNone,
  human: RightHuman,
  cat1: RightCat1,
  cat2: RightCat2,
  deer: RightDeer,
  deer2: RightDeer2,
  lynx: RightLynx,
  rabbit2: RightRabbit2,
  rabbit3: RightRabbit3,
  sheep: RightSheep,
  wolf: RightWolf,
};
