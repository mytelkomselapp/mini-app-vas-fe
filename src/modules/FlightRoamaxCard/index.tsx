import Button from "../../components/Button";
import IconRoaming from "../../assets/icon-roaming-globe.svg";

import { Image } from "@tarojs/components";

interface FlightRoamaxCard {
  isEligible: boolean;
  onClick?: () => void;
}

const FlightRoamaxCard = ({ isEligible, onClick }: FlightRoamaxCard) => {
  return (
    <div className="relative bg-white rounded-[16px] p-[16px] border">
      {isEligible ? (
        <div className="flex flex-col whitespace-pre space-y-[8px]">
          <span className="text-[12px]">{`Internetan lancar selama perjalanan\ndengan langganan RoaMAX VIP!`}</span>
          <div className="flex">
            <Button
              label="Berlangganan RoaMAX VIP"
              className="text-[12px] border-0 min-h-0 max-w-[224px]"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col whitespace-pre space-y-[8px]">
          <span className="text-[12px]">{`Internetan lancar selama perjalanan\ndengan paket roaming Telkomsel!`}</span>
          <div>
            <Button
              label="Beli Paket Roaming"
              className="text-[12px] min-h-0 max-w-[224px]"
            />
          </div>
        </div>
      )}
      <div className="absolute bottom-0 right-0">
        <div className="flex">
          <Image
            src={IconRoaming}
            className="w-[71px] h-[79px] rounded-br-[16px]"
          />
        </div>
      </div>
    </div>
  );
};

export default FlightRoamaxCard;
