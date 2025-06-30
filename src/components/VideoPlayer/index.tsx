import { Video, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";

const VideoPlayer = ({ src }: { src: string }) => {
  // Helper function to make sure Android platform respects our container size
  useEffect(() => {
    // Add a small delay to ensure proper rendering on Android
    const timer = setTimeout(() => {
      if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        // Force UI update for WeChat Mini Program environment
        Taro.createSelectorQuery()
          .select("#video-container")
          .boundingClientRect()
          .exec();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      id="video-container"
      className="w-full h-full flex items-center justify-center"
    >
      <Video
        src={src}
        controls
        autoplay
        initialTime={0}
        loop={false}
        muted={false}
        objectFit="contain"
        className="w-full max-h-[80vh]"
        style={{
          zIndex: 0,
          position: "absolute",
        }}
      />
    </View>
  );
};

export default VideoPlayer;
