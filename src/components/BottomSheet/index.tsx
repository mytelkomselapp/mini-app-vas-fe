import { Sheet } from "react-modal-sheet";
import style from "../../modules/FlightLandingCardMenu/components/FlightLandingModal/FlightLandingModal.module.css";
interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  disableDrag?: boolean;
  detent?: "content-height" | "full-height";
}

const BottomSheet = ({
  open,
  onClose,
  children,
  disableDrag = false,
  detent = "content-height",
}: BottomSheetProps) => {
  return (
    <Sheet
      isOpen={open}
      onClose={onClose}
      detent={detent}
      className={open ? style["container"] : ""}
      disableDrag={disableDrag}
    >
      <Sheet.Backdrop onTap={onClose} className={style["backdrop"]} />
      <Sheet.Container className={"!rounded-t-[20px]"}>
        <Sheet.Header>
          <div className="flex flex-col items-center gap-y-2 justify-between py-[16px]">
            <div className="bg-slate-200 rounded-md h-[6px] w-[50px]" />
          </div>
        </Sheet.Header>
        <Sheet.Content className="mt-2">
          <Sheet.Scroller>{children}</Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default BottomSheet;
