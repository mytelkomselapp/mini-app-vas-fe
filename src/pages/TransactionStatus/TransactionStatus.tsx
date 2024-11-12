import Failed from "../../assets/failed.svg";
import Thumbs from "../../assets/thumbs-up.svg";
import Pending from "../../assets/waiting.svg";
import Button from "../../components/Button";
import LoadingScreen from "../../components/LoadingScreen";
import Show from "../../components/Show";
import { useBuyPackage, useFollowFlight } from "../../network";
import { buttonClick, screenView } from "../../network/analytics/tracker";
import { FlightBuyFreemiumPackageProps } from "../../network/types/response-props";
import {
  useSaveTrackingPayload,
  useWeboptinTokenData,
} from "../../store/flight";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import circleCheck from "./iconPaymentAssets/circle-check.svg";
import cross from "./iconPaymentAssets/cross.svg";
import hollowWhite from "./iconPaymentAssets/hollow-white.svg";
import hollow from "./iconPaymentAssets/hollow.svg";
import chevronRed from "./iconPaymentAssets/chevron-red.svg";
import { View } from "@tarojs/components";
import { handleNavigate } from "../../lib/utils";

const TransactionStatus = () => {
  interface PropTypes {
    data?: FlightBuyFreemiumPackageProps;
    isActive: string;
    createdAt: string;
    transactionId: string;
    paymentMethod: string;
  }
  const [buyDetail, setBuyDetail] = useState<PropTypes>({
    isActive: "payment-failed",
    createdAt: "",
    transactionId: "",
    paymentMethod: "",
  });

  const navigate = useNavigate();
  const { trackFlight, setTrackFlight } = useSaveTrackingPayload();
  const { mutateAsync: postBuyPackage, isLoading: loadingBuyPackage } =
    useBuyPackage();
  const { mutateAsync: postFollowFlight, isLoading: loadingFollowFlight } =
    useFollowFlight();
  const { setSid, sid } = useWeboptinTokenData();
  // const statusPayment = location?.pathname
  //   .slice(location.pathname.lastIndexOf("/"), location.pathname.length)
  //   ?.replace("/", "");

  const getTrxDetail = async () => {
    try {
      const buyPackage = await postBuyPackage({ package_id: Number(sid) });
      console.log({ buyPackage });
      setBuyDetail({
        createdAt: buyPackage?.data?.data?.created_at,
        data: buyPackage?.data?.data,
        isActive: buyPackage?.data?.data?.package
          ? "payment-success"
          : "payment-failed",
        transactionId: buyPackage?.data?.data?.transaction_id,
        paymentMethod: buyPackage?.data?.data?.payment_method,
      });
      doFollowTrack();
    } catch (error) {
      setBuyDetail({
        data: buyDetail?.data,
        isActive: "payment-failed",
        createdAt: buyDetail?.createdAt,
        transactionId: buyDetail?.transactionId,
        paymentMethod: buyDetail?.paymentMethod,
      });
      console.error(error);
    }
  };

  const doFollowTrack = async () => {
    try {
      if (trackFlight) {
        const followFlight = await postFollowFlight(trackFlight);
        if (followFlight?.data?.meta?.status === "success") {
          setTrackFlight(null);
          setSid(null);
        } else {
          console.error(followFlight);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusPayment = () => {
    switch (buyDetail?.isActive) {
      case "payment-success":
        return {
          icon: <img src={Thumbs} className="w-[88px] h-[88px]" />,
          title: "Transaksi Berhasil",
          subtitle: "Pembayaran kamu berhasil, paket telah diaktifkan",
          status: buyDetail?.isActive,
        };
      case "payment-failed":
        return {
          icon: <img src={Failed} className="w-[88px] h-[88px]" />,
          title: "Pembayaran Gagal",
          subtitle:
            "Verifikasi pembayaran tidak berhasil, silahkan ulangi pembayaran",
          status: buyDetail?.isActive,
        };
      case "payment-waiting":
      case "payment-pending":
        return {
          icon: <img src={Pending} className="w-[88px] h-[88px]" />,
          title: "Transaksi dalam Proses",
          subtitle: "Mohon menuggu verifikasi pembayaran dan aktivasi paket",
          status: buyDetail?.isActive,
        };
      default:
        console.error({ statusPayment: buyDetail?.data });
        return {
          icon: "",
          title: "-",
          subtitle: "-",
          status: buyDetail?.isActive,
        };
    }
  };
  const { icon, title, subtitle, status } = getStatusPayment();
  useEffect(() => {
    console.log({ sid });
    if (sid) {
      getTrxDetail();
      console.log({ sidSuccess: sid });
    } else {
      console.log("exception", sid);
    }
  }, [sid]);

  useEffect(() => {
    screenView("Flight Tracking Status Payment", "/payment-status"); //fire screen view tracker
  }, []);

  return (
    <View>
      <div className="text-[16px] font-sans bg-[#EFF1F4] flex flex-col items-center justify-center pt-4">
        Status Pembayaran
      </div>
      <Show
        when={!loadingBuyPackage}
        fallbackComponent={<LoadingScreen text="Loading..." />}
      >
        <div className="flex flex-col items-center bg-[#EFF1F4] h-4/5">
          <div className="p-2 max-w-sm w-full">
            <div className="flex justify-center mb-4 mt-5">{icon}</div>
            <h2 className="text-center text-sm font-sans font-semibold mb-2">
              {title}
            </h2>
            <p className="text-center text-gray-600 mb-4 text-xs">{subtitle}</p>
            <div className="bg-gray-100 p-4 rounded-xl mb-4 border-[1px] border-white">
              <h3 className="font-semibold mb-3 text-xs">Status Transaksi</h3>

              <ul className="space-y-2 relative">
                <li className="flex items-center mb-6">
                  <Circle
                    type={
                      status === "payment-success"
                        ? "circle-check"
                        : status === "payment-waiting" ||
                          status === "payment-pending"
                        ? "hollow"
                        : status === "payment-failed"
                        ? "cross"
                        : "circle-check"
                    }
                    color={
                      status === "payment-success"
                        ? "#008E53"
                        : status === "payment-failed"
                        ? "inherit"
                        : "#008E53"
                    }
                  />

                  <span className="ml-2 text-grey text-xs">
                    Verifikasi pembayaran berhasil
                  </span>
                </li>

                <div className="absolute left-2 right-0 top-0 bottom-0">
                  <Stroke />
                </div>
                <li className="flex items-center mt-[24px]">
                  <Circle
                    type={
                      status === "payment-success"
                        ? "circle-check"
                        : status === "payment-waiting" ||
                          status === "payment-pending" ||
                          status === "payment-failed"
                        ? "hollow-white"
                        : "circle-check"
                    }
                    color={
                      status === "payment-success"
                        ? "#008E53"
                        : status === "payment-failed"
                        ? "#00FFFFFF"
                        : status === "payment-waiting" ||
                          status === "payment-pending"
                        ? "#FFFF"
                        : "#008E53"
                    }
                  />
                  <span className="ml-2 text-grey text-xs">
                    Aktivasi paket berhasil
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border-[1px] border-white text-xs font-sans ">
              <h3 className="font-semibold  mb-3 text-xs">Detail Transaksi</h3>

              <p className="flex mb-2 text-[#353941]">
                Tanggal:{" "}
                <span className="ml-auto">
                  {moment(buyDetail?.createdAt)?.isValid()
                    ? moment(buyDetail?.createdAt)?.format("DD/MM/YYYY")
                    : "-"}
                </span>
              </p>
              <p className="flex mb-2 text-[#353941]">
                No. Transaksi:{" "}
                <span className=" ml-auto">
                  {buyDetail?.transactionId ?? "-"}
                </span>
              </p>
              <p className="flex mb-2 text-[#353941]">
                Metode Pembayaran:{" "}
                <span className="first-letter:uppercase ml-auto">
                  {buyDetail?.paymentMethod || "-"}
                </span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="311"
                height="1"
                viewBox="0 0 311 1"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 0.5C0 0.223858 0.235202 0 0.525338 0H310.475C310.765 0 311 0.223858 311 0.5C311 0.776142 310.765 1 310.475 1H0.525338C0.235202 1 0 0.776142 0 0.5Z"
                  fill="#EFF1F4"
                />
              </svg>
              <p className="flex mb-2 mt-2 text-[#353941]">
                {buyDetail?.data?.package?.quota || "-"}
                {isNaN(Number(buyDetail?.data?.package?.quota)) ? "" : "x"}{" "}
                Ikuti Penerbangan
                <span className="ml-auto text-[#353941]">
                  {buyDetail?.data?.package?.price?.toLocaleString("id") || "-"}
                </span>
              </p>
              <p className="font-semibold flex">
                Total Harga:{" "}
                <span className="ml-auto">
                  {buyDetail?.data?.package?.price?.toLocaleString("id") || "-"}
                </span>
              </p>
            </div>
            <div className="px-4">
              <p className="text-xs text-[#353941] mt-[32px]">
                Punya pertanyaan tentang transaksi ini?
              </p>
              <p
                className="text-xs text-solidRed mt-2 flex mb-[37px]"
                onClick={() =>
                  window.open("https://my.telkomsel.com/app/chatbot", "_blank")
                }
              >
                {"Dapatkan Bantuan"}
                <img src={chevronRed} alt="arrow" className="w-4 h-4" />
              </p>
            </div>
          </div>
        </div>
        <div className="text-center bg-white p-4">
          <Button
            label={
              status === "payment-failed"
                ? "Ulangi Pembayaran"
                : "Cek Penerbangan"
            }
            className="h-12"
            onClick={() => {
              if (status === "payment-failed") {
                buttonClick(
                  "Retry Payment",
                  "Retry Payment",
                  "Flight Tracking Status Payment",
                  "/payment-status"
                );
                handleNavigate("/pages/SubscriptionPackage/index");
              } else {
                buttonClick(
                  "Check Flight",
                  "Check Flight",
                  "Flight Tracking Status Payment",
                  "/payment-status"
                );
                handleNavigate("/pages/FlightFollowing/index");
              }
            }}
          />
          <Button
            style="secondary"
            label="Kembali ke Lacak Pesawat"
            className="mt-4 h-12"
            onClick={() => {
              buttonClick(
                "Back to Track Flight",
                "Back to Track Flight",
                "Flight Tracking Status Payment",
                "/payment-status"
              );
              handleNavigate("/pages/LandingPagePesawat/index");
            }}
          />
          {/* <button className="bg-red-500 text-white py-2 px-4 rounded-full mb-2 w-full">
          Cek Penerbangan
        </button>
        <button className="bg-gray-300 text-black py-2 px-4 rounded-full w-full">
          Kembali ke Lacak Pesawat
        </button> */}
        </div>
      </Show>
    </View>
  );
};

const Circle = ({
  type,
  color,
}: {
  type?: string;
  color?: string | "#008E53";
}) => {
  return (
    <div
      className={`relative z-10  rounded-full w-5 h-5 flex items-center justify-center ${
        type === "hollow"
          ? "bg-inherit"
          : type === "circle-check"
          ? `bg-[#008E53]`
          : "bg-[${color}]"
      }`}
    >
      {type === "hollow" ? (
        <img src={hollow} alt="hollow" />
      ) : type === "hollow-white" ? (
        <img src={hollowWhite} alt="hollow-white" />
      ) : type === "cross" ? (
        <img src={cross} alt="cross" />
      ) : (
        <img src={circleCheck} alt="circle-check" />
      )}
    </div>
  );
};

const Stroke = () => {
  return <div className="h-[38px] bg-[#EDECF0] flex w-[3px]" />;
};

export default TransactionStatus;
