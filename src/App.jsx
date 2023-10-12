import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapview" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
