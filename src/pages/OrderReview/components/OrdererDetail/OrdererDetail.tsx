import * as React from "react";

import useToggle from "../..//../hooks/useToggle";

import { ReactComponent as ChevronRight } from "../..//../assets/chevron-right.svg";
import { OrdererDataProps, useOrdererData } from "../..//../store/travel";

import Card from "../..//../components/Card";
import AlertWarning from "../AlertWarning";
import { FormOrdererModal } from "../../modals";

const OrdererDetail: React.FC = () => {
  const { orderer, setOrderer } = useOrdererData();

  const { active: visibleModalForm, toggleActive: toggleVisibleModalForm } =
    useToggle();

  const handleSubmitForm = (data: OrdererDataProps) => {
    setOrderer(data);
  };

  const renderEmailText = React.useCallback(() => {
    if (!orderer?.email)
      return <span className="text-[12] text-[#ED0226]">Belum ada email</span>;

    return orderer?.email;
  }, [orderer?.email]);

  const renderPhoneNumberText = React.useCallback(() => {
    if (!orderer?.phoneNumber)
      return (
        <span className="text-[12] text-[#ED0226]">Belum ada nomor hp</span>
      );

    return orderer?.phoneNumber;
  }, [orderer?.phoneNumber]);

  return (
    <Card className="mt-2">
      <div onClick={toggleVisibleModalForm} className="flex-1 grid gap-y-2">
        <div className="flex-row flex flex-1 text-xs justify-between items-center">
          <span className="text-sm font-semibold">
            {/* default value jika belum ada nama maka tanggal */}
            {orderer?.name ?? "Kamis, 5 Sep 2024"}
          </span>
          <ChevronRight />
        </div>
        <span className="text-sm">
          {renderPhoneNumberText()} • {renderEmailText()}
        </span>
        <AlertWarning />
      </div>

      <FormOrdererModal
        onClose={toggleVisibleModalForm}
        open={visibleModalForm}
        onSubmit={handleSubmitForm}
      />
    </Card>
  );
};

export default OrdererDetail;
