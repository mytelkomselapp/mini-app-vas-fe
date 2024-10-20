import Show from "../../../../components/Show";
import { cn } from "../../../../lib/utils";
import { CMSFlightLandingAppSection } from "../../../../network/types/response-props";
import * as React from "react";

interface Props {
  isLoading?: boolean;
  onClick: (targetUrl: string, title: string) => void;
  data?: CMSFlightLandingAppSection[];
  classNameText?: string;
}

const FlightLandingMenu: React.FC<Props> = ({
  isLoading = false,
  data,
  onClick,
  classNameText,
}) => {
  const handleClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const { url, title } = event?.currentTarget?.dataset;

    onClick?.(url ?? "", title ?? "");
  };

  return (
    <React.Fragment>
      <Show when={isLoading}>
        {Array(4)
          .fill(null)
          ?.map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="h-[40px] w-[40px] rounded-full bg-slate-200 mb-1" />
              <div className="w-[50px] h-[12px] rounded-md bg-slate-200 mt-1" />
            </div>
          ))}
      </Show>
      <Show when={!isLoading}>
        {data?.map((item, idx) => (
          <div
            key={`${idx}${item?.title}`}
            data-url={item?.targetUrl}
            data-title={item?.title}
            className="flex flex-col items-center cursor-pointer"
            onClick={handleClick}
          >
            <img
              src={item?.iconUrl}
              alt={`icon ${item?.title}`}
              width={40}
              height={40}
              className="object-cover"
            />
            <p className={`${cn("text-xs", classNameText)}`}>{item?.title}</p>
          </div>
        ))}
      </Show>
    </React.Fragment>
  );
};

export default FlightLandingMenu;
