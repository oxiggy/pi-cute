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
  type BangsStyle,
  type HairSideStyle,
  type EarStyle,
  type HornStyle,
  type HairAccessoryStyle,
  type MakeupStyle,
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

import BangsNone from '../assets/bangs/none.svg?react';
import BangsDemo from '../assets/bangs/demo.svg?react';
import HairLeftNone from '../assets/hair-left/none.svg?react';
import HairLeftDemo from '../assets/hair-left/demo.svg?react';
import HairRightNone from '../assets/hair-right/none.svg?react';
import HairRightDemo from '../assets/hair-right/demo.svg?react';

import EarLeftNone from '../assets/ear-left/none.svg?react';
import EarLeftHuman from '../assets/ear-left/human.svg?react';
import EarLeftCat from '../assets/ear-left/cat.svg?react';
import EarLeftLynx from '../assets/ear-left/lynx.svg?react';
import EarLeftWolf from '../assets/ear-left/wolf.svg?react';
import EarLeftRabbit from '../assets/ear-left/rabbit.svg?react';
import EarRightNone from '../assets/ear-right/none.svg?react';
import EarRightHuman from '../assets/ear-right/human.svg?react';
import EarRightCat from '../assets/ear-right/cat.svg?react';
import EarRightLynx from '../assets/ear-right/lynx.svg?react';
import EarRightWolf from '../assets/ear-right/wolf.svg?react';
import EarRightRabbit from '../assets/ear-right/rabbit.svg?react';

import HornLeftNone from '../assets/horn-left/none.svg?react';
import HornLeftDemon from '../assets/horn-left/demon.svg?react';
import HornLeftSmall from '../assets/horn-left/small.svg?react';
import HornRightNone from '../assets/horn-right/none.svg?react';
import HornRightDemon from '../assets/horn-right/demon.svg?react';
import HornRightSmall from '../assets/horn-right/small.svg?react';

import HairAccNone from '../assets/hair-accessory/none.svg?react';
import HairAccHalo from '../assets/hair-accessory/halo.svg?react';
import HairAccTiara from '../assets/hair-accessory/tiara.svg?react';

import MakeupNone from '../assets/makeup/none.svg?react';
import MakeupCheekStripes from '../assets/makeup/cheekStripes.svg?react';
import MakeupFreckles from '../assets/makeup/freckles.svg?react';
import MakeupMole from '../assets/makeup/mole.svg?react';
import MakeupForeheadDot from '../assets/makeup/foreheadDot.svg?react';

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
const BANGS: Record<BangsStyle, SvgComp> = {
  none: BangsNone, demo: BangsDemo,
};
const HAIR_LEFT: Record<HairSideStyle, SvgComp> = {
  none: HairLeftNone, demo: HairLeftDemo,
};
const HAIR_RIGHT: Record<HairSideStyle, SvgComp> = {
  none: HairRightNone, demo: HairRightDemo,
};
const EAR_LEFT_S: Record<EarStyle, SvgComp> = {
  none: EarLeftNone, human: EarLeftHuman, cat: EarLeftCat,
  lynx: EarLeftLynx, wolf: EarLeftWolf, rabbit: EarLeftRabbit,
};
const EAR_RIGHT_S: Record<EarStyle, SvgComp> = {
  none: EarRightNone, human: EarRightHuman, cat: EarRightCat,
  lynx: EarRightLynx, wolf: EarRightWolf, rabbit: EarRightRabbit,
};
const HORN_LEFT_S: Record<HornStyle, SvgComp> = {
  none: HornLeftNone, demon: HornLeftDemon, small: HornLeftSmall,
};
const HORN_RIGHT_S: Record<HornStyle, SvgComp> = {
  none: HornRightNone, demon: HornRightDemon, small: HornRightSmall,
};
const HAIR_ACCESSORY_S: Record<HairAccessoryStyle, SvgComp> = {
  none: HairAccNone, halo: HairAccHalo, tiara: HairAccTiara,
};
const MAKEUP_S: Record<MakeupStyle, SvgComp> = {
  none: MakeupNone,
  cheekStripes: MakeupCheekStripes,
  freckles: MakeupFreckles,
  mole: MakeupMole,
  foreheadDot: MakeupForeheadDot,
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
    face, eyeLeft, eyeRight, browLeft, browRight, nose, mouth,
    bangs, hairLeft, hairRight, earLeft, earRight,
    hornLeft, hornRight, hairAccessory, makeup,
    layerColors, customLayers, setActiveLayer,
  } = usePortrait();

  const FaceSvg = FACE[face];
  const EyeLeftSvg = EYE_LEFT[eyeLeft];
  const EyeRightSvg = EYE_RIGHT[eyeRight];
  const BrowLeftSvg = BROW_LEFT[browLeft];
  const BrowRightSvg = BROW_RIGHT[browRight];
  const NoseSvg = NOSE[nose];
  const MouthSvg = MOUTH[mouth];
  const BangsSvg = BANGS[bangs];
  const HairLeftSvg = HAIR_LEFT[hairLeft];
  const HairRightSvg = HAIR_RIGHT[hairRight];
  const EarLeftSvg = EAR_LEFT_S[earLeft];
  const EarRightSvg = EAR_RIGHT_S[earRight];
  const HornLeftSvg = HORN_LEFT_S[hornLeft];
  const HornRightSvg = HORN_RIGHT_S[hornRight];
  const HairAccessorySvg = HAIR_ACCESSORY_S[hairAccessory];
  const MakeupSvg = MAKEUP_S[makeup];

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

      {/* Side hair behind face. */}
      <DraggableLayer id="hairLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hairLeft, 'hairLeft')}>
          <HairLeftSvg width={128} height={128} />
        </g>
      </DraggableLayer>
      <DraggableLayer id="hairRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hairRight, 'hairRight')}>
          <HairRightSvg width={128} height={128} />
        </g>
      </DraggableLayer>

      {/* Face — not draggable, but painted via the same mechanism. */}
      <g className="layer-paint" style={paintStyle(layerColors.face, 'face')}>
        <FaceSvg width={128} height={128} />
      </g>

      <DraggableLayer id="makeup" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.makeup, 'makeup')}>
          <MakeupSvg width={128} height={128} />
        </g>
      </DraggableLayer>

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

      <DraggableLayer id="bangs" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.bangs, 'bangs')}>
          <BangsSvg width={128} height={128} />
        </g>
      </DraggableLayer>

      <DraggableLayer id="earLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.earLeft, 'earLeft')}>
          <EarLeftSvg width={128} height={128} />
        </g>
      </DraggableLayer>
      <DraggableLayer id="earRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.earRight, 'earRight')}>
          <EarRightSvg width={128} height={128} />
        </g>
      </DraggableLayer>

      <DraggableLayer id="hornLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hornLeft, 'hornLeft')}>
          <HornLeftSvg width={128} height={128} />
        </g>
      </DraggableLayer>
      <DraggableLayer id="hornRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hornRight, 'hornRight')}>
          <HornRightSvg width={128} height={128} />
        </g>
      </DraggableLayer>

      <DraggableLayer id="hairAccessory" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hairAccessory, 'hairAccessory')}>
          <HairAccessorySvg width={128} height={128} />
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
