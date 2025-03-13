import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/login";

import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
}

export default App