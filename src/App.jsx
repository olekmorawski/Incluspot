import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./services/Auth";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapview" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
