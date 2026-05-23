import { forwardRef, useRef, useImperativeHandle, type CSSProperties } from 'react';
import {
  usePortrait,
  fillToCssValue,
  angleToGradientCoords,
  PAINTABLE_LAYERS,
  type FaceShape,
  type EyeStyle,
  type BrowStyle,
  type NoseStyle,
  type MouthStyle,
  type HairStyle,
  type PaintableLayerId,
  type LayerFill,
} from '../store/portrait';
import { DraggableLayer } from './DraggableLayer';

import FaceDefault from '../assets/face/default.svg?react';
import FaceDefault2 from '../assets/face/default2.svg?react';
import FaceRound from '../assets/face/round.svg?react';
import FaceSquare from '../assets/face/square.svg?react';
import FaceOval from '../assets/face/oval.svg?react';
import FaceOval2 from '../assets/face/oval2.svg?react';
import FaceLong from '../assets/face/long.svg?react';
import FaceLong1 from '../assets/face/long1.svg?react';
import FaceLong2 from '../assets/face/long2.svg?react';

import EyeNoneLeft from '../assets/eye/none/left.svg?react';
import EyeNoneRight from '../assets/eye/none/right.svg?react';
import EyeDotLeft from '../assets/eye/dot/left.svg?react';
import EyeDotRight from '../assets/eye/dot/right.svg?react';
import EyeClosedLeft from '../assets/eye/closed/left.svg?react';
import EyeClosedRight from '../assets/eye/closed/right.svg?react';
import EyeAngryLeft from '../assets/eye/angry/left.svg?react';
import EyeAngryRight from '../assets/eye/angry/right.svg?react';

import BrowNoneLeft from '../assets/brow/none/left.svg?react';
import BrowNoneRight from '../assets/brow/none/right.svg?react';
import BrowFlatLeft from '../assets/brow/flat/left.svg?react';
import BrowFlatRight from '../assets/brow/flat/right.svg?react';
import BrowRaisedLeft from '../assets/brow/raised/left.svg?react';
import BrowRaisedRight from '../assets/brow/raised/right.svg?react';
import BrowAngryLeft from '../assets/brow/angry/left.svg?react';
import BrowAngryRight from '../assets/brow/angry/right.svg?react';
import BrowSadLeft from '../assets/brow/sad/left.svg?react';
import BrowSadRight from '../assets/brow/sad/right.svg?react';

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
  default: FaceDefault, default2: FaceDefault2,
  round: FaceRound, square: FaceSquare,
  oval: FaceOval, oval2: FaceOval2,
  long: FaceLong, long1: FaceLong1, long2: FaceLong2,
};
const EYE_LEFT: Record<EyeStyle, SvgComp> = {
  none: EyeNoneLeft, dot: EyeDotLeft, closed: EyeClosedLeft, angry: EyeAngryLeft,
};
const EYE_RIGHT: Record<EyeStyle, SvgComp> = {
  none: EyeNoneRight, dot: EyeDotRight, closed: EyeClosedRight, angry: EyeAngryRight,
};
const BROW_LEFT: Record<BrowStyle, SvgComp> = {
  none: BrowNoneLeft, flat: BrowFlatLeft, raised: BrowRaisedLeft, angry: BrowAngryLeft, sad: BrowSadLeft,
};
const BROW_RIGHT: Record<BrowStyle, SvgComp> = {
  none: BrowNoneRight, flat: BrowFlatRight, raised: BrowRaisedRight, angry: BrowAngryRight, sad: BrowSadRight,
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

function gradientId(layerId: PaintableLayerId) {
  return `grad-${layerId}`;
}

function paintStyle(fill: LayerFill, layerId: PaintableLayerId): CSSProperties {
  return { ['--layer-fill' as string]: fillToCssValue(fill, gradientId(layerId)) } as CSSProperties;
}

export const Portrait = forwardRef<SVGSVGElement>((_, externalRef) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useImperativeHandle(externalRef, () => svgRef.current!, []);

  const {
    face, eyeLeft, eyeRight, browLeft, browRight, nose, mouth, hair,
    layerColors, customLayers, setActiveLayer,
  } = usePortrait();

  const FaceSvg = FACE[face];
  const EyeLeftSvg = EYE_LEFT[eyeLeft];
  const EyeRightSvg = EYE_RIGHT[eyeRight];
  const BrowLeftSvg = BROW_LEFT[browLeft];
  const BrowRightSvg = BROW_RIGHT[browRight];
  const NoseSvg = NOSE[nose];
  const MouthSvg = MOUTH[mouth];
  const HairBackSvg = HAIR_BACK[hair];
  const HairFrontSvg = HAIR_FRONT[hair];

  return (
    <svg
      ref={svgRef}
      className="portrait"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      onPointerDown={() => setActiveLayer(null)}
    >
      <defs>
        {PAINTABLE_LAYERS.map((id) => {
          const f = layerColors[id];
          if (f.type !== 'gradient') return null;
          const c = angleToGradientCoords(f.angle);
          return (
            <linearGradient key={id} id={gradientId(id)} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}>
              <stop offset="0%" stopColor={f.from} />
              <stop offset="100%" stopColor={f.to} />
            </linearGradient>
          );
        })}
      </defs>

      {/* Hair-back (shares hair fill). */}
      <DraggableLayer id="hair" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hair, 'hair')}>
          <HairBackSvg width={128} height={128} />
        </g>
      </DraggableLayer>

      {/* Face — not draggable, but painted via the same mechanism. */}
      <g className="layer-paint" style={paintStyle(layerColors.face, 'face')}>
        <FaceSvg width={128} height={128} />
      </g>

      <DraggableLayer id="eyeLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.eyeLeft, 'eyeLeft')}>
          <EyeLeftSvg width={128} height={128} />
        </g>
      </DraggableLayer>
      <DraggableLayer id="eyeRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.eyeRight, 'eyeRight')}>
          <EyeRightSvg width={128} height={128} />
        </g>
      </DraggableLayer>
      <DraggableLayer id="browLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.browLeft, 'browLeft')}>
          <BrowLeftSvg width={128} height={128} />
        </g>
      </DraggableLayer>
      <DraggableLayer id="browRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.browRight, 'browRight')}>
          <BrowRightSvg width={128} height={128} />
        </g>
      </DraggableLayer>
      <DraggableLayer id="nose" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.nose, 'nose')}>
          <NoseSvg width={128} height={128} />
        </g>
      </DraggableLayer>
      <DraggableLayer id="mouth" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.mouth, 'mouth')}>
          <MouthSvg width={128} height={128} />
        </g>
      </DraggableLayer>

      <DraggableLayer id="hair" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hair, 'hair')}>
          <HairFrontSvg width={128} height={128} />
        </g>
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
