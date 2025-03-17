import { View, Image } from "@tarojs/components";
import loadingShape from "../../assets/loading.png";
import loadingDots from "../../assets/dots.gif";

const FullLoadingScreen = () => {
  return (
    <View 
      className="flex justify-center items-center w-full h-full absolute bottom-0 left-0 right-0 top-0 bg-white" 
      style={{ 
        zIndex: 1003,
      }}
    >
      
        {/* Gradient shape from assets */}
        <View className="absolute inset-0">
          <Image 
            src={loadingShape}
            className="w-full h-full"
            mode="aspectFill"
          />
        </View>
        
        {/* Gradient overlay on top of the image */}
        <View 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(194.27% 56.96% at 50.13% 48.58%, rgba(255, 255, 255, 0.6) 17.43%, rgba(255, 255, 255, 0) 100%),
                        linear-gradient(180deg, rgba(255, 0, 37, 0) 49.97%, rgba(255, 0, 37, 0.2) 100%)`
          }}
        />
        
        {/* Loading dots - centered with flex layout instead of transform */}
        <View className="absolute inset-0 flex items-center justify-center">
          <Image 
            src={loadingDots} 
            className="w-[150px] h-[150px]"
          />
        </View>

    </View>
  );
};

export default FullLoadingScreen;
