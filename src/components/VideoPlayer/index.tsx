import Taro from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { View, Video } from "@tarojs/components";
import React from "react";

export interface VideoWithThumbnailProps {
  src: string;
}

const VideoWithThumbnail: React.FC<VideoWithThumbnailProps> = ({
  src = "",
}) => {
  const videoId = `video-${Math.random().toString(36).substr(2, 9)}`; // Unique ID
  const videoRef = useRef<Taro.VideoContext | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    videoRef.current = Taro.createVideoContext(videoId);
  }, []);

  // Force pause when video is loaded
  useEffect(() => {
    if (videoLoaded && videoRef?.current) {
      // Delay to ensure video context is ready
      setTimeout(() => {
        videoRef.current?.pause();
        setIsPlaying(false);
      }, 100);
    }
  }, [videoLoaded]);

  const handleVideoTap = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <React.Fragment>
      <View
        className="relative w-full h-[88%] bg-primaryBlack overflow-hidden"
        onClick={handleVideoTap}
      >
        {/* Video */}
        <Video
          id={videoId}
          src={src}
          className={`absolute w-full h-full z-0 transition-opacity duration-500 opacity-100`}
          showFullscreenBtn={false}
          showCenterPlayBtn={false}
          showPlayBtn={false}
          controls={true}
          autoplay={false}
          muted={true}
          onLoadedData={() => {
            setVideoLoaded(true);
          }}
          onPlay={() => {
            // Check if this is an unwanted autoplay
            setIsPlaying(true);
          }}
          onPause={() => {
            setIsPlaying(false);
          }}
          onEnded={() => {
            setIsPlaying(false);
          }}
        />
      </View>
    </React.Fragment>
  );
};

export default VideoWithThumbnail;
