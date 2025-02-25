import { BrowserRouter } from "react-router-dom"
import Router from "./routes/router"
import "./styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App