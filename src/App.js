import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SortPage from "./Pages/SortPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/sort" exact element={<SortPage />} />
      </Routes>
    </Router>
  );
}

export default App;
