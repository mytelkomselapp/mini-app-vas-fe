import Children from "../../assets/children.svg";
import Adult from "../../assets/adult.svg";
import Plus from "../../assets/ico_plus.svg";
import Minus from "../../assets/ico_minus.svg";
import Baby from "../../assets/baby.svg";
import Button from "../../components/Button";

interface TotalPeopleProps {
  counts: { adults: number; children: number; babies: number };
  handleCountChange: (
    type: "adults" | "children" | "babies",
    operation: "increment" | "decrement"
  ) => void;
  handleCalculateAmountPeople: () => void;
}

const TotalPeople = ({
  counts,
  handleCountChange,
  handleCalculateAmountPeople,
}: TotalPeopleProps) => {
  return (
    <>
      <div className="mx-auto p-4">
        <span className="font-bold">Jumlah Orang</span>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(counts).map((type) => (
          <div key={type} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {type === "adults" && <img src={Adult} />}
              {type === "children" && <img src={Children} />}
              {type === "babies" && <img src={Baby} />}
              <span className="text-xs font-bold">
                {type === "adults"
                  ? "Dewasa"
                  : type === "children"
                  ? "Anak-anak"
                  : "Bayi"}
              </span>
            </div>
            <div className="flex items-center">
              <div
                className="p-2 bg-dividerGrey rounded-full cursor-pointer"
                onClick={() =>
                  handleCountChange(
                    type as "adults" | "children" | "babies",
                    "decrement"
                  )
                }
              >
                <img src={Minus} />
              </div>
              <div className="w-8 text-center">
                {counts[type as "adults" | "children" | "babies"]}
              </div>
              <div
                className="p-2 bg-primaryRed rounded-full cursor-pointer"
                onClick={() =>
                  handleCountChange(
                    type as "adults" | "children" | "babies",
                    "increment"
                  )
                }
              >
                <img src={Plus} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <Button label="Simpan" onClick={handleCalculateAmountPeople} />
      </div>
    </>
  );
};

export default TotalPeople;
