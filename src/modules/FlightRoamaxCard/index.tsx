import { ReactComponent as IconRoaming } from "../../assets/icon-roaming-globe.svg";
import Button from "../../components/Button";

interface FlightRoamaxCard {
  isEligible: boolean;
  onClick?: () => void;
}

const FlightRoamaxCard = ({ isEligible, onClick }: FlightRoamaxCard) => {
  return (
    <div className="min-h-[104px] relative bg-white rounded-2xl p-4 border">
      {isEligible ? (
        <div className="flex flex-col whitespace-pre space-y-2">
          <span className="text-xs">{`Internetan lancar selama perjalanan\ndengan langganan RoaMAX VIP!`}</span>
          <div>
            <Button
              label="Berlangganan RoaMAX VIP"
              className="text-xs min-h-0 max-w-[224px]"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col whitespace-pre space-y-2">
          <span className="text-xs">{`Internetan lancar selama perjalanan\ndengan paket roaming Telkomsel!`}</span>
          <div>
            <Button
              label="Beli Paket Roaming"
              className="text-xs min-h-0 max-w-[224px]"
            />
          </div>
        </div>
      )}
      <div className="absolute bottom-0 right-0">
        <IconRoaming className="rounded-br-2xl" />
      </div>
    </div>
  );
};

export default FlightRoamaxCard;
