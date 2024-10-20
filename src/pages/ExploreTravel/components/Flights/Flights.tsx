import FlightCard from "../../modules/FlightCard";

interface Props {
  onClick: () => void;
}

const Flights: React.FC<Props> = ({ onClick }) => {
  return (
    <div>
      <span className="mb-2 text-xs">{`Menampilkan 120 penginapan`}</span>
      <div className="flex flex-col pr-4 gap-2">
        <FlightCard isCheapest onClick={onClick} />
        <FlightCard onClick={onClick} />
        <FlightCard onClick={onClick} />
      </div>
    </div>
  );
};
export default Flights;
