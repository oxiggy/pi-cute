import { forwardRef } from 'react';
import { usePortrait, type FaceShape } from '../store/portrait';
import RoundFace from '../assets/face/round.svg?react';
import OvalFace from '../assets/face/oval.svg?react';
import SquareFace from '../assets/face/square.svg?react';
import LongFace from '../assets/face/long.svg?react';

const FACE_COMPONENTS: Record<FaceShape, React.FC<React.SVGProps<SVGSVGElement>>> = {
  round: RoundFace,
  oval: OvalFace,
  square: SquareFace,
  long: LongFace,
};

export const Portrait = forwardRef<SVGSVGElement>((_, ref) => {
  const { face, skinTone, userImage } = usePortrait();
  const FaceSvg = FACE_COMPONENTS[face];

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
