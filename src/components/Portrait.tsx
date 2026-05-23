import { forwardRef } from 'react';
import {
  usePortrait,
  type FaceShape,
  type EyesStyle,
  type BrowsStyle,
  type NoseStyle,
  type MouthStyle,
} from '../store/portrait';

import RoundFace from '../assets/face/round.svg?react';
import OvalFace from '../assets/face/oval.svg?react';
import SquareFace from '../assets/face/square.svg?react';
import LongFace from '../assets/face/long.svg?react';

import EyesNone from '../assets/eyes/none.svg?react';
import EyesDots from '../assets/eyes/dots.svg?react';
import EyesSmile from '../assets/eyes/smile.svg?react';
import EyesWink from '../assets/eyes/wink.svg?react';
import EyesAngry from '../assets/eyes/angry.svg?react';

import BrowsNone from '../assets/brows/none.svg?react';
import BrowsFlat from '../assets/brows/flat.svg?react';
import BrowsRaised from '../assets/brows/raised.svg?react';
import BrowsAngry from '../assets/brows/angry.svg?react';
import BrowsSad from '../assets/brows/sad.svg?react';

import NoseNone from '../assets/nose/none.svg?react';
import NoseDot from '../assets/nose/dot.svg?react';
import NoseCurve from '../assets/nose/curve.svg?react';

import MouthNone from '../assets/mouth/none.svg?react';
import MouthDot from '../assets/mouth/dot.svg?react';
import MouthSmile from '../assets/mouth/smile.svg?react';
import MouthOpen from '../assets/mouth/open.svg?react';
import MouthFlat from '../assets/mouth/flat.svg?react';

type SvgComp = React.FC<React.SVGProps<SVGSVGElement>>;

const FACE: Record<FaceShape, SvgComp> = {
  round: RoundFace,
  oval: OvalFace,
  square: SquareFace,
  long: LongFace,
};

const EYES: Record<EyesStyle, SvgComp> = {
  none: EyesNone,
  dots: EyesDots,
  smile: EyesSmile,
  wink: EyesWink,
  angry: EyesAngry,
};

const BROWS: Record<BrowsStyle, SvgComp> = {
  none: BrowsNone,
  flat: BrowsFlat,
  raised: BrowsRaised,
  angry: BrowsAngry,
  sad: BrowsSad,
};

const NOSE: Record<NoseStyle, SvgComp> = {
  none: NoseNone,
  dot: NoseDot,
  curve: NoseCurve,
};

const MOUTH: Record<MouthStyle, SvgComp> = {
  none: MouthNone,
  dot: MouthDot,
  smile: MouthSmile,
  open: MouthOpen,
  flat: MouthFlat,
};

export const Portrait = forwardRef<SVGSVGElement>((_, ref) => {
  const { face, eyes, brows, nose, mouth, skinTone, userImage } = usePortrait();

  const FaceSvg = FACE[face];
  const EyesSvg = EYES[eyes];
  const BrowsSvg = BROWS[brows];
  const NoseSvg = NOSE[nose];
  const MouthSvg = MOUTH[mouth];

  return (
    <svg
      ref={ref}
      className="portrait"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style={{ color: skinTone }}>
        <FaceSvg width={128} height={128} />
      </g>

      <EyesSvg width={128} height={128} />
      <BrowsSvg width={128} height={128} />
      <NoseSvg width={128} height={128} />
      <MouthSvg width={128} height={128} />

      {userImage && (
        <image
          href={userImage}
          x={32}
          y={32}
          width={64}
          height={64}
          preserveAspectRatio="xMidYMid slice"
        />
      )}
    </svg>
  );
});
