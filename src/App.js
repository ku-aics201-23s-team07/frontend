import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SortPage from "./Pages/SortPage";
import NewPage from "./Pages/NewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/sort" exact element={<SortPage />} />
        <Route path="/new" exact element={<NewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
