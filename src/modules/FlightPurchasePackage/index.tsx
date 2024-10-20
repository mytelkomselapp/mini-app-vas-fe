import Button from "../../components/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { begin_checkout } from "../../network/analytics/tracker";
import { FlightFreemiumPackageData } from "../../network/types/response-props";

interface FlightPackage {
  data?: FlightFreemiumPackageData;
  onClick?: () => void;
  disabled?: boolean;
}

const FlightPurchasePackage: React.FC<FlightPackage> = ({
  data,
  onClick,
  disabled,
}) => {
  return (
    <>
      <Accordion className="bg-white" type="single" collapsible>
        <AccordionItem className="bg-white" value="item-1">
          <AccordionTrigger className="bg-white">
            <div className="flex justify-between w-full bg-white ">
              <p className="text-sm font-semibold">Harga Total</p>
              <p className="text-sm font-semibold">
                {"Rp" + parseFloat(String(data?.price))?.toLocaleString("id") ||
                  "0"}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white">
            <div className="flex justify-between bg-white">
              <p className="text-xs">{data?.name}</p>
              <p className="text-xs">
                {"Rp" + parseFloat(String(data?.price))?.toLocaleString("id") ||
                  "0"}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        label="Beli Sekarang"
        onClick={() => {
          begin_checkout(
            data?.price,
            "1",
            "Tracking Flight Package",
            [
              {
                item_id: data?.id.toString(),
                item_name: data?.name,
                index: data?.id,
                price: data?.price,
                item_list_id: "1",
                item_list_name: "Tracking Flight Package",
              },
            ],
            "Flight Tracking Package Detail",
            ""
          );
          onClick?.();
        }}
        disabled={disabled}
      />
    </>
  );
};

export default FlightPurchasePackage;
