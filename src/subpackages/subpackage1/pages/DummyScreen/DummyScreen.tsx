import { View } from "@tarojs/components";
import VideoPlayer from "../../../../components/VideoPlayer";

const DummyScreen = () => {
  return (
    <View>
      <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" />
    </View>
  );
};

export default DummyScreen;
