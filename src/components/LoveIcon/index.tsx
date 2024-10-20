/* eslint-disable react-refresh/only-export-components */
import React from "react";

export enum LoveIconSize {
  Small = "16",
  Medium = "24",
}

interface LoveIconProps {
  color: string;
  size: LoveIconSize;
  onClick?: () => void;
  badgeCount?: number;
}

const LoveIcon: React.FC<LoveIconProps> = ({
  color,
  size = LoveIconSize.Medium,
  onClick,
  badgeCount = 0,
}) => {
  return (
    <React.Fragment>
      <div className="flex">
        {badgeCount ? (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer relative"
            onClick={onClick}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.695 20.0748L11.3188 20.7075C11.7024 21.0964 12.2987 21.0977 12.6836 20.7103L13.305 20.0848L13.3405 20.0489C17.9556 15.3767 21 12.2947 21 8.51447C21 5.42637 18.822 3 16.05 3C15.1659 3 14.3019 3.25884 13.5406 3.71519C12.9533 4.06717 12.4272 4.53666 12 5.0955C11.5728 4.53666 11.0467 4.06717 10.4594 3.71519C9.6981 3.25884 8.83409 3 7.95 3C5.178 3 3 5.42637 3 8.51447C3 12.3013 6.05498 15.3875 10.6836 20.0633L10.695 20.0748Z"
              fill={color}
            />
          </svg>
        ) : (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="bookmark"
            className="cursor-pointer relative"
            onClick={onClick}
          >
            <g id="System / ico_love">
              <path
                id="Subtract"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0026 18.4348C12.0033 18.4356 12.0041 18.4364 12.0049 18.4371C12.3916 18.0456 12.7631 17.6692 13.1194 17.3062L13.2633 17.1608L13.2627 17.16C14.9799 15.407 16.3346 13.9643 17.3244 12.6153C18.5315 10.97 19 9.71869 19 8.51447C19 6.56231 17.6633 5.1645 16.05 5.1645C15.1115 5.1645 14.1626 5.66206 13.541 6.4752L12 8.49121L10.459 6.4752C9.83741 5.66206 8.88848 5.1645 7.95 5.1645C6.33674 5.1645 5 6.56231 5 8.51447C5 9.71866 5.46853 10.9699 6.67523 12.6134C7.76218 14.0939 9.28957 15.6867 11.2542 17.6778C10.8956 18.0252 10.5074 18.2482 10.0221 18.258C9.59033 18.2667 9.02436 18.108 8.27604 17.6069C5.0252 14.2164 3 11.5977 3 8.51447C3 5.42637 5.178 3 7.95 3C8.83409 3 9.6981 3.25884 10.4594 3.71519C11.0467 4.06717 11.5728 4.53666 12 5.0955C12.4272 4.53666 12.9533 4.06717 13.5406 3.71519C14.3019 3.25884 15.1659 3 16.05 3C18.822 3 21 5.42637 21 8.51447C21 12.2947 17.9556 15.3767 13.3405 20.0489L13.305 20.0848L12.6836 20.7103C12.2987 21.0977 11.7024 21.0964 11.3188 20.7075L10.695 20.0748L10.6836 20.0633C10.4555 19.8328 10.2312 19.6062 10.0109 19.3832C10.0206 19.3832 10.0303 19.383 10.04 19.3828C10.8667 19.3662 11.4901 18.9527 11.9753 18.4623L12.0026 18.4348Z"
                fill={color}
              />
            </g>
          </svg>
        )}
        {badgeCount ? (
          <div
            className={`w-4 h-4 bg-solidRed relative right-[0px] left-[-13px]  border border-[#D5D3E0] border-solid rounded-[120px] text-white flex justify-center items-center ${
              badgeCount > 99 ? "text-[7px]" : "text-[10px]"
            }`}
          >
            {badgeCount > 99 ? "99+" : badgeCount}
          </div>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
};

export default LoveIcon;
