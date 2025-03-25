import { View } from "@tarojs/components";
import VideoPlayer from "../../components/VideoPlayer";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { useTaroNavbar } from "../../hooks";

const VideoContent = () => {
  useTaroNavbar("#272e36");
  const searchParams = Taro.getCurrentInstance().router?.params;
  const videoUrl = searchParams?.url || "";
  const videoTitle = searchParams?.title || "Video Player";

  useEffect(() => {
    // Set the navigation bar title dynamically
    Taro.setNavigationBarTitle({
      title: videoTitle,
    });
  }, [videoTitle]);
  return (
    <View className="overflow-y-auto h-[100vh] bg-black flex items-center justify-center">
      <VideoPlayer src={videoUrl} />
    </View>
  );
};

export default VideoContent;
