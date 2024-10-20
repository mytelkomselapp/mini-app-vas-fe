import Button from "../../components/Button";

interface ClassOptionProps {
  selectedClass: string;
  handleSelectClass: (classType: string) => void;
  handleCloseClass: () => void;
}

const ClassOption = ({
  selectedClass,
  handleSelectClass,
  handleCloseClass,
}: ClassOptionProps) => {
  return (
    <>
      <div className="mx-auto p-4">
        <span className="font-bold">Kelas</span>
      </div>
      <div className="p-4 space-y-4">
        {["economy", "business", "firstClass"].map((classType) => (
          <div
            key={classType}
            className="flex items-center justify-between py-3 border-b"
          >
            <span className="text-sm font-semibold">
              {classType === "economy"
                ? "Ekonomi"
                : classType === "business"
                ? "Business"
                : "First Class"}
            </span>
            <input
              type="radio"
              name="flightClass"
              checked={selectedClass === classType}
              onChange={() => handleSelectClass(classType)}
              className="accent-black w-5 h-5"
            />
          </div>
        ))}
      </div>
      <div className="p-4">
        <Button label="Simpan" onClick={handleCloseClass} />
      </div>
    </>
  );
};

export default ClassOption;
