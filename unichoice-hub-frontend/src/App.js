import Routers from "./Routers";
import { useLocation } from "react-router-dom";
import "./css/main.css";
import "./css/layout/loader.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const App = () => {
  const location = useLocation();
  return (
    <>
      <ToastContainer autoClose={2000} />
      {!(location.pathname.startsWith("/admin") || location.pathname.startsWith("/university/dashboard")) && <Header />}
      <Routers />
      <Footer />
    </>
  );
};

export default App;
