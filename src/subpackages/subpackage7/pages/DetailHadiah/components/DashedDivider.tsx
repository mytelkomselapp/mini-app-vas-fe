import { View } from "@tarojs/components";

interface DashedDividerProps {
  className?: string;
  style?: React.CSSProperties;
}

const DashedDivider: React.FC<DashedDividerProps> = ({ className = '', style }) => {
  const dots = Array(18).fill(null);

  return (
    <View className="absolute w-full" style={{ top: '-12px' }}>
      {/* Left Notch */}
      <View 
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-6 bg-white rounded-full"
        style={{
          borderRight: '2px solid #EFF1F4',
          borderBottom: '2px solid #EFF1F4',
        }}
      />
      
      {/* Dashed Line with Circles */}
      <View className="absolute left-6 right-6 flex flex-row items-center justify-between">
        {dots.map((_, index) => (
          <View 
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              borderBottom: '1px solid #EFF1F4',
              backgroundColor: '#FAFAFA',
              marginTop: '8px'
            }}
          />
        ))}
      </View>
      
      {/* Right Notch */}
      <View 
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-6 bg-white rounded-full"
        style={{
          borderLeft: '2px solid #EFF1F4',
          borderBottom: '2px solid #EFF1F4',
        }}
      />
    </View>
  );
}

export default DashedDivider; 