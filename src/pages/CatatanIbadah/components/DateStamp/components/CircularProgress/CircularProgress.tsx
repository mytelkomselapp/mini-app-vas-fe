import { motion } from "framer-motion";
import StampIcon from "../../../../../../assets/icon-stamp-gamehub.svg";

const CircularProgress = ({ progress, number, isActive = false }) => {
  return (
    <div
      className={`flex flex-col pt-[6px] w-[42px] ${
        isActive ? "bg-red-50" : ""
      }  rounded-md items-center`}
    >
      <div className="relative w-[36px] h-[36px] overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 40 40">
          <circle
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            r="16"
            cx="20"
            cy="20"
          />

          <motion.circle
            className="text-red-500"
            stroke="url(#grad1)"
            strokeWidth="6"
            fill="transparent"
            r="16"
            cx="20"
            cy="20"
            strokeDasharray="100"
            strokeDashoffset="100"
            strokeLinecap="round"
            transform="rotate(-90 20 20)"
            animate={{ strokeDashoffset: 100 - progress }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#ff0000", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ff5733", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full flex items-center justify-center">
            <img src={StampIcon} alt="Stamp Icon" />
          </div>
        </div>
      </div>

      <p
        className={`text-[10px] mt-2 w-[30px] text-center ${
          isActive ? "bg-[#ff0025] rounded-xl text-white" : "text-black"
        }`}
      >
        {number}
      </p>
    </div>
  );
};

export default CircularProgress;
