import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Keyboard from "./components/keyboard/Keyboard";

import styles from "./App.module.scss";
import WriteSection from "./components/writeSection/WriteSection";
import Header from "./components/header/Header";
import Timer from "./components/timer/Timer";
import Footer from "./components/footer/Footer";

function App() {
	return (
		<div className={styles.App}>
			<Header />
			<WriteSection />
			{/* <Footer /> */}
		</div>
	);
}

export default App;
