import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Ad } from "./pages/Ad";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:gameId" element={<Ad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
