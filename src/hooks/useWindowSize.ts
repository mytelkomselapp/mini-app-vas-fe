import { useEffect, useState } from "react";

type WindowResizeResult = {
  width: number;
  height: number;
};

/**
 * Hooks to get window width & height on resize layout
 * @returns {Object} `width` & `height`
 */
const useWindowResize = (): WindowResizeResult => {
  // Create initial width
  const [width, setWidth] = useState<number>(window.innerWidth);

  // Create initial height
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    /**
     * Get width & height on resize
     */
    const updateSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    // Create event resize listener
    window.addEventListener("resize", updateSize);

    // Destroy resize event listener on unmounted
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return { width, height };
};

export default useWindowResize;
