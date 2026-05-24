import { forwardRef, useRef, useImperativeHandle, type CSSProperties } from 'react';
import {
  usePortrait,
  fillToCssValue,
  angleToGradientCoords,
  PAINTABLE_LAYERS,
  type PaintableLayerId,
  type LayerFill,
} from '../store/portrait';
import { DraggableLayer } from './DraggableLayer';
import {
  FACE,
  EYE_LEFT, EYE_RIGHT,
  BROW_LEFT, BROW_RIGHT,
  NOSE, MOUTH,
  BANGS,
  HAIR_LEFT, HAIR_RIGHT,
  EAR_LEFT, EAR_RIGHT,
  HORN_LEFT, HORN_RIGHT,
  HAIR_ACCESSORY,
  MAKEUP,
  BEARD,
} from '../layers';

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
    hornLeft, hornRight, hairAccessory, makeup, beard,
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
  const EarLeftSvg = EAR_LEFT[earLeft];
  const EarRightSvg = EAR_RIGHT[earRight];
  const HornLeftSvg = HORN_LEFT[hornLeft];
  const HornRightSvg = HORN_RIGHT[hornRight];
  const HairAccessorySvg = HAIR_ACCESSORY[hairAccessory];
  const MakeupSvg = MAKEUP[makeup];
  const BeardSvg = BEARD[beard];

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

      <DraggableLayer id="beard" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.beard, 'beard')}>
          <BeardSvg width={128} height={128} />
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

      <DraggableLayer id="bangs" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.bangs, 'bangs')}>
          <BangsSvg width={128} height={128} />
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
