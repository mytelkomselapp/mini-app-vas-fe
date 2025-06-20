import { Video, View } from "@tarojs/components";

const VideoPlayer = ({ src }: { src: string }) => {
  return (
    <View className="w-full h-full flex items-center justify-center">
      <Video
        src={src} // Example video URL format must be MP4
        controls={true}
        autoplay={true}
        initialTime={0}
        id="video1"
        loop={false}
        muted={false}
        objectFit="contain" // Optional for video fit
        className="w-full" // Added max-width and max-height
        style={{ height: "80vh" }} // Limit height to prevent overlapping with indicators
      />
    </View>
  );
};

export default VideoPlayer;
