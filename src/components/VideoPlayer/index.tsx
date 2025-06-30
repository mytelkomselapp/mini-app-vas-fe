import Taro from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { View, Video, Image } from "@tarojs/components";

export interface VideoWithThumbnailProps {
  src: string;
  thumbnailSrc: string;
}

const VideoWithThumbnail: React.FC<VideoWithThumbnailProps> = ({
  src = "",
  thumbnailSrc = "",
}) => {
  const videoId = "myVideo";
  const videoRef = useRef<Taro.VideoContext | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  useEffect(() => {
    videoRef.current = Taro.createVideoContext(videoId);
  }, []);

  const handleVideoTap = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowThumbnail(true);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setShowThumbnail(false);
    }
  };

  return (
    <View
      className="relative w-full h-52 bg-black overflow-hidden"
      onClick={handleVideoTap}
    >
      {/* Video */}
      <Video
        id={videoId}
        src={src}
        className={`absolute w-full h-full z-10 transition-opacity duration-500 ${
          showThumbnail ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        showFullscreenBtn={false}
        showCenterPlayBtn={false}
        showPlayBtn={false}
        controls={false}
        onPlay={() => {
          setIsPlaying(true);
          setShowThumbnail(false);
        }}
        onPause={() => {
          setIsPlaying(false);
          setShowThumbnail(true);
        }}
      />

      {/* Thumbnail */}
      <Image
        src={thumbnailSrc}
        mode="aspectFill"
        className={`absolute w-full h-full z-20 object-cover transition-opacity duration-500 ${
          showThumbnail ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </View>
  );
};

export default VideoWithThumbnail;
