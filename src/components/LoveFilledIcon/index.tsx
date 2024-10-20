import React from "react";

interface LoveFilledIconProps {
  color: string;
}

const LoveFilledIcon: React.FC<LoveFilledIconProps> = ({ color }) => {
  return (
    <React.Fragment>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.13 11.3832L5.54588 11.805C5.80158 12.0643 6.19913 12.0651 6.45573 11.8068L6.87 11.3899L6.89368 11.3659C9.97042 8.25115 12 6.19648 12 3.67631C12 1.61758 10.548 0 8.7 0C8.11061 0 7.5346 0.172561 7.02704 0.476791C6.63555 0.711448 6.28478 1.02444 6 1.397C5.71522 1.02444 5.36445 0.711448 4.97296 0.476791C4.4654 0.172561 3.88939 0 3.3 0C1.452 0 0 1.61758 0 3.67631C0 6.20087 2.03665 8.2583 5.1224 11.3755L5.13 11.3832Z"
          fill={color}
        />
      </svg>
    </React.Fragment>
  );
};

export default LoveFilledIcon;
