import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Loadvideo from "./pages/LoadVideo.jsx";
import Search from "./pages/Search.jsx";

export default function App() {
  return (
    <Router>
      <div className=" bg-zinc-950 text-white">
        <nav className="p-4 bg-zinc-800">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">Inicio</Link>
            </li>
            <li>
              <Link to="/loadvideo" className="hover:underline">Cargar Video</Link>
            </li>
            <li>
              <Link to="/search" className="hover:underline">Buscar</Link>
            </li>
          </ul>
        </nav>

        <div className="p-4">
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/loadvideo" element={<Loadvideo />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}