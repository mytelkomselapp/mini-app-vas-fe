import FlightIcon from "../../assets/plane-red.svg";
import Button from "../../components/Button";
import { Progress } from "../../components/ui/progress";
import FlightCard from "../../modules/FlightCard";
import { useRef, useState } from "react";
const THRESHOLD_VALUE = 200;

interface Props {
  onClickAll?: () => void;
  onClick?: () => void;
}

const FlightRecommendation: React.FC<Props> = ({ onClickAll, onClick }) => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollTop: 0,
    scrollLeft: 0,
  });
  const scrollDemoRef = useRef(null);

  const handleScroll = () => {
    if (scrollDemoRef.current) {
      const { scrollTop, scrollLeft } = scrollDemoRef.current;
      setScrollPosition({ scrollTop, scrollLeft });
    }
  };
  const progressValue =
    // 300 = (n) item * 100
    (scrollPosition?.scrollLeft / (300 + THRESHOLD_VALUE)) * 100;

  return (
    <>
      <div className="flex space-x-2 items-center mb-4">
        <div>
          <img src={FlightIcon} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Rekomendasi Penerbangan</span>
          <span className="text-xs">
            Cari dari berbagai penerbangan yang tersedia
          </span>
        </div>
      </div>
      <div
        id="scroll-flight"
        ref={scrollDemoRef}
        onScroll={handleScroll}
        className={`flex space-x-2 overflow-auto no-scrollbar ${
          progressValue >= 100 ? "!pr-4" : ""
        }`}
      >
        <FlightCard onClick={onClick} />
        <FlightCard onClick={onClick} />
        <FlightCard onClick={onClick} />
      </div>
      <Progress
        className="w-10 h-[3px] rounded-lg flex mx-auto bg-disabled mt-2"
        value={progressValue < 30 ? 30 : progressValue}
      />
      <Button
        className="my-4 flex flex-row justify-center items-center gap-[2px] relative right-[5px] max-w-[97%] mx-auto"
        label="Lihat Semua Tiket Pesawat"
        isUseArrowIcon
        onClick={onClickAll}
      />
    </>
  );
};
export default FlightRecommendation;
