import { View } from "@tarojs/components";
import dummyProduct from "../../../../assets/dummy-product.png";
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

const NewsCardList = () => {
  return (
    <div className="space-y-4 mt-2">
      {newsData.map((news, i) => (
        <View key={i}>
          <div className="flex items-center bg-white px-4">
            {/* Content */}
            <div className="mr-4 flex-1">
              {/* Source */}
              <div className="flex items-center mb-1">
                <span className="text-[10px]">{news.source}</span>
              </div>
              {/* Title */}
              <p className="text-[12.5px] font-semibold mb-2 text-ellipsis">
                {news.title}
              </p>
              {/* Date */}
              <div className="text-[10px] text-grey flex flex-row">
                <span>{news.date}</span> <span className="mx-2">•</span>
                <span>{news.category}</span>
              </div>
            </div>
            {/* Image */}
            <img
              src={news.imgSrc}
              alt={news.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
          {newsData?.length - 1 !== i ? (
            <div className="h-[1px] w-full bg-dividerGrey opacity-[0.7] mx-[10px] my-4" />
          ) : null}
        </View>
      ))}
    </div>
  );
};

export default NewsCardList;
