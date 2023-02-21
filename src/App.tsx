import Header from "./components/header/Header";
import Main from "./components/main/Main";

import styles from "./App.module.scss";
import Footer from "./components/footer/Footer";

function App() {
	return (
		<div className={styles.App}>
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
