import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
	moveToNextPage,
	moveToNextWord,
} from "../../../../redux/features/writer/writerSlice";
import styles from "./Cursor.module.scss";

export interface ICursorProps {
	isBeforeWord: boolean;
}

export const Cursor = (props: ICursorProps) => {
	const dispatch = useDispatch();

	const ref = useRef<any>(null);

	useEffect(() => {
		if (props.isBeforeWord) {
			const parent: any =
				ref?.current?.parentElement?.parentElement?.parentElement;

			const elementRect = ref?.current?.getBoundingClientRect();
			const parentRect = parent?.getBoundingClientRect();

			if (
				!(
					elementRect.top >= parentRect.top &&
					elementRect.bottom <= parentRect.bottom
				)
			) {
				dispatch(moveToNextPage());
			}
		}
	}, []);

	return <span className={styles.cursor} ref={ref}></span>;
};
