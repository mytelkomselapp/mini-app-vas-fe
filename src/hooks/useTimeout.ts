import { MutableRefObject, useCallback, useEffect, useRef } from "react";

export type callbackProps = () => void | undefined;

/**
 * @description This hook is used to run a function with a specified delay time
 * @param {function} callback callback parameters are the functions you want to run when there are changes to dependencies params
 * @param {number} delay parameter delay is used to determine when to run the callback when dependencies change, example: all time in milisecond
 * @returns {Object} {
 *  reset: function to reset timeout
 *  clear: function to clear timeout
 * }
 * @example const { reset, clear } = useTimeout(callbackFunc, 600);
 */

export default function useTimeout(callback: callbackProps, delay: number) {
  const callbackRef: MutableRefObject<callbackProps | undefined> = useRef();
  const timeoutRef: any = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef?.current?.(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
