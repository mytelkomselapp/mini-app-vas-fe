import * as React from "react";
import Taro from "@tarojs/taro";
import FlightLandingCardBanner from "./components/FlightLandingCardBanner";
import FlightLandingMenu from "./components/FlightLandingMenu";
import { CMSFlightLandingData } from "../../network/types/response-props";
import { buttonClick } from "../../network/analytics/tracker";
import { useNavigate } from "react-router-dom";

interface Props {
  data?: CMSFlightLandingData;
  isLoading: boolean;
}

const FlightLandingCardMenu: React.FC<Props> = ({
  data,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const dataFlightAppSection = data?.appsSection ?? [];
  const dataFlightPromoSection = data?.promoSection;

  const handleMenuClick = (targetUrl: string, title: string) => {
    console.log({ data: " TEST CLICK MENU", targetUrl });
    buttonClick(title, `Navigate to ${title}`, "", window.location.pathname);

    // if (title === "My Ticket") return navigate("/flight/ticket-list");
    if (title === "My Ticket")
      return Taro.navigateTo({ url: "/pages/MyTicketList/index" });

    if (targetUrl) {
      return Taro.navigateTo({
        url: "/pages/Webview/index?url=" + targetUrl,
      });
    }

    return;
  };

  return (
    <div
      className="bg-white relative rounded-t-2xl p-[16px]"
      style={{ top: -16 }}
    >
      <p className="text-base">Travel Apps</p>

      <div className="flex flex-row mt-3 justify-around">
        <FlightLandingMenu
          data={dataFlightAppSection}
          isLoading={isLoading}
          onClick={handleMenuClick}
        />
      </div>

      <FlightLandingCardBanner
        data={dataFlightPromoSection}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FlightLandingCardMenu;
