import React from "react";

import styles from "./Key.module.scss";

interface IKeyProps {
	letter: string;
	pressedKeys: string[];
}

const Key = (props: IKeyProps) => {
	const { letter, pressedKeys } = props;

	return (
		<div
			className={`${styles.key} ${
				pressedKeys.includes(letter) ? styles.pressed : ""
			}`}
		>
			{letter}
		</div>
	);
};

export default Key;
