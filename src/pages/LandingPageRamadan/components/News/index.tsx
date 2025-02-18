import { View } from "@tarojs/components";
import dummyProduct from "../../../../assets/dummy-product.png";
import { News } from "../../../../network/types/response-props";
import Taro from "@tarojs/taro";
const newsData = [
  {
    id: 1,
    title:
      "Ramadhan dan Idul Fitri 2025, Trafik Internet Telkomsel Naik 12 Persen",
    source: "Kompas",
    category: "Ramadan",
    date: "15 Maret 2025",
    imgSrc: "https://placehold.co/600x400", // Replace with actual image URL
  },
  {
    id: 2,
    title: "Posko Ramadan Tersebar, Mudik Semakin Lancar",
    source: "Telkomsel",
    category: "Ramadan",
    date: "15 Maret 2025",
    imgSrc: "https://placehold.co/600x400", // Replace with actual image URL
  },
  {
    id: 3,
    title: "Kalender Hijriah 2025 Lengkap Puasa Ramadan dan Lebaran",
    source: "Detik",
    category: "Ramadan",
    date: "15 Maret 2025",
    imgSrc: "https://placehold.co/600x400",
  },
];

const NewsCardList = ({ data = [] }: { data: News[] }) => {
  const onNavigate = (targetUrl?: string) => {
    console.log("onNavigate", targetUrl);
    if (targetUrl) {
      Taro.navigateTo({
        url:
          "/subpackages/subpackage9/pages/Webview/index?url=" +
          encodeURIComponent(targetUrl),
      });
    }
  };
  return (
    <div className="space-y-4 mt-2">
      {data?.map((news, i) => (
        <View key={i} onClick={() => onNavigate(String(news?.targetUrl))}>
          <div className="flex items-center bg-white px-4">
            {/* Content */}
            <div className="mr-4 flex-1">
              {/* Source */}
              <div className="flex items-center mb-1">
                <img
                  src={news?.authorIcon}
                  alt="author"
                  className="w-4 h-4 mr-2"
                />
                <span className="text-[10px]">{news?.author}</span>
              </div>
              {/* Title */}
              <p className="text-[12.5px] font-semibold mb-2 text-ellipsis">
                {news.title}
              </p>
              {/* Date */}
              <div className="text-[10px] text-grey flex flex-row">
                <span>{news.tag}</span> <span className="mx-2">•</span>
                <span>{news.publishDate}</span>
              </div>
            </div>
            {/* Image */}
            <img
              src={news.image}
              alt={news.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
          {data?.length - 1 !== i ? (
            <div className="h-[1px] w-full bg-dividerGrey opacity-[0.7] mx-[10px] my-4" />
          ) : null}
        </View>
      ))}
    </div>
  );
};

export default NewsCardList;
