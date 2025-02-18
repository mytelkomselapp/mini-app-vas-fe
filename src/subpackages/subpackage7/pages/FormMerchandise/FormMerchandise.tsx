import { Text, View } from "@tarojs/components";
import Button from "../../../../components/Button";
import { MerchandiseFormError, useHistoryRamadhanSearchLocation, useMerchandiseForm } from "../../../../store/ramadhan";
import { handleNavigate } from "../../../../lib/utils";
import React from "react";

const FormMerchandise = () => {
  const {
    fullName,
    phoneNumber,
    province,
    city,
    subdistrict,
    zipcode,
    address,
    email,
    labelAddress,
    setFullName,
    setPhoneNumber,
    setProvince,
    setCity,
    setSubdistrict,
    setZipcode,
    setAddress,
    setEmail,
    setLabelAddress,
    error,
    setError,
    getHasData
  } = useMerchandiseForm();

  const { data: locationData } = useHistoryRamadhanSearchLocation();

  React.useEffect(() => {
    setProvince(locationData?.province || '');
    setCity(locationData?.city || '');
  }, [locationData]);

  const hasData = getHasData();
  const handleChangeFullName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValues = event?.target?.value ?? "";

    setError({ ...error, fullName: "" });
    return setFullName(inputValues);
  };

  const handleChangePhoneNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValues = event?.target?.value ?? "";

    setError({ ...error, phoneNumber: "" });
    return setPhoneNumber(inputValues);
  };

  const handleChangeProvince = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValues = event?.target?.value ?? "";
    return setProvince(inputValues);
  };

  const handleChangeCity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValues = event?.target?.value ?? "";
    return setCity(inputValues);
  };

  const handleChangeSubdistrict = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValues = event?.target?.value ?? "";
    return setSubdistrict(inputValues);
  };

  const handleChangeZipcode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValues = event?.target?.value ?? "";
    return setZipcode(inputValues);
  };

  const handleChangeAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValues = event?.target?.value ?? "";
    return setAddress(inputValues);
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValues = event?.target?.value ?? "";
    return setEmail(inputValues);
  };

  const handleChangeLabelAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValues = event?.target?.value ?? "";
    return setLabelAddress(inputValues);
  };

  const handleSubmit = () => {
    if (!validateFields()) return;
    console.log(hasData, 'hasData');
    handleNavigate('/subpackages/subpackage7/pages/CheckoutMerchandise/index');
  };

  const validateFields = () => {
    const newErrors = {
      fullName: fullName ? "" : "Wajib diisi",
      phoneNumber: phoneNumber ? "" : "Wajib diisi",
      email: email ? "" : "Wajib diisi",
      labelAddress: labelAddress ? "" : "Wajib diisi",
      province: province ? "" : "Wajib diisi",
      city: city ? "" : "Wajib diisi",
      subdistrict: subdistrict ? "" : "Wajib diisi",
      zipcode: zipcode ? "" : "Wajib diisi",
      address: address ? "" : "Wajib diisi",
    };
    console.log(newErrors);
    setError(newErrors as MerchandiseFormError);
    return !Object.values(newErrors).some((error) => error);
  };

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
              className={`h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary ${ error.fullName ? "mb-1 border-solidRed" : "mb-4 border-gray-300"}`}
              placeholder="Masukkan nama penerima"
              value={fullName}
              onChange={handleChangeFullName}
            />
            {error.fullName && (
              <div className="text-solidRed text-xs mb-4">{error.fullName}</div>
            )}
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Nomor Ponsel</Text>
            <input
              className={`h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary ${error.phoneNumber ? "mb-1 border-solidRed" : "mb-4 border-gray-300"}`}
              placeholder="Masukkan nomor ponsel"
              type="number"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
            />
            {error.phoneNumber && (
              <div className="text-solidRed text-xs mb-4">{error.phoneNumber}</div>
            )}
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Email</Text>
            <input
              className={`h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary ${error.email ? "mb-1 border-solidRed" : "mb-4 border-gray-300"}`}
              placeholder="Masukkan email penerima"
              type="email"
              value={email}
              onChange={handleChangeEmail}
            />
            {error.email && (
              <div className="text-solidRed text-xs mb-4">{error.email}</div>
            )}
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Label Alamat</Text>
            <input
              className={`h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary ${error.labelAddress ? "mb-1 border-solidRed" : "mb-4 border-gray-300"}`}
              placeholder="Masukkan label alamat"
              value={labelAddress}
              onChange={handleChangeLabelAddress}
            />
            <Text className="text-[10px] text-textSecondary mb-4 mt-[-10px]">Contoh: Rumah, Kantor, dan lainnya.</Text>
            {error.labelAddress && (
              <div className="text-solidRed text-xs mb-4">{error.labelAddress}</div>
            )}
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Provinsi</Text>
            <input
              className={`h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary ${error.city ? "mb-1 border-solidRed" : "mb-4 border-gray-300"}`}
              placeholder="Masukkan provinsi"
              value={province}
              onChange={handleChangeProvince}
            />
            {error.province && (
              <div className="text-solidRed text-xs mb-4">{error.province}</div>
            )}
          </View>
          

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Kota</Text>
            <input
              className={`h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary ${error.city ? "mb-1 border-solidRed" : "mb-4 border-gray-300"}`}
              placeholder="Masukkan kota"
              value={city}
              onChange={handleChangeCity}
            />
            {error.city && (
              <div className="text-solidRed text-xs mb-4">{error.city}</div>
            )}
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Kecamatan</Text>
            <input
              className={`h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary ${error.subdistrict ? "mb-1 border-solidRed" : "mb-4 border-gray-300"}`}
              placeholder="Masukkan kecamatan"
              value={subdistrict}
              onChange={handleChangeSubdistrict}
            />
            {error.subdistrict && (
              <div className="text-solidRed text-xs mb-4">{error.subdistrict}</div>
            )}
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Kode Pos</Text>
            <input
              className={`h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary ${error.zipcode ? "mb-1 border-solidRed" : "mb-4 border-gray-300"}`}
              placeholder="Masukkan kode pos"
              value={zipcode}
              onChange={handleChangeZipcode}
            />
            {error.zipcode && (
              <div className="text-solidRed text-xs mb-4">{error.zipcode}</div>
            )}
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-xs text-textSecondary">Alamat Lengkap</Text>
            <input
              className={`h-[44px] text-sm !text-primary outline-none rounded-[12px] border-solid border-[1px] px-4 !placeholder:text-xs !placeholder:text-textSecondary ${error.address ? "mb-1 border-solidRed" : "mb-4 border-gray-300"}`}
              placeholder="Masukkan alamat lengkap"
              value={address}
              onChange={handleChangeAddress}
            />
            {error.address && (
              <div className="text-solidRed text-xs mb-4">{error.address}</div>
            )}
          </View>

        </View>
      </View>
      <View className="flex flex-col mt-4 bg-white p-4">
        <Button label="Simpan" onClick={handleSubmit} />
      </View>
    </View>
  )
}

export default FormMerchandise;