import Button from "../../../../../../components/Button";
import Warning from "../../../../../../assets/ico-warning.svg";
import CalibrationAnimation from "../../../../assets/gif/calibration.gif";

interface ReminderSettingProps {
  disableConfirmation: () => void;
  cancelDisable: () => void;
}

const DisableConfirmation = ({
  disableConfirmation,
  cancelDisable,
}: ReminderSettingProps) => {
  return (
    <>
      <div className="flex flex-col items-center h-full">
        <img
          src={Warning}
          alt="Warning"
          style={{ width: "100px", height: "100px" }}
        />
        {/* <img src={CalibrationAnimation} alt='Confirmation' width={200} height={200} /> */}
        <span className="text-center text-[18px] font-batikSans font-bold">
          Kamu yakin ingin menonaktifkan semua pengingat waktu sholat?
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Button
          label="Ya, Hentikan"
          onClick={disableConfirmation}
          className="border-0"
        />
        <Button onClick={cancelDisable} style="secondary" label="Tidak Jadi" />
      </div>
    </>
  );
};

export default DisableConfirmation;
