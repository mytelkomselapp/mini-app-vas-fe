import Show from "../../../../components/Show";
import { cn as classNames } from "../../../../lib/utils";
import { CMSFlightLandingPromoSection } from "../../../../network/types/response-props";
import * as React from "react";
import style from "./FlightLandingCardBanner.module.css";
import { buttonClick } from "../../../../network/analytics/tracker";

interface Props {
  data?: CMSFlightLandingPromoSection;
  isLoading?: boolean;
}

const FlightLandingCardBanner: React.FC<Props> = ({
  data,
  isLoading = false,
}) => {
  const handleItemClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const { url } = event?.currentTarget?.dataset;
    if (url) return window.open(url, "_blank");

    return;
  };

  return (
    <div className="w-full mt-[20px] gap-y-2 h-[auto] flex flex-col">
      <Show when={isLoading}>
        <div className="rounded-md h-[160px] bg-slate-300 w-full flex flex-col justify-end p-[16px]"></div>
      </Show>
      <Show when={!isLoading}>
        <div
          style={{
            backgroundImage: `url(${data?.backgroundImgUrl})`,
          }}
          data-url={data?.targetUrl}
          onClick={(event) => {
            handleItemClick(event);
            buttonClick(data?.title, `Navigate to FST Page`, "", "/detail");
          }}
          className={classNames(
            style["image-background"],
            "rounded-2xl h-[160px] w-full flex flex-col justify-end p-[16px]"
          )}
        >
          <div className="w-[50%] flex flex-col gap-y-1">
            <p className="text-[10px] text-white">{data?.subtitle}</p>
            <p className="text-sm text-white">{data?.title}</p>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default FlightLandingCardBanner;
