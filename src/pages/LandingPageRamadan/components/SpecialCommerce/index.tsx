import { ScrollView, View } from "@tarojs/components";
import chevronRight from "../../../../assets/chevron-right.svg";
const SpecialCommerce = () => {
  const ProductCard = () => {
    return (
      <div className="border border-solid border-gray-300 rounded-2xl p-4 bg-white shadow-sm flex items-center space-x-2 w-[272px] min-w-[200px]">
        {/* Product Details */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img
                src={"https://placehold.co/600x400"}
                alt="Evermos"
                className="w-10 h-10 mr-2"
              />
              <p className="text-[14px]">Evermos</p>
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
                src={"https://placehold.co/600x400"}
                alt="Product"
                className="w-[92px] h-[92px] object-cover rounded-lg mr-2"
              />
            </div>

            {/* Product Info */}
            <div className="mt-2">
              <p className="text-gray-700 text-xs font-medium max-w-[117px]">
                Baju Lebaran Couple Set
              </p>
              <div className="flex mt-1 flex-col">
                <p className="text-solidRed font-bold text-sm">Rp399.000</p>
                <p className="text-[#757F8E] line-through text-xs mt-[2px]">
                  Rp699.000
                </p>
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </View>
    </ScrollView>
  );
};

export default SpecialCommerce;
