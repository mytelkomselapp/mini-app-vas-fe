import Button from "../../components/Button";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Info } from "../../assets/ico_info.svg";
import { ReactComponent as CheckIcon } from "../../assets/ico_check.svg";
import Checkbox from "../../components/Checkbox";
import BaggageModal from "./components/BaggageModal";
import useToggle from "../../hooks/useToggle";

const OrderSummary = () => {
  const navigate = useNavigate();
  const {
    active: visibleBaggageOption,
    toggleActive: toggleVisibleBaggageOption,
  } = useToggle();
  const handleAddBaggage = () => {
    toggleVisibleBaggageOption();
  };
  const handleNavigateToPayment = () => {};
  return (
    <div className="flex flex-col bg-inactiveGrey h-full">
      <div className="px-4 mb-4 bg-white">
        <Navbar />
      </div>
      <div className="px-4 pb-4">
        <span className="text-base">{"Selesaikan Pemesananmu"}</span>
        <Card className="my-4">
          <div className="flex-col flex gap-2 text-xs">
            <span className="text-sm">{"Bagasi"}</span>
            <span>
              {
                "Termasuk 20 kg bagasi per penumpang. Tambah jika ingin bawa lebih."
              }
            </span>
            <Button
              className="mt-2 flex flex-row justify-center items-center gap-[2px] relative right-[5px] max-w-[97%] mx-auto min-h-[34px]"
              label="Tambah Bagasi"
              style="secondary"
              isUseArrowIcon
              onClick={handleAddBaggage}
            />
          </div>
        </Card>
        <div>
          <span>{"Tambahkan ke Penerbanganmu"}</span>
          <Card className="p-0 pt-3 overflow-hidden mt-3">
            <div>
              <div className="flex items-center justify-between flex-1 px-3">
                <div className="flex-col flex gap-2 text-xs">
                  <span className="text-sm">{"Jaminan Refund 100%"}</span>
                  <span className="text-sm font-semibold">
                    {"Rp67.000/pax"}
                  </span>
                </div>
                <div className="flex-col flex ml-auto">
                  <Checkbox checked={true} onClick={() => {}} />
                </div>
              </div>
              <div className="flex-col flex gap-2 text-xs bg-solidRed bg-opacity-5 p-4 mt-4">
                <div className="flex items-center gap-2">
                  <div>
                    <CheckIcon />
                  </div>
                  <span className="text-[10px]">
                    {
                      "Batalkan penerbangan dengan alasan apapun hingga 24 jam sebelum keberangkatan"
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-[2px]">
                  <CheckIcon />
                  <span className="text-[10px]">
                    {"Mencakup SEMUA alasan, termasuk alasan pribadi"}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-4">
          <div className="flex-1 grid gap-y-2">
            <div className="flex-row flex flex-1 text-xs justify-between items-center">
              <span>{"Total Harga 1 Tiket"}</span>

              <div className="ml-auto">
                <span className="font-semibold text-xs">{"Rp1.989.000"}</span>
              </div>
            </div>

            <div className="flex-row flex flex-1 text-xs justify-between">
              <span>{"Jaminan Refund 100%"}</span>

              <div className="ml-auto">
                <span className="font-semibold text-xs">{"Rp67.000"}</span>
              </div>
            </div>
            <div className="w-full h-[1px] flex bg-dividerGrey mt-2" />
            <div className="flex-row flex flex-1 text-xs justify-between items-center">
              <div className="flex flex-col">
                <span className="text-base font-semibold">{"Total harga"}</span>
                <span className="text-grey">{"Sudah termasuk pajak"}</span>
              </div>

              <div className="ml-auto">
                <span className="font-semibold text-base text-solidRed">
                  {"Rp2.056.000"}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-4 items-center gap-2 bg-solidRed bg-opacity-5">
          <Info />
          <div className="flex-row flex flex-1 text-xs justify-between items-center">
            <span>
              {
                "Mohon periksa kembali pesanan kamu sebelum melanjutkan ke pembayaran"
              }
            </span>
          </div>
        </Card>

        <Button
          className="my-4 flex flex-row justify-center items-center gap-[2px] relative right-[5px] max-w-[97%] mx-auto"
          label="Lanjut ke Pembayaran"
          onClick={handleNavigateToPayment}
        />
      </div>
      <BaggageModal
        open={visibleBaggageOption}
        onClose={toggleVisibleBaggageOption}
      />
    </div>
  );
};

export default OrderSummary;
