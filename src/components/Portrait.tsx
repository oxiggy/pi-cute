import {
  forwardRef,
  useRef,
  useImperativeHandle,
  Fragment,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  usePortrait,
  fillToCssValue,
  angleToGradientCoords,
  PAINTABLE_LAYERS,
  type PaintableLayerId,
  type BuiltinLayerId,
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
    layerColors, customLayers, layerOrder, setActiveLayer,
  } = usePortrait();

  /** One entry per built-in layer id — produces the SVG fragment for that layer. */
  const renderers: Record<BuiltinLayerId, () => ReactNode> = {
    face: () => (
      <DraggableLayer id="face" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.face, 'face')}>
          {(() => { const C = FACE[face]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    hairLeft: () => (
      <DraggableLayer id="hairLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hairLeft, 'hairLeft')}>
          {(() => { const C = HAIR_LEFT[hairLeft]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    hairRight: () => (
      <DraggableLayer id="hairRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hairRight, 'hairRight')}>
          {(() => { const C = HAIR_RIGHT[hairRight]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    bangs: () => (
      <DraggableLayer id="bangs" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.bangs, 'bangs')}>
          {(() => { const C = BANGS[bangs]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    earLeft: () => (
      <DraggableLayer id="earLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.earLeft, 'earLeft')}>
          {(() => { const C = EAR_LEFT[earLeft]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    earRight: () => (
      <DraggableLayer id="earRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.earRight, 'earRight')}>
          {(() => { const C = EAR_RIGHT[earRight]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    hornLeft: () => (
      <DraggableLayer id="hornLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hornLeft, 'hornLeft')}>
          {(() => { const C = HORN_LEFT[hornLeft]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    hornRight: () => (
      <DraggableLayer id="hornRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hornRight, 'hornRight')}>
          {(() => { const C = HORN_RIGHT[hornRight]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    hairAccessory: () => (
      <DraggableLayer id="hairAccessory" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.hairAccessory, 'hairAccessory')}>
          {(() => { const C = HAIR_ACCESSORY[hairAccessory]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    makeup: () => (
      <DraggableLayer id="makeup" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.makeup, 'makeup')}>
          {(() => { const C = MAKEUP[makeup]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    eyeLeft: () => (
      <DraggableLayer id="eyeLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.eyeLeft, 'eyeLeft')}>
          {(() => { const C = EYE_LEFT[eyeLeft]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    eyeRight: () => (
      <DraggableLayer id="eyeRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.eyeRight, 'eyeRight')}>
          {(() => { const C = EYE_RIGHT[eyeRight]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    browLeft: () => (
      <DraggableLayer id="browLeft" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.browLeft, 'browLeft')}>
          {(() => { const C = BROW_LEFT[browLeft]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    browRight: () => (
      <DraggableLayer id="browRight" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.browRight, 'browRight')}>
          {(() => { const C = BROW_RIGHT[browRight]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    nose: () => (
      <DraggableLayer id="nose" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.nose, 'nose')}>
          {(() => { const C = NOSE[nose]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    mouth: () => (
      <DraggableLayer id="mouth" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.mouth, 'mouth')}>
          {(() => { const C = MOUTH[mouth]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
    beard: () => (
      <DraggableLayer id="beard" svgRef={svgRef}>
        <g className="layer-paint" style={paintStyle(layerColors.beard, 'beard')}>
          {(() => { const C = BEARD[beard]; return <C width={128} height={128} />; })()}
        </g>
      </DraggableLayer>
    ),
  };

  function renderLayer(id: string): ReactNode {
    if (id in renderers) return renderers[id as BuiltinLayerId]();
    const custom = customLayers.find((l) => l.id === id);
    if (!custom) return null;
    return (
      <DraggableLayer id={custom.id} svgRef={svgRef}>
        <image
          href={custom.src}
          x={32}
          y={32}
          width={64}
          height={64}
          preserveAspectRatio="xMidYMid meet"
        />
      </DraggableLayer>
    );
  }

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

      {/* Background — fills the entire viewBox, behind everything. */}
      {layerColors.background.type !== 'none' && (
        <rect
          x={0}
          y={0}
          width={128}
          height={128}
          fill={fillToCssValue(layerColors.background, gradientId('background'))}
        />
      )}

      {layerOrder.map((id) => (
        <Fragment key={id}>{renderLayer(id)}</Fragment>
      ))}
    </svg>
  );
});
