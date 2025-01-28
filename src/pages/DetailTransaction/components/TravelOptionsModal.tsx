import React, { useState } from "react";
import BottomSheet from "../../components/BottomSheet";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";
import { ReactComponent as TicketIcon } from "../../assets/ticket.svg";
import { ReactComponent as BluebirdIcon } from "../../assets/bluebird.svg";
import { ReactComponent as GojekIcon } from "../../assets/gojek.svg";
import { ReactComponent as TravelinIcon } from "../../assets/travelin.svg";

import TransferOptionsModal from "./TransferModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TravelOption: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  partners: React.FunctionComponent<React.SVGProps<SVGSVGElement>>[];
  onClick: () => void;
}> = ({ icon, title, description, partners, onClick }) => (
  <>
    <div
      className="flex items-center justify-between py-3 border-b border-gray-200"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-textPrimary">{title}</p>
          <p className="text-xs text-textPrimary mb-1">{description}</p>
          {partners.length > 0 && (
            <div className="inline-flex items-center space-x-1 p-2 bg-inactiveGrey rounded-lg">
              {partners.map((Partner, index) => (
                <Partner key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
      <ChevronRight />
    </div>
  </>
);

const TravelOptionsModal: React.FC<Props> = ({ open, onClose }) => {
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const travelOptions = [
    {
      title: "Airport Transfer",
      description: "perjalanan ke bandara tanpa ribet.",
      icon: "plane",
      partners: [BluebirdIcon, GojekIcon],
      showModal: openTransferModal,
      setModal: setOpenTransferModal,
    },
    {
      title: "Porter Bandara",
      description: "Bebas repot dengan layanan angkut bagasi pribadi.",
      icon: "plane",
      partners: [TravelinIcon],
      showModal: false,
      setModal: () => {},
    },
    {
      title: "Airport Lounge",
      description: "Nikmati kenyamanan eksklusif sebelum penerbangan.",
      icon: "plane",
      partners: [],
      showModal: false,
      setModal: () => {},
    },
    {
      title: "Paket Roaming",
      description: "Tetap terhubung di mana pun tanpa khawatir.",
      icon: "plane",
      partners: [],
      showModal: false,
      setModal: () => {},
    },
    {
      title: "Sewa Kendaraan",
      description: "Mobilitas lancar dengan pilihan sewa kendaraan fleksibel.",
      icon: "plane",
      partners: [BluebirdIcon, GojekIcon],
      showModal: false,
      setModal: () => {},
    },
    {
      title: "Voucher",
      description:
        "Hemat lebih banyak dengan voucher spesial untuk perjalanan Anda.",
      icon: "ticket",
      partners: [],
      showModal: false,
      setModal: () => {},
    },
  ];
  return (
    <>
      <BottomSheet open={open} onClose={onClose}>
        <div className="flex flex-col items-center gap-y-2 p-[16px] mt-2 w-full">
          <h1 className="text-base font-semibold mb-1">
            Lengkapi Perjalananmu
          </h1>

          <div className="w-full">
            {travelOptions.map((option, index) => (
              <TravelOption
                key={index}
                icon={<TicketIcon />}
                title={option.title}
                description={option.description}
                partners={option.partners}
                onClick={() => option.setModal(true)}
              />
            ))}
          </div>
        </div>
      </BottomSheet>

      <TransferOptionsModal
        open={openTransferModal}
        onClose={() => setOpenTransferModal(false)}
      />
    </>
  );
};

export default TravelOptionsModal;
