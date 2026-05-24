import type { HairAccessoryStyle } from '../store/portrait';
import type { SvgComp } from './types';

import None from '../assets/hair-accessory/none.svg?react';
import Halo from '../assets/hair-accessory/halo.svg?react';
import Tiara from '../assets/hair-accessory/tiara.svg?react';

export const HAIR_ACCESSORY: Record<HairAccessoryStyle, SvgComp> = {
  none: None, halo: Halo, tiara: Tiara,
};
