import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./components/Menu";

function App() {
  const [provider, setProvider] = useState<any>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App mt-10">
      <Menu provider={provider} setProvider={setProvider} />
      <Routes>
        <Route path="/" element={<Home provider={provider} />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
