import Routers from "./Routers";
import "./css/main.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default App;
