import React from "react";

interface TotalDepositIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const TotalDepositIcon: React.FC<TotalDepositIconProps> = ({
  size = 72,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 73 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.666626" width="72" height="72" rx="36" fill="#ECFDF5" />
      <g clipPath="url(#clip0_1009_593)">
        <path
          d="M36.6666 24C30.0496 24 24.6666 29.383 24.6666 36C24.6666 42.617 30.0496 48 36.6666 48C43.2836 48 48.6666 42.617 48.6666 36C48.6666 29.383 43.2836 24 36.6666 24ZM36.5756 39.419C36.1886 39.806 35.6796 39.999 35.1686 39.999C34.6576 39.999 34.1436 39.804 33.7526 39.414L30.9706 36.718L32.3636 35.281L35.1566 37.988L40.9656 32.287L42.3696 33.712L36.5756 39.419Z"
          fill="#0BA974"
        />
      </g>
      <defs>
        <clipPath id="clip0_1009_593">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(24.6666 24)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
