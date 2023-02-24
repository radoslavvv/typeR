import React, { useEffect, useState } from "react";
import Key from "./key/Key";

import styles from "./Keyboard.module.scss";

interface IKeyboardProps {}

const Keyboard = (props: IKeyboardProps) => {
	const [pressedKeys, setPressedKeys] = useState<string[]>([]);

	const handleKeyUp = (e: KeyboardEvent): void => {
		setPressedKeys((prev: string[]) => {
			const newKeys = [
				...prev.filter((k: string) => k != e.key.toUpperCase()),
			];

			return [...newKeys];
		});
	};

	const handleKeyDown = (e: KeyboardEvent): void => {
		setPressedKeys((prev: string[]) => {
			return [...prev, e.key.toUpperCase()];
		});
	};

	useEffect(() => {
		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className={styles.keyboard}>
			<div className={styles.row}>
				<Key letter="Q" pressedKeys={pressedKeys} />
				<Key letter="W" pressedKeys={pressedKeys} />
				<Key letter="E" pressedKeys={pressedKeys} />
				<Key letter="R" pressedKeys={pressedKeys} />
				<Key letter="T" pressedKeys={pressedKeys} />
				<Key letter="Y" pressedKeys={pressedKeys} />
				<Key letter="U" pressedKeys={pressedKeys} />
				<Key letter="I" pressedKeys={pressedKeys} />
				<Key letter="O" pressedKeys={pressedKeys} />
				<Key letter="P" pressedKeys={pressedKeys} />
			</div>
			<div className={styles.row}>
				<Key letter="A" pressedKeys={pressedKeys} />
				<Key letter="S" pressedKeys={pressedKeys} />
				<Key letter="D" pressedKeys={pressedKeys} />
				<Key letter="F" pressedKeys={pressedKeys} />
				<Key letter="G" pressedKeys={pressedKeys} />
				<Key letter="H" pressedKeys={pressedKeys} />
				<Key letter="J" pressedKeys={pressedKeys} />
				<Key letter="K" pressedKeys={pressedKeys} />
				<Key letter="L" pressedKeys={pressedKeys} />
			</div>
			<div className={styles.row}>
				<Key letter="Z" pressedKeys={pressedKeys} />
				<Key letter="X" pressedKeys={pressedKeys} />
				<Key letter="C" pressedKeys={pressedKeys} />
				<Key letter="V" pressedKeys={pressedKeys} />
				<Key letter="B" pressedKeys={pressedKeys} />
				<Key letter="N" pressedKeys={pressedKeys} />
				<Key letter="M" pressedKeys={pressedKeys} />
			</div>
		</div>
	);
};

export default Keyboard;
