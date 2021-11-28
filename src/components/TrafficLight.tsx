import React from 'react';
const scale = 1 / 0.375;

interface TrafficLightProps {
  redOn: boolean;
  yellowOn: boolean;
  greenOn: boolean;
  size?: number;
  blackColor?: string;
  disabledColor?: string;
  redColor?: string;
  yellowColor?: string;
  greenColor?: string;
  horizontal?: boolean;
  onRedClick?: () => void;
  onGreenClick?: () => void;
  onYellowClick?: () => void;
}

const TrafficLight: React.FC<TrafficLightProps> = ({
  redOn,
  greenOn,
  yellowOn,
  size = 60,
  blackColor = '#000000',
  disabledColor = '#4A4A4A',
  redColor = '#D0021B',
  yellowColor = '#F8E71C',
  greenColor = '#7ED321',
  horizontal = false,
  onRedClick,
  onGreenClick,
  onYellowClick,
  ...props
}) => (
  <svg
    width={`${size * (horizontal ? scale : 1)}px`}
    height={`${size * (horizontal ? 1 : scale)}px`}
    viewBox={horizontal ? '0 0 160 60' : '0 0 60 160'}
    version="1.1"
    {...props}
  >
    <defs>
      <circle style={{ cursor: onRedClick ? 'pointer' : undefined }} id="redCirclePath" cx="30" cy="30" r="20" />
      <circle style={{ cursor: onYellowClick ? 'pointer' : undefined }} id="yellowCirclePath" cx="30" cy="80" r="20" />
      <circle style={{ cursor: onGreenClick ? 'pointer' : undefined }} id="greenCirclePath" cx="30" cy="130" r="20" />

      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="shadowFilter">
        <feGaussianBlur stdDeviation="3" in="SourceAlpha" result="shadowBlurInner1" />
        <feOffset dx="0" dy="4" in="shadowBlurInner1" result="shadowOffsetInner1" />
        <feComposite
          in="shadowOffsetInner1"
          in2="SourceAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
          result="shadowInnerInner1"
        />
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1" />
      </filter>
    </defs>
    <g transform={horizontal ? 'rotate(-90 30 30)' : undefined}>
      <rect fill={blackColor} x="0" y="0" width="60" height="160" rx="8" />

      <use fill={redOn ? redColor : disabledColor} fillRule="evenodd" xlinkHref="#redCirclePath" />
      <use fill={yellowOn ? yellowColor : disabledColor} fillRule="evenodd" xlinkHref="#yellowCirclePath" />
      <use fill={greenOn ? greenColor : disabledColor} fillRule="evenodd" xlinkHref="#greenCirclePath" />

      <use onClick={onRedClick} fill="black" fillOpacity="1" filter="url(#shadowFilter)" xlinkHref="#redCirclePath" />
      <use
        onClick={onYellowClick}
        fill="black"
        fillOpacity="1"
        filter="url(#shadowFilter)"
        xlinkHref="#yellowCirclePath"
      />
      <use
        onClick={onGreenClick}
        fill="black"
        fillOpacity="1"
        filter="url(#shadowFilter)"
        xlinkHref="#greenCirclePath"
      />
    </g>
  </svg>
);

export default TrafficLight;
