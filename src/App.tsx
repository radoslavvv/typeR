import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Keyboard from "./components/keyboard/Keyboard";

import styles from './App.module.scss';
import WriteSection from "./components/writeSection/WriteSection";
import Header from "./components/header/Header";
import Timer from "./components/timer/Timer";

function App() {
	return (
		<div className={styles.App}>
			<Header />
			<WriteSection />
		</div>
	);
}
 
export default App;
