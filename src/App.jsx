import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/index.jsx";
import RouteComponent from "./Routes.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <>
          <RouteComponent />
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
