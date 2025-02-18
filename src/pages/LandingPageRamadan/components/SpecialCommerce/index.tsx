import { ScrollView, View } from "@tarojs/components";
import chevronRight from "../../../../assets/chevron-right.svg";
import { Product } from "@/network/types/response-props";
import { formatNumberWithThousandSeparator } from "../../../../lib/utils";
import Taro from "@tarojs/taro";

const SpecialCommerce = ({ data = [] }: { data: Product[] }) => {
  const onNavigate = (targetUrl?: string) => {
    if (targetUrl) {
      Taro.navigateTo({
        url:
          "/subpackages/subpackage9/pages/Webview/index?url=" +
          encodeURIComponent(targetUrl),
      });
    }
  };
  const ProductCard = ({ item }) => {
    return (
      <div
        className={
          "border border-solid border-gray-300 rounded-2xl p-4 bg-white shadow-sm flex items-center  w-[272px] min-w-[200px]"
        }
        onClick={() => onNavigate(String(item?.targetUrl || item?.linkTitle))}
      >
        {/* Product Details */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img
                src={item?.productIcon}
                alt={item?.linkTitle}
                className="w-10 h-10 mr-2"
              />
              <p className="text-[14px]">{item?.linkTitle}</p>
            </div>

            <img
              src={chevronRight}
              className="w-4 h-4 "
              style={{
                filter:
                  "invert(41%) sepia(8%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%)",
              }}
            />
          </div>

          {/* Image */}
          <div className="flex flex-row items-center">
            <div className="mt-3">
              <img
                src={item?.productImage}
                alt="Product"
                className="w-[92px] h-[92px] object-cover rounded-lg mr-2"
              />
            </div>

            {/* Product Info */}
            <div className="mt-2">
              <p className="text-gray-700 text-xs font-medium max-w-[117px]">
                {item?.title}
              </p>
              <div className="flex mt-1 flex-col">
                <p className="text-solidRed font-bold text-sm">
                  {`Rp ${formatNumberWithThousandSeparator(item?.price)}`}
                </p>
                {item?.strikePrice ? (
                  <p className="text-[#757F8E] line-through text-xs mt-[2px]">
                    {`Rp ${formatNumberWithThousandSeparator(
                      item?.strikePrice
                    )}`}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ScrollView className="overflow-x-scroll pl-4 pt-1 w-[100vw]" scrollX>
      <View className="flex flex-row space-x-4">
        {data?.map((item, index) => {
          return <ProductCard key={index} item={item} />;
        })}

        <View className="w-4 text-transparent">{"A"}</View>
      </View>
    </ScrollView>
  );
};

export default SpecialCommerce;
