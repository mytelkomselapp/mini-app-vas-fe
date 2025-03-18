import { View, Text, Image } from "@tarojs/components";
import premiumBadgeIcon from "../../assets/premium-badge.svg";
import emptyImage from "../../assets/empty-image.svg";
import PremiumContentSlider from "./components/PremiumContentSlider";
import PackageCard from "./components/PackageCard";
import iconUp from "../../assets/ico-chevron-up.svg";
import iconDown from "../../assets/ico-chevron-down.svg";
import iconRight from "../../assets/ico-chevron-right.svg";
import redGift from "../../assets/gift-red.svg";
import { useState } from "react";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import upgradeIllustration from "../../assets/upgrade-illustration.svg";
import durationIcon from "../../assets/duration.svg";
import giftIcon from "../../assets/gift.svg";
import premiumBadge from "../../assets/premium-badge.svg";
import monetaryIcon from "../../assets/monetary.svg";
import rewardIllustration from "../../assets/reward-quota.svg";
import { useNavigate } from "../../hooks";

const bulletPoints = [
  "Harga belum termasuk pajak dan biaya lainnya.",
  "Konten dapat diakses melalui akun yang terdaftar.",
  "Aplikasi MyTelkomsel tetap dapat digunakan.",
  "One-time purchase hanya berlaku untuk konten yang dibeli.",
  "Subscription akan diperpanjang otomatis kecuali dibatalkan.",
];

