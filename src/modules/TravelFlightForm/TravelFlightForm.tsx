import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { Switch } from "../../components/ui/switch";
import moment from "moment";
import { ReactComponent as Exchange } from "../../assets/ico_exchange_red.svg";

interface TravelFlightFormProps {
  date: Date | undefined;
  returnDate: Date | undefined;
  keywordDeparture: string;
  keywordArrival: string;
  isRoundTrip: boolean;
  totalPeople: number | undefined;
  selectedClass: string;
  showDepartureCalendar: () => void;
  showReturnCalendar: () => void;
  openAmountModal: () => void;
  openClassModal: () => void;
  openDepartureModal: () => void;
  openArrivalModal: () => void;
  toggleRoundTrip: () => void;
  handleSearchTravel: () => void;
  buttonLabel?: string;
}

const getClassLabel = (classType: string) => {
  switch (classType) {
    case "economy":
      return "Ekonomi";
    case "business":
      return "Business";
    case "firstClass":
      return "First Class";
    default:
      return "";
  }
};

const TravelFlightForm = ({
  date,
  returnDate,
  keywordDeparture,
  keywordArrival,
  isRoundTrip,
  totalPeople,
  selectedClass,
  showDepartureCalendar,
  showReturnCalendar,
  openDepartureModal,
  openAmountModal,
  openClassModal,
  openArrivalModal,
  toggleRoundTrip,
  handleSearchTravel,
  buttonLabel = "Cari",
}: TravelFlightFormProps) => {
  return (
    <>
      <div className="flex gap-2">
        <div className="w-1/2">
          <span className="text-textSecondary text-xs">Dari</span>
        </div>
        <div className="w-1/2">
          <span className="text-textSecondary text-xs">Dari</span>
        </div>
      </div>
      <div className="flex relative gap-2 mb-4">
        <div className="w-1/2">
          <InputField
            parentClassName="border rounded-lg px-4 py-2"
            id="departure"
            value={keywordDeparture}
            placeholder="Pilih Destinasi"
            caretColor="caret-transparent"
            autoComplete="off"
            onClick={openDepartureModal}
            readOnly={true}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-[#ffeced] rounded-full p-1">
            <Exchange />
          </div>
        </div>

        <div className="w-1/2">
          <InputField
            parentClassName="border rounded-lg px-4 py-2"
            id="arrival"
            value={keywordArrival}
            placeholder="Pilih Destinasi"
            caretColor="caret-transparent"
            autoComplete="off"
            onClick={openArrivalModal}
            readOnly={true}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 items-center mb-4">
        <span className="text-xs">Perjalanan pulang pergi?</span>
        <Switch
          id="airplane-mode"
          className="data-[state=checked]:bg-blueNavy data-[state=checked]:border-blueNavy data-[state=unchecked]:bg-inputGroup border-[#DAE0E9] border-2"
          checked={isRoundTrip}
          onCheckedChange={toggleRoundTrip}
        />
      </div>
      <div className={`flex relative gap-2 mb-4`}>
        <div className={`${isRoundTrip ? "w-1/2" : "w-full"}`}>
          <span className="text-textSecondary text-xs">Tanggal Pergi</span>
          <InputField
            parentClassName="border rounded-lg px-2 py-2"
            id="tanggal-pergi"
            placeholder="Pilih Tanggal"
            caretColor="caret-transparent"
            autoComplete="off"
            type="text"
            value={date ? moment(date).format("DD MMM YYYY") : undefined}
            readOnly={true}
            onClick={showDepartureCalendar}
          />
        </div>

        {isRoundTrip && (
          <div className="w-1/2 transition-all">
            <span className="text-textSecondary text-xs">Tanggal Pulang</span>
            <InputField
              parentClassName="border rounded-lg px-2 py-2"
              id="tanggal-pulang"
              placeholder="Pilih Tanggal"
              caretColor="caret-transparent"
              autoComplete="off"
              type="text"
              value={
                returnDate
                  ? moment(returnDate).format("DD MMM YYYY")
                  : undefined
              }
              readOnly={true}
              onClick={showReturnCalendar}
            />
          </div>
        )}
      </div>
      <div className="flex relative gap-2 mb-4">
        <div className="w-1/2">
          <span className="text-textSecondary text-xs">Jumlah Orang</span>
          <InputField
            parentClassName="border rounded-lg px-2 py-2"
            id="jumlah-orang"
            placeholder="Jumlah Orang"
            caretColor="caret-transparent"
            autoComplete="off"
            value={totalPeople ? `${totalPeople} orang` : undefined}
            onClick={openAmountModal}
            readOnly={true}
          />
        </div>
        <div className="w-1/2">
          <span className="text-textSecondary text-xs">Kelas</span>
          <InputField
            parentClassName="border rounded-lg px-2 py-2"
            id="kelas"
            placeholder="Pilih Kelas"
            caretColor="caret-transparent"
            autoComplete="off"
            value={getClassLabel(selectedClass)}
            readOnly={true}
            onClick={openClassModal}
          />
        </div>
      </div>
      <Button label={buttonLabel} onClick={handleSearchTravel} />
    </>
  );
};

export default TravelFlightForm;
