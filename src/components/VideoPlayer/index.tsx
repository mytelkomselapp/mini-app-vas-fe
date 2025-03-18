import { Video, View } from "@tarojs/components";

const VideoPlayer = ({ src }: { src: string }) => {
  return (
    <View>
      <Video
        src={src} // Example video URL format must be MP4
        controls={true}
        autoplay={true}
        initialTime={0}
        id="video1"
        loop={false}
        muted={false}
        objectFit="contain" // Optional for video fit
        className="w-full"
      />
    </View>
  );
};

export default VideoPlayer;
