/* eslint-disable react-refresh/only-export-components */
import "../../index.css";
import React from "react";

import LoveIcon, { LoveIconSize } from "../LoveIcon";
import ArrowLeftIcon from "../ArrowLeftIcon";
import HistoryIcon from "../HistoryIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlightBookmarkState } from "../../store/flight";
import FlightBookmarkButton from "../FlightBookmarkButton";
import { buttonClick } from "../../network/analytics/tracker";
import { cn } from "../../lib/utils";

export enum NavColor {
  Dark = "#181C21",
  Light = "#FFFFFF",
}

export interface NavProps {
  title?: string;
  color?: NavColor;
  badgeCount?: number;
  hiddenAction?: boolean;
  className?: string;
  rightContent?: React.ReactNode;
  onBackCallback?: () => void;
}

const Navbar: React.FC<NavProps> = ({
  title,
  color = NavColor.Dark,
  badgeCount = 0,
  hiddenAction = false,
  className = "",
  rightContent,
  onBackCallback,
}) => {
  const bookmarked = useFlightBookmarkState((state) => state.bookmarked);
  const setBookmark = useFlightBookmarkState((state) => state.setBookmark);

  const location = useLocation();
  const navigate = useNavigate();

  const isLandingPage = false;
  // location.pathname === "/flight" || location.pathname === "/flight/";
  const isFlightDetailsPage =
    location.pathname.includes("detail") &&
    !location.pathname.includes("ticket");
  const isMyTicketPage =
    location.pathname === "/flight/ticket-list" ||
    location.pathname === "/flight/ticket-list/";
  const isDetailTransaction = location.pathname.includes("detail-transaction");

  const handleGoBack = () => {
    onBackCallback?.();
    navigate(-1);
  };

  const handleClick = () => {
    buttonClick("Follow Flight", "Follow Flight", "Detail", location.pathname);
    setBookmark();
  };
  const isPreviousScreenExist = location?.key !== "default";

  const renderRightContent = () => {
    if (isFlightDetailsPage) {
      return (
        <FlightBookmarkButton
          color={color}
          onClick={handleClick}
          bookmarked={bookmarked}
          hidden={hiddenAction}
        />
      );
    }

    if (isLandingPage) {
      return (
        <LoveIcon
          badgeCount={badgeCount}
          color={color}
          size={LoveIconSize.Medium}
          onClick={() => {
            buttonClick(
              "Followed Flights",
              "Navigate to Track Flights Page",
              "",
              location.pathname
            );
            navigate({
              pathname: "/flight/list-following",
            });
          }}
        />
      );
    }

    if (isMyTicketPage) {
      return (
        <HistoryIcon
          onClick={() => {
            navigate({
              pathname: "/flight/ticket-history",
            });
          }}
        />
      );
    }

    if (!!rightContent) return <>{rightContent}</>;

    return <LoveIcon color="transparent" size={LoveIconSize.Medium} />;
  };
  if (isPreviousScreenExist || isMyTicketPage || isDetailTransaction) {
    return (
      <nav
        className={cn(
          "bg-transparent flex items-center justify-between w-full my-4",
          className
        )}
      >
        <div onClick={handleGoBack}>
          <ArrowLeftIcon color={color} />
        </div>
        {title}
        {renderRightContent()}
      </nav>
    );
  }
};

export default Navbar;