const ContentDetail = () => {
  const { navigate } = useNavigate();
  // Replace single state with an object to track expanded state for each card
  const [expandedStates, setExpandedStates] = useState({
    info: false, // For "Informasi Penting & Highlight" section
    package0: true, // First package card - default expanded
    package1: false, // Second package card
    package2: false, // Third package card
    additionalInfo: false, // Additional information section
  });
  const [packageDetailOpen, setPackageDetailOpen] = useState({
    state: false,
    type: "package0",
  });

  const PackageContent = () => {
    const isSubscription = packageDetailOpen?.type === "package0";
    const title = isSubscription
      ? "Mulai Berlangganan Paket Ini"
      : "Beli Sekarang Paket Ini";
    const labelButton = isSubscription ? "Langganan Sekarang" : "Beli Sekarang";
    return (
      <>
        <View className="flex flex-col w-full items-center justify-center text-center mb-4">
          <Image
            src={upgradeIllustration}
            className="w-[100px] h-[100px] mb-2"
          />
          <Text className="text-[16px] font-semibold">{title}</Text>
          <Text className={`text-xs mt-2 text-textSecondary text-center`}>
            Konfirmasi ulang pembelian paket kamu
          </Text>
        </View>
        <View>
          <div className="space-y-4">
            {/* Subscription Feature 1 */}
            <div className="flex items-center space-x-3">
              <Image
                src={premiumBadge}
                className="w-[40px] h-[35px] mr-[11px]"
              />

              <p className="text-sm text-blueNavy">
                {isSubscription ? "Langganan" + " " : "Beli" + " "}
                {"Konten Premium Semua Member JKT48"}
              </p>
            </div>

            {/* Subscription Feature 2 */}
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 rounded-full w-[32px] h-[32px] flex items-center justify-center">
                <Image src={giftIcon} className="w-5 h-5" />
              </div>
              <p className="text-sm text-blueNavy">
                Masa berlaku konten 90 hari
              </p>
            </div>

            {/* Subscription Feature 3 */}
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 rounded-full w-[32px] h-[32px] flex items-center justify-center">
                <Image src={monetaryIcon} className="w-5 h-5" />
              </div>
              <p className="text-sm text-blueNavy">
                Biaya update konten Rp 5.500 /update
              </p>
            </div>

            {/* Subscription Feature 4 */}
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 rounded-full w-[32px] h-[32px] flex items-center justify-center">
                <Image src={durationIcon} className="w-5 h-5" />
              </div>
              <p className="text-sm text-blueNavy">
                Peluang memenangkan hadiah spesial
              </p>
            </div>
          </div>
        </View>
        <Button
          label={labelButton}
          className="mt-6 mb-1 text-[16px] font-semibold"
          onClick={() => {
            console.log({ labelButton });
          }}
        />
        <Button
          className="border-none text-[#757F90]"
          label="Batalkan"
          onClick={() => {
            setPackageDetailOpen({ state: false, type: "" });
          }}
          style="secondary"
          // className="mb-8"
        />
      </>
    );
  };

  const RewardContent = () => {
    const bulletPoints = [
      "Dapatkan poin yang bisa ditukar / diskon tertentu",
      "Ajak teman/bagikan untuk mendapatkan point",
      "Poin lebih banyak khusus pengguna VIP Membership",
    ];
    return (
      <>
        <View className="flex flex-col w-full items-center justify-center text-center mb-4">
          <Image
            src={rewardIllustration}
            className="w-[100px] h-[100px] mb-2"
          />
          <Text className="text-[16px] font-semibold">Program Hadiah</Text>
          <Text className={`text-xs mt-2 text-textSecondary text-center`}>
            Detail program hadiah
          </Text>
        </View>
        <View>
          <div className="space-y-4">
            {bulletPoints.length > 0 && (
              <View className="text-xs  flex flex-col gap-1 bg-[#eff1f4b3] rounded-lg p-4">
                <View className="pl-3">
                  {bulletPoints.map((point, index) => (
                    <View key={index} className="relative mb-2">
                      <Text className="absolute left-[-12px] top-0">•</Text>
                      <Text>{point}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </div>
        </View>

        <Button
          className="border-none text-[#757F90] mt-4"
          label="Kembali"
          onClick={() => {
            setPackageDetailOpen({ state: false, type: "" });
          }}
          style="secondary"
          // className="mb-8"
        />
      </>
    );
  };
  // Helper function to toggle a specific card's expanded state
  const toggleExpanded = (key: keyof typeof expandedStates) => {
    setExpandedStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleClickMerchandise = () => {
    console.log("Clicked merchandise");
  };

  const handleNavigateToCollection = () => {
    navigate("/pages/MyCollection/index");
  };

  return (
    <View className="flex flex-col bg-[#181c21] min-h-[screen]">
      <View className="flex flex-col items-center px-4 py-6">
        <View className="mb-3 w-20 h-20 relative">
          <View className="overflow-hidden w-full h-full rounded-full">
            <Image
              src="https://placehold.co/80x80/ff69b4/ff69b4"
              className="w-full h-full object-cover"
            />
          </View>
          <View className="absolute bottom-0 right-0 w-[28px] h-[28px]">
            <Image src={premiumBadgeIcon} className="w-full h-full" />
          </View>
        </View>
        <Text className="mb-2 text-lg font-semibold text-white">
          JKT48 Premium Konten
        </Text>
        <View
          className="px-4 py-2 mb-6 text-sm text-whit rounded-[40px] flex items-center"
          style={{
            background:
              "linear-gradient(77deg, #B90024 15.71%, #FF0025 68.97%, #FD195E 94.61%)",
          }}
          onClick={handleNavigateToCollection}
        >
          <Text className="text-[12px] font-semibold text-white">
            Lihat Koleksi Saya
          </Text>
          <Image src={emptyImage} className="w-4 h-4 ml-2" />
        </View>
        <View className="px-4">
          <Text className="mb-3 text-sm font-semibold text-white">
            Konten Premium
          </Text>

          <PremiumContentSlider />

          <View className="w-full">
            <View
              className="flex justify-between items-center mb-4 text-white rounded-lg p-3"
              style={{
                background:
                  "radial-gradient(151.15% 144% at 56.15% 0%, #4B555F 0%, rgba(75, 85, 95, 0.00) 100%)",
              }}
            >
              <Text className="text-xs font-semibold">
                Informasi Penting & Highlight
              </Text>
              <Image
                className="w-[20px] h-[20px]"
                src={expandedStates.info ? iconUp : iconDown}
                onClick={() => toggleExpanded("info")}
              />
            </View>

            <View
              className="flex gap-3 items-center px-2 py-3 mb-6 rounded-lg leading-none"
              style={{
                background:
                  "linear-gradient(76deg, #001A41 -28.77%, #406DB1 105.73%)",
              }}
              onClick={handleClickMerchandise}
            >
              <Image src={redGift} className="w-10 h-10" />
              <View className="flex flex-col gap-[2px]">
                <Text className="text-xs text-white font-semibold">
                  Kesempatan dapatkan merchandise!
                </Text>
                <Text className="text-[10px] text-white">
                  Cek detail program hadiah untuk konten ini
                </Text>
              </View>

              <Image src={iconRight} className="w-4 h-4 ml-auto" />
            </View>
            <View className="flex flex-col">
              <Text className="mb-1 text-base font-semibold font-batikSans text-white">
                Pilih Paket
              </Text>
              <Text className="mb-3 text-xs text-[#9CA9B9]">
                Pilih paket di bawah sesuai kebutuhan kamu
              </Text>
            </View>

            <View className="flex flex-col gap-4">
              <PackageCard
                title="Langganan Konten Premium Semua Member JKT48"
                description="Akses ke semua konten eksklusif, Koleksi Foto dan Video Eksklusif. Update berkala selama 90 hari."
                validity="Masa berlaku konten 90 hari"
                price="Rp5.500"
                priceUnit="/update konten"
                originalPrice="Rp6.000"
                isExpanded={expandedStates.package0}
                promo="Promo"
                bulletPoints={[
                  "Update konten berkala (15x per bulan)",
                  "Pembayaran otomatis dengan poin per update",
                  "Akses ke semua konten premium secara otomatis",
                  "Periode langganan 90 hari",
                  "Kesempatan dapatkan hadiah menarik",
                ]}
                onToggleExpand={() => toggleExpanded("package0")}
                onButtonClick={() =>
                  setPackageDetailOpen({ state: true, type: "package0" })
                }
              />

              {!expandedStates.additionalInfo && (
                <View
                  className="flex items-center px-4 py-3 rounded-lg justify-center gap-1"
                  style={{ background: "rgba(71, 156, 255, 0.15)" }}
                  onClick={() => toggleExpanded("additionalInfo")}
                >
                  <Text className="text-white text-[14px]">
                    {"Tampilkan semua paket (2)"}
                  </Text>
                  <Image src={iconDown} className="w-4 h-4" />
                </View>
              )}
              <View
                className={`overflow-hidden transition-all duration-300 ease-in-out gap-4 flex flex-col`}
                style={{
                  maxHeight: expandedStates.additionalInfo ? "500px" : "0",
                  opacity: expandedStates.additionalInfo ? 1 : 0,
                }}
              >
                <PackageCard
                  title="Beli Konten Premium Khusus 8 Member JKT48"
                  description="Akses ke 20 konten eksklusif, Koleksi Foto dan Video Eksklusif"
                  validity="Masa berlaku konten 30 hari"
                  price="Rp50.000"
                  priceUnit="/sekali pembelian"
                  isExpanded={expandedStates.package1}
                  promo="Promo"
                  onToggleExpand={() => toggleExpanded("package1")}
                  onButtonClick={() =>
                    setPackageDetailOpen({ state: true, type: "package1" })
                  }
                />

                <PackageCard
                  title="Beli Konten Premium Khusus Zee JKT48"
                  description="Akses ke 20 konten eksklusif, Koleksi Foto dan Video Eksklusif"
                  validity="Masa berlaku konten 30 hari"
                  price="Rp50.000"
                  priceUnit="/sekali pembelian"
                  isExpanded={expandedStates.package2}
                  promo="Promo"
                  onToggleExpand={() => toggleExpanded("package2")}
                  onButtonClick={() =>
                    setPackageDetailOpen({ state: true, type: "package2" })
                  }
                />
              </View>

              {expandedStates.additionalInfo && (
                <View
                  className="flex items-center px-4 py-3 rounded-lg justify-center gap-1"
                  style={{ background: "rgba(71, 156, 255, 0.15)" }}
                  onClick={() => toggleExpanded("additionalInfo")}
                >
                  <Text className="text-white text-[14px]">
                    {"Tampilkan lebih sedikit"}
                  </Text>
                  <Image src={iconUp} className="w-4 h-4" />
                </View>
              )}
            </View>

            <View className="mt-6 text-xs text-gray-400">
              <View className="pl-3">
                {bulletPoints.map((point, index) => (
                  <View key={index} className="relative mb-2">
                    <Text className="absolute left-[-12px] top-0">•</Text>
                    <Text>{point}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="my-6 text-xs text-gray-400">
              <Text>
                Dengan memilih paket dan melakukan pembayaran, kamu setuju
                dengan <Text className="text-blue-500">Syarat & Ketentuan</Text>{" "}
                dan <Text className="text-blue-500">Kebijakan Privasi</Text>{" "}
                yang berlaku.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <BottomSheet
        open={packageDetailOpen?.state}
        onClose={() => {
          setPackageDetailOpen({ state: false, type: "" });
        }}
        containerClassname="p-4 pb-8 !h-fit"
        withoutPadding
        withFloatingCloseButton
      >
        {packageDetailOpen?.type === "package2" ? (
          <RewardContent />
        ) : (
          <PackageContent />
        )}
      </BottomSheet>
    </View>
  );
};

export default ContentDetail;
