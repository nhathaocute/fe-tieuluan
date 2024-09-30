import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";
import { GlobalData } from "./hook/globalData";
function App() {
  return (
    <GlobalData>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </GlobalData>
  );
}

export default App;
