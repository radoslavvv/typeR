import Main from "../layout/main/Main";
import Footer from "../layout/footer/Footer";
import Header from "../layout/header/Header";
import Wrapper from "../layout/wrapper/Wrapper";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={`${styles.app}`}>
      <Wrapper>
        <Header />
        <Main />
        <Footer />
      </Wrapper>
    </div>
  );
}

export default App;
