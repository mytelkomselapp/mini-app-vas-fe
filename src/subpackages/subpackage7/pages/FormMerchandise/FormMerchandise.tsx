import { Text, View } from "@tarojs/components";
import Button from "../../../../components/Button";

const FormMerchandise = () => {
  return (
    <View className="bg-inactiveGrey h-full">
      <View className="p-4">
        <View className="flex flex-col w-full mb-4">
          <Text className="text-sm font-bold text-black mb-2">Form Merchandise</Text>
          <Text className="text-xs text-textSecondary">Atur tujuan pengiriman perangkat Anda</Text>
        </View>

        <View className="bg-white rounded-xl p-4 flex flex-col gap-1">
          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Nama Penerima</Text>
            <input
              className="h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary mb-4 border-dividerGrey"
              placeholder="Masukkan nama penerima"
            />
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Nomor Ponsel</Text>
            <input
              className="h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary mb-4 border-dividerGrey"
              placeholder="Masukkan nomor ponsel"
              type="number"
            />
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Email</Text>
            <input
              className="h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary mb-4 border-dividerGrey"
              placeholder="Masukkan email penerima"
              type="email"
            />
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Label Alamat</Text>
            <input
              className="h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary mb-4 border-dividerGrey"
              placeholder="Masukkan label alamat"
            />
            <Text className="text-[10px] text-textSecondary mb-4 mt-[-1]">Contoh: Rumah, Kantor, dan lainnya.</Text>
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Kota, Kecamatan, dan Kode Pos</Text>
            <input
              className="h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary mb-4 border-dividerGrey"
              placeholder="Masukkan kota, kecamatan, dan kode pos"
            />
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Alamat Lengkap</Text>
            <input
              className="h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary mb-4 border-dividerGrey"
              placeholder="Masukkan alamat lengkap"
            />
          </View>

        </View>
      </View>
      <View className="flex flex-col mt-4 bg-white p-4">
        <Button label="Simpan" />
      </View>
    </View>
  )
}

export default FormMerchandise;