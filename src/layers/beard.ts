import type { BeardStyle } from '../store/portrait';
import type { SvgComp } from './types';

import None from '../assets/beard/none.svg?react';
import Beard from '../assets/beard/beard.svg?react';
import Mustache from '../assets/beard/mustache.svg?react';

export const BEARD: Record<BeardStyle, SvgComp> = {
  none: None, beard: Beard, mustache: Mustache,
};
