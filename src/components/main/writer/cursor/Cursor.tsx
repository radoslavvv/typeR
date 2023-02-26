import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
	moveToNextPage,
	moveToNextWord,
} from "../../../../redux/features/writer/writerSlice";
import styles from "./Cursor.module.scss";

export const Cursor: React.FC = () => {
	const dispatch = useDispatch();

	const ref = useRef<any>(null);

	useEffect(() => {
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
			console.log("move to next page");

			dispatch(moveToNextPage());
			// dispatch(moveToNextWord());
		}
	}, []);

	return <span className={styles.cursor} ref={ref}></span>;
};
