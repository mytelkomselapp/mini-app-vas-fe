import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import ErrorImage from '../../assets/failed.svg';
import Button from '../Button';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  image?: any;
  buttonLabel?: string;
  onRefresh?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = "Terjadi Kesalahan",
  message = "Maaf sepertinya ada kesalahan saat memuat halaman ini.",
  image = ErrorImage,
  buttonLabel = "Muat Ulang",
  onRefresh = () => console.log("Refresh clicked"),
}) => {
  return (
    <View 
      className="flex flex-col justify-center items-center w-full h-full absolute bottom-0 left-0 right-0 top-0 bg-white"
      style={{ 
        zIndex: 1003,
      }}
    >
      <Image
        src={image}
        mode="aspectFit"
        className="w-[120px] h-[120px]"
      />
      <Text className="text-lg font-semibold text-primaryBlack text-center mt-4">
        {title}
      </Text>
      <Text className="text-base text-[#353941] text-center max-w-[260px] mt-4">
        {message}
      </Text>
      <View className="flex justify-center w-fit">
        <Button
          label={buttonLabel}
          className="mt-6 mb-1 text-[16px] font-semibold px-8 mx-auto"
          onClick={onRefresh}
        />
      </View>
    </View>
  );
};

export default ErrorScreen;