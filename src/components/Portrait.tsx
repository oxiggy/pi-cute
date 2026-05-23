import { forwardRef, useRef, useImperativeHandle, type CSSProperties } from 'react';
import {
  usePortrait,
  type FaceShape,
  type EyeStyle,
  type BrowsStyle,
  type NoseStyle,
  type MouthStyle,
  type HairStyle,
} from '../store/portrait';
import { DraggableLayer } from './DraggableLayer';

import RoundFace from '../assets/face/round.svg?react';
import OvalFace from '../assets/face/oval.svg?react';
import SquareFace from '../assets/face/square.svg?react';
import LongFace from '../assets/face/long.svg?react';

import EyeNoneLeft from '../assets/eye/none/left.svg?react';
import EyeNoneRight from '../assets/eye/none/right.svg?react';
import EyeDotLeft from '../assets/eye/dot/left.svg?react';
import EyeDotRight from '../assets/eye/dot/right.svg?react';
import EyeClosedLeft from '../assets/eye/closed/left.svg?react';
import EyeClosedRight from '../assets/eye/closed/right.svg?react';
import EyeAngryLeft from '../assets/eye/angry/left.svg?react';
import EyeAngryRight from '../assets/eye/angry/right.svg?react';

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

import HairNoneBack from '../assets/hair/none/back.svg?react';
import HairNoneFront from '../assets/hair/none/front.svg?react';
import HairShortBack from '../assets/hair/short/back.svg?react';
import HairShortFront from '../assets/hair/short/front.svg?react';
import HairBobBack from '../assets/hair/bob/back.svg?react';
import HairBobFront from '../assets/hair/bob/front.svg?react';
import HairLongBack from '../assets/hair/long/back.svg?react';
import HairLongFront from '../assets/hair/long/front.svg?react';
import HairPonytailBack from '../assets/hair/ponytail/back.svg?react';
import HairPonytailFront from '../assets/hair/ponytail/front.svg?react';

type SvgComp = React.FC<React.SVGProps<SVGSVGElement>>;

const FACE: Record<FaceShape, SvgComp> = {
  round: RoundFace, oval: OvalFace, square: SquareFace, long: LongFace,
};
const EYE_LEFT: Record<EyeStyle, SvgComp> = {
  none: EyeNoneLeft, dot: EyeDotLeft, closed: EyeClosedLeft, angry: EyeAngryLeft,
};
const EYE_RIGHT: Record<EyeStyle, SvgComp> = {
  none: EyeNoneRight, dot: EyeDotRight, closed: EyeClosedRight, angry: EyeAngryRight,
};
const BROWS: Record<BrowsStyle, SvgComp> = {
  none: BrowsNone, flat: BrowsFlat, raised: BrowsRaised, angry: BrowsAngry, sad: BrowsSad,
};
const NOSE: Record<NoseStyle, SvgComp> = {
  none: NoseNone, dot: NoseDot, curve: NoseCurve,
};
const MOUTH: Record<MouthStyle, SvgComp> = {
  none: MouthNone, dot: MouthDot, smile: MouthSmile, open: MouthOpen, flat: MouthFlat,
};
const HAIR_BACK: Record<HairStyle, SvgComp> = {
  none: HairNoneBack, short: HairShortBack, bob: HairBobBack, long: HairLongBack, ponytail: HairPonytailBack,
};
const HAIR_FRONT: Record<HairStyle, SvgComp> = {
  none: HairNoneFront, short: HairShortFront, bob: HairBobFront, long: HairLongFront, ponytail: HairPonytailFront,
};

export const Portrait = forwardRef<SVGSVGElement>((_, externalRef) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useImperativeHandle(externalRef, () => svgRef.current!, []);

  const {
    face, eyeLeft, eyeRight, brows, nose, mouth, hair, hairFill, skinTone,
    customLayers, setActiveLayer,
  } = usePortrait();

  const FaceSvg = FACE[face];
  const EyeLeftSvg = EYE_LEFT[eyeLeft];
  const EyeRightSvg = EYE_RIGHT[eyeRight];
  const BrowsSvg = BROWS[brows];
  const NoseSvg = NOSE[nose];
  const MouthSvg = MOUTH[mouth];
  const HairBackSvg = HAIR_BACK[hair];
  const HairFrontSvg = HAIR_FRONT[hair];

  const hairFillStyle: CSSProperties =
    hairFill.type === 'solid'
      ? ({ ['--hair-fill' as string]: hairFill.color } as CSSProperties)
      : ({ ['--hair-fill' as string]: 'url(#hair-gradient)' } as CSSProperties);

  return (
    <svg
      ref={svgRef}
      className="portrait"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      onPointerDown={() => setActiveLayer(null)}
    >
      {hairFill.type === 'gradient' && (
        <defs>
          <linearGradient id="hair-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hairFill.from} />
            <stop offset="100%" stopColor={hairFill.to} />
          </linearGradient>
        </defs>
      )}

      {/* Hair-back uses the same transform as hair-front (single "hair" layer). */}
      <DraggableLayer id="hair" svgRef={svgRef} contentStyle={hairFillStyle}>
        <HairBackSvg width={128} height={128} />
      </DraggableLayer>

      <g style={{ color: skinTone }}>
        <FaceSvg width={128} height={128} />
      </g>

      <DraggableLayer id="eyeLeft" svgRef={svgRef}>
        <EyeLeftSvg width={128} height={128} />
      </DraggableLayer>
      <DraggableLayer id="eyeRight" svgRef={svgRef}>
        <EyeRightSvg width={128} height={128} />
      </DraggableLayer>
      <DraggableLayer id="brows" svgRef={svgRef}>
        <BrowsSvg width={128} height={128} />
      </DraggableLayer>
      <DraggableLayer id="nose" svgRef={svgRef}>
        <NoseSvg width={128} height={128} />
      </DraggableLayer>
      <DraggableLayer id="mouth" svgRef={svgRef}>
        <MouthSvg width={128} height={128} />
      </DraggableLayer>

      <DraggableLayer id="hair" svgRef={svgRef} contentStyle={hairFillStyle}>
        <HairFrontSvg width={128} height={128} />
      </DraggableLayer>

      {customLayers.map((layer) => (
        <DraggableLayer key={layer.id} id={layer.id} svgRef={svgRef}>
          <image
            href={layer.src}
            x={32}
            y={32}
            width={64}
            height={64}
            preserveAspectRatio="xMidYMid meet"
          />
        </DraggableLayer>
      ))}
    </svg>
  );
});
