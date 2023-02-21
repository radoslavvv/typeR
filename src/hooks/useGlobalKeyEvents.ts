import { useEffect } from "react";

type KeyboardEventHandler = (this: Window, ev: KeyboardEvent) => any;

const useGlobalKeyEvents = (
	handleKeyUp: KeyboardEventHandler,
	handleKeyDown: KeyboardEventHandler
) => {
	useEffect(() => {
		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keyup", handleKeyUp);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyUp, handleKeyDown]);
};

export default useGlobalKeyEvents;
