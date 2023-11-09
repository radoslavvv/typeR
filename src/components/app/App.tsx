import Main from "../layout/main/Main";
import Footer from "../layout/footer/Footer";
import Header from "../layout/header/Header";
import Wrapper from "../layout/wrapper/Wrapper";

import "./App.scss";

function App() {
  return (
    <Wrapper>
      <Header />
      <Main />
      <Footer />
    </Wrapper>
  );
}

export default App;
