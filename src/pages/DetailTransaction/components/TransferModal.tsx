import * as React from "react";
import BottomSheet from "../../components/BottomSheet";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";
import { ReactComponent as BluebirdIcon } from "../../assets/bluebird-32x32.svg";
import { ReactComponent as GojekIcon } from "../../assets/gojek-32x32.svg";
import { ReactComponent as TravelokaIcon } from "../../assets/traveloka-32x32.svg";
import { cn } from "../../lib/utils";
import Button from "../../components/Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TransferOption: React.FC<{
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  className: string;
  open: boolean;
  onClose: () => void;
}> = ({ Icon, title, description, className, open, onClose }) => (
  <>
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <Icon />
        <div className="flex-grow">
          <p className="text-sm font-medium text-textPrimary">{title}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "px-3 py-1 m-auto w-fit rounded-[120px] text-[10px]/[14px] first-letter:uppercase",
            className
          )}
        >
          {description}
        </p>
        <ChevronRight />
      </div>
    </div>
  </>
);

const TransferOptionsModal: React.FC<Props> = ({ open, onClose }) => {
  const TransferOptions = [
    {
      partner: "Traveloka",
      description: "Promo Akhir Tahun!",
      icon: TravelokaIcon,
      style: "text-[#0050AE] bg-[#dfebfb]",
    },
    {
      partner: "Bluebird",
      description: "Diskon Gajian",
      icon: BluebirdIcon,
      style: "text-[#008E53] bg-[#e5f4ee]",
    },
    {
      partner: "Gojek",
      description: "Diskon Gajian",
      icon: GojekIcon,
      style: "text-[#008E53] bg-[#e5f4ee]",
    },
  ];
  return (
    <BottomSheet open={open} onClose={onClose} disableDrag>
      <div className="flex flex-col items-center gap-y-2 p-[16px] mt-2 w-full">
        <h1 className="text-base font-semibold mb-1">
          Tambah Airport Transfer
        </h1>

        <div className="w-full">
          {TransferOptions.map((option, index) => (
            <TransferOption
              key={index}
              Icon={option.icon}
              title={option.partner}
              description={option.description}
              open={false}
              onClose={() => {}}
              className={option.style}
            />
          ))}
        </div>

        <Button
          onClick={() => onClose()}
          className="w-full bg-white text-red-500 border border-red-500 rounded-full py-2 px-4 font-semibold"
          label="Kembali"
        />
      </div>
    </BottomSheet>
  );
};

export default TransferOptionsModal;
