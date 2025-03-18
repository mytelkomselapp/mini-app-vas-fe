import React from "react";
import { Stories } from "../../components";
import { Image } from "@tarojs/components";

const StoriesImage = () => {
  return (
    <React.Fragment>
      <Stories
        stories={[
          {
            index: 0,
            component: (
              <Image
                mode="aspectFill"
                className="w-full"
                src="https://fastly.picsum.photos/id/896/375/500.jpg?hmac=Alo0chjGKqeoGiYLlucrMxpqocr3UubzCXFjM8CCk5w"
              />
            ),
          },
          {
            index: 1,
            component: (
              <Image
                mode="aspectFill"
                className="w-full"
                src="https://fastly.picsum.photos/id/921/375/500.jpg?hmac=77n8FdT3FaORN5sphNvYSEhvTySOUgfX8UD1LN1X6aY"
              />
            ),
          },
          {
            index: 2,
            component: (
              <Image
                mode="aspectFill"
                className="w-full"
                src="https://fastly.picsum.photos/id/33/370/500.jpg?blur=2&hmac=pr9Mblu4mErgTDpmxkguem10-daV0OSrvQwZzSh38jI"
              />
            ),
          },
          {
            index: 3,
            component: (
              <Image
                mode="aspectFill"
                className="w-full"
                src="https://fastly.picsum.photos/id/996/370/500.jpg?blur=2&hmac=6fDfQS-VcylXv-FyXwcPCesse6u9jEvSqAGF8tEYd34"
              />
            ),
          },
        ]}
        defaultStory={0}
      />
    </React.Fragment>
  );
};

export default StoriesImage;
