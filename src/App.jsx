import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import RouteComponent from "./Routes";
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
