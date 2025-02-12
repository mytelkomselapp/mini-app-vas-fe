import StampIcon from "../../../../../../../../assets/icon-stamp-gamehub.svg";
import { svgToBase64 } from "../../../../../../../../lib/utils";

const CircularProgress = ({
  progress,
  number,
  isActive = false,
  isToday = false,
}) => {
  const theProgress = 100 - progress;

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="100" height="100">
  <circle stroke="#e5e7eb" stroke-width="6" fill="transparent" r="16" cx="20" cy="20" />
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff0000; stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff5733; stop-opacity:1" />
    </linearGradient>
  </defs>
</svg>`;

  const filledSvgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" width="100" height="100">
  <circle stroke="#e5e7eb" stroke-width="6" fill="transparent" r="16" cx="20" cy="20" />
  <circle
    stroke="url(#grad1)"
    stroke-width="6"
    fill="transparent"
    r="16"
    cx="20"
    cy="20"
    stroke-dasharray="100"
    stroke-linecap="round"
    transform="rotate(-90 20 20)"
    stroke-dashoffset="${theProgress}"
    style="animation: progress-animation 1.5s linear forwards;"
  />
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff0000; stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff5733; stop-opacity:1" />
    </linearGradient>
  </defs>
  <style>
    @keyframes progress-animation {
      from {
        stroke-dashoffset: 100;
      }
      to {
        stroke-dashoffset: stroke-dashoffset: ${theProgress}; /* Adjust based on desired progress */
      }
    }
  </style>
</svg>`;

  const svgCircularProgress = svgToBase64(
    progress > 0 ? filledSvgString : svgString
  );

  console.log({ filledSvgString, progress });

  return (
    <div
      className={`flex flex-col pt-[6px] w-[42px] ${
        isActive ? "bg-red-50" : ""
      }  rounded-md items-center`}
    >
      <div className="relative w-[36px] h-[36px] overflow-hidden">
        <img src={svgCircularProgress} width="36px" height="36px" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full flex items-center justify-center">
            <img
              className="relative left-[-1px] top-[-1px]"
              src={StampIcon}
              alt="Stamp Icon"
              width="18px"
              height="18px"
            />
          </div>
        </div>
      </div>

      <p
        className={`text-[10px] mt-2 w-[30px] text-center ${
          isActive
            ? "bg-[#ff0025] rounded-xl text-white"
            : isToday
            ? "text-[#ff0025]"
            : "text-black"
        }`}
      >
        {number}
      </p>
    </div>
  );
};

export default CircularProgress;
