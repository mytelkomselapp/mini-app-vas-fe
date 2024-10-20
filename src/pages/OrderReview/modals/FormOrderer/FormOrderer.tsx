import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import * as React from "react";
import { NumericFormat } from "react-number-format";
import { OrdererDataProps, useOrdererData } from "../../store/travel";
import { isBetweenRange, isEmpty, isValidEmail } from "../../lib/utils";
import { AlertWarning } from "../../components";

export interface FormPemesanProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: OrdererDataProps) => void;
}

const FormPemesan: React.FC<FormPemesanProps> = ({
  open = false,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = React.useState<OrdererDataProps>();

  const { orderer } = useOrdererData();

  const isButtonDisabled = React.useMemo(() => {
    const nameError = isEmpty(form?.name ?? "");
    const phoneNumberError = !isBetweenRange(form?.phoneNumber ?? "", 10, 14);
    const emailError = !isValidEmail(form?.email ?? "");

    return !!nameError || !!phoneNumberError || !!emailError;
  }, [form]);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event?.target?.name;
    const value = event?.target?.value;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    onClose?.();
    onSubmit?.(form as OrdererDataProps);
  };

  React.useEffect(() => {
    if (!!orderer) setForm(orderer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, orderer]);

  return (
    <BottomSheet
      detent="content-height"
      open={open}
      onClose={onClose}
      disableDrag
    >
      <p className="text-center text-[16px] font-[600] text-primary">
        Detail Pemesan
      </p>
      <div className="flex flex-col gap-[20px] my-[20px] px-[20px] overflow-y-auto">
        <AlertWarning />

        <div className="flex flex-col gap-y-2">
          <span className="text-textSecondary text-xs">Nama</span>
          <input
            readOnly={false}
            name="name"
            type="text"
            className="h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 border-gray-300"
            placeholder="Masukkan nama disini"
            value={form?.name ?? ""}
            onChange={onChangeText}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="text-textSecondary text-xs">Nomor HP</span>
          <NumericFormat
            name="phoneNumber"
            pattern="\d*"
            placeholder={"Masukan nomor hp disini"}
            className="h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 border-gray-300"
            maxLength={12}
            allowLeadingZeros
            value={form?.phoneNumber ?? ""}
            onChange={onChangeText}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="text-textSecondary text-xs">Email</span>
          <input
            readOnly={false}
            name="email"
            type="text"
            className="h-[50px] text-sm w-full outline-none rounded-[12px] border px-4 border-gray-300"
            placeholder="Masukkan email disini"
            value={form?.email ?? ""}
            onChange={onChangeText}
          />
          <span className="text-textSecondary text-xs">
            E-tiket akan dikirimkan juga ke email ini.
          </span>
        </div>
      </div>
      <div className="px-[16px] pb-[16px]">
        <Button
          label="Simpan"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        />
      </div>
    </BottomSheet>
  );
};

export default FormPemesan;
