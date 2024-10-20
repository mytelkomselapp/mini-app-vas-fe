import React from "react";

interface ArrowLeftIconProps {
  color: string;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ color }) => {
  return (
    <React.Fragment>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="arrow-left"
        className="cursor-pointer" 
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.24551 12.6564C4.09259 12.4807 4 12.2512 4 12C4 11.9964 4.00002 11.9928 4.00006 11.9892C4.00268 11.7437 4.0937 11.5195 4.2428 11.3468L10.2407 4.34923C10.6002 3.9299 11.2315 3.88134 11.6508 4.24076C12.0701 4.60018 12.1187 5.23148 11.7593 5.65081L7.17421 11L19 11C19.5523 11 20 11.4478 20 12C20 12.5523 19.5523 13 19 13L7.17424 13L11.7593 18.3492C12.1187 18.7686 12.0701 19.3999 11.6508 19.7593C11.2315 20.1187 10.6002 20.0701 10.2407 19.6508L4.24551 12.6564Z"
          fill={color}
        />
      </svg>
    </React.Fragment>
  );
};

export default ArrowLeftIcon;
