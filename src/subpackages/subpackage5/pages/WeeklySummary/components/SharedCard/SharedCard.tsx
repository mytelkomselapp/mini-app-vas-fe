import { Canvas, Image, View } from "@tarojs/components";
import BgShare from "../../../../../../assets/bg/share/bg-share.png";
import LogoMyTsel from "../../../../../../assets/bg/share/logo-mytsel.png";
import RekapRamadhan from "../../../../../../assets/bg/share/rekap_ramadan.png";
import TotalIbadahIcon from "../../../../../../assets/bg/share/total-ibadah-icon.png";
import StampIcon from "../../../../../../assets/bg/share/icon-stamp-gamehub.png";
import RafiIcon from "../../../../../../assets/bg/share/icon-rafi.png";
import QRCode from "../../../../../../assets/bg/share/QR-fita.png";
import Taro, { useReady } from "@tarojs/taro";
import {
  drawBottomRoundedRect,
  drawFlippedBackground,
  drawRoundedRect,
  drawTopRoundedRect,
} from "../../../../../../lib/utils";

export interface SharedCardProps {}

const SharedCard: React.FC<SharedCardProps> = ({}) => {
  const handleBack = () => {
    Taro.navigateBack();
  };

  const shareImage = (filePath: string) => {
    Taro.showShareImageMenu({
      path: filePath,
      success: () =>
        Taro.showToast({ title: "Success share content", icon: "success" }),
      fail: (err) => console.error("Failed to share content:", err),
    });
  };

  useReady(() => {});

  const handleShare = () => {
    // Load custom font
    Taro.loadFontFace({
      family: "Sans",
      source: "url('/assets/fonts/TelkomselBatikSans-Regular.ttf')",
      success: () => console.log("Font loaded successfully"),
      fail: (err) => console.error("Font load failed", err?.errMsg),
    });

    const ctx = Taro.createCanvasContext("shareCanvas");

    ctx.save(); // Save canvas state before clipping
    drawTopRoundedRect(ctx, 0, 0, 375, 395, 16); // (x, y, width, height, radius)
    ctx.clip();

    drawFlippedBackground(ctx, BgShare, 0, 0, 375, 395);
    ctx.restore(); //

    // Logo
    ctx.drawImage(LogoMyTsel, 250, 20, 100, 20);

    // Title Image
    ctx.drawImage(RekapRamadhan, 130, 80, 120, 120);

    // Text
    ctx.font = "bold 14px Sans";
    ctx.setFontSize(14);
    ctx.setFillStyle("white");
    ctx.setTextAlign("center");
    ctx.fillText("Kamu termasuk top 1% yang paling rajin", 187, 226);
    ctx.fillText("ibadah di minggu ke-1 Ramadan!", 187, 246);

    // Total Ibadah Card
    ctx.setFillStyle("white");
    drawRoundedRect(ctx, 50, 270, 140, 60, 16);
    ctx.fill();
    ctx.setShadow(0, 4, 8, "rgba(0, 0, 0, 0.1)");
    ctx.drawImage(TotalIbadahIcon, 60, 280, 24, 24);
    ctx.setFontSize(16);
    ctx.setFillStyle("#181c21");
    ctx.setTextAlign("left");
    ctx.fillText("0", 95, 295);
    ctx.setFontSize(12);
    ctx.setFillStyle("#757f90");
    ctx.fillText("Total Ibadah", 95, 314);

    // Total Stamp Card
    ctx.setFillStyle("white"); // Card color
    drawRoundedRect(ctx, 200, 270, 140, 60, 16); // (x, y, width, height, radius)
    ctx.fill();
    ctx.setShadow(0, 4, 8, "rgba(0, 0, 0, 0.1)");
    ctx.drawImage(StampIcon, 210, 280, 24, 24);
    ctx.setFontSize(16);
    ctx.setFillStyle("#181c21");
    ctx.setTextAlign("left");
    ctx.fillText("0", 245, 295);
    ctx.setFontSize(12);
    ctx.setFillStyle("#757f90");
    ctx.fillText("Total Stamp", 245, 314);

    // // Footer Text
    ctx.setFontSize(12);
    ctx.setFillStyle("white");
    ctx.fillText("Yuk, catat ibadah Ramadan-mu bareng aku di!", 60, 360);
    ctx.fillText("MyTelkomsel!", 156, 376);

    // Footer Section
    ctx.setFillStyle("#eff1f4");
    drawBottomRoundedRect(ctx, 0, 395, 375, 80, 16);
    ctx.fill();
    ctx.drawImage(RafiIcon, 20, 405, 56, 56);
    ctx.drawImage(QRCode, 305, 408, 50, 50);
    ctx.setFontSize(16);
    ctx.setFillStyle("#181c21");
    ctx.fillText("Ramadan Fitri", 90, 428);
    ctx.setFontSize(14);
    ctx.setFillStyle("#757f90");
    ctx.fillText("temukan di MyTelkomsel", 90, 448);

    ctx.draw(true, () => {
      Taro.canvasToTempFilePath({
        canvasId: "shareCanvas",
        success: (res) => {
          shareImage(res.tempFilePath);
        },
        fail: (err) => console.error("Capture failed", err),
      });
    });
  };

  return (
    <>
      <View id="sharedContent">
        <View
          style={{
            background: `url(${BgShare})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            transform: "scale(-1, 1)",
          }}
          className="h-[370px] p-[16px] rounded-t-[16px] mx-[16px] drop-shadow-xl bg-white mt-6"
        >
          <div
            style={{ transform: "scale(-1, 1)" }}
            className="flex flex-col gap-y-[22px] w-full h-full"
          >
            <div className="flex w-full justify-end">
              <Image
                src={LogoMyTsel}
                mode="aspectFit"
                className="h-[20px] w-[100px]"
              />
            </div>
            <div className="flex w-full justify-center">
              <Image
                src={RekapRamadhan}
                mode="aspectFit"
                className="h-[120px] w-[120px]"
              />
            </div>
            <p className="text-white text-[14px] font-semibold text-center whitespace-pre">
              {`Kamu termasuk top 1% yang paling rajin\nibadah di minggu ke-1 Ramadan!`}
            </p>
            <div className="flex items-center gap-x-4">
              {/* Card Left */}
              <div className="flex gap-x-4 w-[45%] rounded-[8px] p-[12px] bg-white">
                <div className="h-full">
                  <Image
                    src={TotalIbadahIcon}
                    mode="aspectFit"
                    className="h-[17px] w-[17px]"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-[16px] text-[#181c21] font-bold">0</p>
                  <p className="text-[12px] text-[#757f90]">Total Ibadah</p>
                </div>
              </div>
              {/* Card Right */}
              <div className="flex gap-x-4 w-[45%] rounded-[8px] p-[12px] bg-white">
                <div className="h-full">
                  <Image
                    src={StampIcon}
                    mode="aspectFit"
                    className="h-[24px] w-[24px]"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-[16px] text-[#181c21] font-bold">0</p>
                  <p className="text-[12px] text-[#757f90]">Total Stamp</p>
                </div>
              </div>
            </div>
            <p className="text-white text-[12px] font-normal text-center whitespace-pre">
              {`Yuk, catat ibadah Ramadan-mu bareng aku di\nMyTelkomsel!`}
            </p>
          </div>
        </View>
        <View className="flex items-center justify-between rounded-b-[16px] px-[16px] py-[12px] bg-[#eff1f4] mx-[16px]">
          <div className="flex gap-x-3">
            <Image
              src={RafiIcon}
              mode="aspectFit"
              className="h-[56px] w-[56px]"
            />
            <div className="flex flex-col justify-center">
              <p className="text-[16px] text-[#181c21] font-bold">
                Ramadan Fitri
              </p>
              <p className="text-[14px] text-[#757f90]">
                temukan di MyTelkomsel
              </p>
            </div>
          </div>
          <Image src={QRCode} mode="aspectFit" className="h-[50px] w-[50px]" />
        </View>
      </View>

      <Canvas
        canvasId="shareCanvas"
        style={{
          width: "375px",
          height: "500px",
          position: "absolute",
          top: "-9999px",
        }}
      />

      <View className="flex flex-col gap-4 mx-[16px] my-8">
        <div
          onClick={handleShare}
          className="cursor-pointer rounded-[40px] bg-white flex justify-center items-center h-[48px]"
        >
          <p className="text-[16px] text-[#ed0226] font-semibold">Bagikan</p>
        </div>
        <div
          onClick={handleBack}
          className="cursor-pointer rounded-[40px] bg-transparent flex justify-center items-center h-[40px]"
        >
          <p className="text-[16px] text-white font-semibold">Nanti Saja</p>
        </div>
      </View>
    </>
  );
};

export default SharedCard;
