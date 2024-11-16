import { useState, ReactNode } from "react";
import ChevronUp from "../../assets/chevron-up.svg";
import { View } from "@tarojs/components";

interface AccordionCustomProps {
  trigger?: ReactNode;
  children?: ReactNode;
}

const AccordionCustom: React.FC<AccordionCustomProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("accordionOpen", isOpen)

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <View>
      <View
        id="trigger"
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-none focus:bg-none"
        onClick={toggleAccordion}
      >
        <View className="w-full">{trigger}</View>
        <img
          src={ChevronUp}
          alt="Chevron Icon"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", }}
          className="shrink-0 w-4 h-4"
        />

      </View>
      {isOpen && (
        <View id="content" className="px-4 pb-4">
          {children}
        </View>
      )}
    </View>
  );
};

export default AccordionCustom;
