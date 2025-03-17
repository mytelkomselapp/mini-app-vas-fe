import getElementSize from "../lib/string.utils";

const useGetElementSize = () => {
  // const [width]

  const getSize = async (selector: string) => {
    const element = await getElementSize(selector);
    return element;
  };

  return {
    getSize,
  };
};

export default useGetElementSize;
