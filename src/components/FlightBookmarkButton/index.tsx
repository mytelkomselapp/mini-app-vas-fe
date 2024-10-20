import React from "react";
import LoveFilledIcon from "../LoveFilledIcon";
import LoveIcon, { LoveIconSize } from "../LoveIcon";
import { cn } from "../../lib/utils";

interface FlightBookmarkButtonProps {
  color: string;
  onClick?: () => void;
  bookmarked?: boolean;
  hidden?: boolean;
}

const FlightBookmarkButton: React.FC<FlightBookmarkButtonProps> = ({
  color,
  onClick,
  bookmarked = false,
  hidden = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex gap-1 items-center py-2 px-4 focus:outline-none rounded-[40px] font-semibold border-[1px] border-white",
        bookmarked
          ? "bg-transparent text-white hover:opacity-80"
          : "bg-white text-solidRed hover:bg-slate-100",
        hidden ? "hidden" : ""
      )}
    >
      {bookmarked ? (
        <React.Fragment>
          Penerbangan Diikuti <LoveFilledIcon color={color} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          Ikuti Penerbangan{" "}
          <LoveIcon color={"#ED0226"} size={LoveIconSize.Small} />
        </React.Fragment>
      )}
    </button>
  );
};

export default FlightBookmarkButton;
