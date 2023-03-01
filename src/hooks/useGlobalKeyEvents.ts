import { useEffect } from "react";

type KeyboardEventHandler = (this: Window, ev: KeyboardEvent) => any;

const useGlobalKeyEvents = (handleKeyDown: KeyboardEventHandler, handleKeyUp?: KeyboardEventHandler) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (handleKeyUp) {
      window.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (handleKeyUp) {
        window.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, [handleKeyUp, handleKeyDown]);
};

export default useGlobalKeyEvents;
