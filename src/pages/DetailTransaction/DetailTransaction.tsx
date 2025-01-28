import React, { useState } from "react";
import Button from "../..//..//../components/Button";
import Navbar, { NavColor } from "../..//..//../components/Navbar";
import GarudaIcon from "../..//..//../assets/mosque.svg";
import FlightIcon from "../..//..//../assets/flight.svg";
import FlightGlobeIcon from "../..//..//../assets/flight-globe.svg";
import TicketIcon from "../..//..//../assets/ticket.svg";
import ChevronRight from "../..//..//../assets/chevron-right.svg";
import TravelOptionsModal from "./components/TravelOptionsModal";
// import PlaneIcon from "../..//..//../assets/ico-plane.svg";

const DetailTransaction: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className=" h-full flex flex-col">
      <div className="px-4">
        <Navbar color={NavColor.Dark} hiddenAction={true} />
      </div>
      <div className="flex flex-col gap-4 p-4 bg-inactiveGrey flex-grow overflow-auto">
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">14 SEP 2024</span>
            <span className="text-sm text-gray-500">
              KODE BOOKING <span className="text-red-500">JNCYF12</span>
            </span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-left">
              <h2 className="text-2xl">T3 CGK</h2>
              <p className="text-sm text-textSecondary">Soekarno-Hatta</p>
              <p className="text-sm text-textSecondary">
                International Airport
              </p>
              <p className="text-lg mt-1">14:00</p>
            </div>
            <div className="mx-4">
              <img src={FlightIcon} />
            </div>
            <div className="text-right">
              <h2 className="text-2xl">T1 SIN</h2>
              <p className="text-sm text-textSecondary">Changi</p>
              <p className="text-sm text-textSecondary">
                International Airport
              </p>
              <p className="text-lg mt-1">15:10</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-textSecondary mb-4">
            <img src={GarudaIcon} />
            <span>GA147 • Direct • 1h 50m</span>
          </div>

          <div className="w-full flex items-center justify-center mb-4">
            <div className="w-full border-t border-dashed border-gray-300"></div>
          </div>

          <div className="flex justify-between mb-4 bg-inactiveGrey px-4 py-2 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Check-in Counter</p>
              <p className="text-lg font-semibold">G01-G02</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Boarding Gate</p>
              <p className="text-lg font-semibold">C22</p>
            </div>
          </div>

          <div className="w-full mb-4">
            <p className="px-3 py-1 w-full rounded-[120px] text-[10px]/[14px] text-[#0452ad] font-semibold first-letter:uppercase text-[#0452ad] bg-[#dfebfb] text-center">
              On Schedule
            </p>
          </div>

          <div className="w-full flex items-center justify-center mb-4">
            <div className="w-full border-t border-dashed border-gray-300"></div>
          </div>

          <Button
            onClick={() => setOpenModal(true)}
            className="w-full bg-white text-red-500 border border-red-500 rounded-full py-2 px-4 font-semibold"
            label="Tambah Add-on +"
          />
        </div>

        <div className="mt-4 bg-white rounded-lg overflow-hidden">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={FlightGlobeIcon} />
                <span className="text-sm">Ramadan Fitri</span>
              </div>
              <img src={ChevronRight} />
            </div>
          </div>
          <div className="w-full h-px bg-gray-200"></div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={TicketIcon} />
                <span className="text-sm">Lihat E-Ticket</span>
              </div>
              <img src={ChevronRight} />
            </div>
          </div>
        </div>
      </div>

      <TravelOptionsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default DetailTransaction;
