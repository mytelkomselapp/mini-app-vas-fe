import { useCallback, useState } from "react";

/**
 * Hooks helper toggling boolean state
 *
 */
const useToggle = (initialStateActive = false) => {
  const [active, setActive] = useState(initialStateActive);

  // toggling `active` state
  const toggleActive = useCallback(() => {
    setActive((prevState) => !prevState);
  }, []);

  // expose state and function side-effect
  return {
    active,
    toggleActive,
    setActive,
  };
};

export default useToggle;
