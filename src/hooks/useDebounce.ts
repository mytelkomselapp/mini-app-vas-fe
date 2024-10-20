import { useEffect } from "react";
import useTimeout, { callbackProps } from "./useTimeout";

/**
 * @description This hook can be used as a debounce when inputting / waiting changes with an adjustable delay time
 * @param {function} callback callback parameters are the functions you want to run when there are changes to dependencies params
 * @param {number} delay parameter delay is used to determine when to run the callback when dependencies change, example: all time in milisecond
 * @param {dependecies} dependencies The dependencies parameter is a dependencies parameter in React which will be included in a useEffect
 * @example
 * useDebounce(
    () => {
      if (isSomething) executeA();

      executeB();
    },
    600,
    [isSomething]
  );
 */

export default function useDebounce(
  callback: callbackProps,
  delay: number,
  dependencies: any[]
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]);
}
