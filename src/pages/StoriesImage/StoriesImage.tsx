import React from "react";
import { Stories, ZoomableImage } from "../../components";
import Taro from "@tarojs/taro";

import { useTaroNavbar } from "../../hooks";
import VideoPlayer from "../../components/VideoPlayer";

const StoriesImage = () => {
  useTaroNavbar("#272e36");
  const searchParams = Taro.getCurrentInstance().router?.params;
  const storiesTitle = searchParams?.title || "Image Content";

  React.useEffect(() => {
    Taro.setNavigationBarTitle({
      title: storiesTitle,
    });
  }, [storiesTitle]);

  return (
    <React.Fragment>
      <Stories
        stories={[
          {
            index: 0,
            component: (
              <ZoomableImage
                mode="aspectFill"
                className="w-full"
                src="https://fastly.picsum.photos/id/896/375/500.jpg?hmac=Alo0chjGKqeoGiYLlucrMxpqocr3UubzCXFjM8CCk5w"
              />
            ),
          },
          {
            index: 1,
            component: (
              <ZoomableImage
                mode="aspectFill"
                className="w-full"
                src="https://fastly.picsum.photos/id/921/375/500.jpg?hmac=77n8FdT3FaORN5sphNvYSEhvTySOUgfX8UD1LN1X6aY"
              />
            ),
          },
          {
            index: 2,
            component: (
              <ZoomableImage
                mode="aspectFill"
                className="w-full"
                src="https://fastly.picsum.photos/id/33/370/500.jpg?blur=2&hmac=pr9Mblu4mErgTDpmxkguem10-daV0OSrvQwZzSh38jI"
              />
            ),
          },
          {
            index: 3,
            component: (
              <ZoomableImage
                mode="aspectFill"
                className="w-full"
                src="https://fastly.picsum.photos/id/996/370/500.jpg?blur=2&hmac=6fDfQS-VcylXv-FyXwcPCesse6u9jEvSqAGF8tEYd34"
              />
            ),
          },
          {
            index: 4,
            component: (
              <VideoPlayer src={"https://www.w3schools.com/html/mov_bbb.mp4"} />
            ),
          },
        ]}
        defaultStory={0}
      />
    </React.Fragment>
  );
};

export default StoriesImage;
