import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Loadvideo from "./pages/LoadVideo.jsx";
import Search from "./pages/Search.jsx";

export default function App() {
  const tabStyle = "inline-block px-6 py-2 font-medium relative -mb-px transition-all duration-200";
  
  return (
    <Router>
      <div className="bg-stone-100 min-h-screen p-4">
        <div className="bg-[#f5e8c9] border-2 border-[#e0c48c] rounded-lg shadow-lg overflow-hidden">
          <nav className="px-4 pt-2 bg-[#f5e8c9]">
            <ul className="flex">
              <li className="mr-1">
                <NavLink 
                  to="/" 
                  end
                  className={({ isActive }) => 
                    `${tabStyle} ${
                      isActive 
                        ? 'bg-[#fff5e0] text-[#8a6d3b] border-t-2 border-l-2 border-r-2 border-[#d4b772] shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] z-10 font-semibold' 
                        : 'bg-[#f0d9a7] text-[#7a5c2b] hover:bg-[#f5e0b5] border-t border-l border-r border-[#d4b772]'
                    }`
                  }
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 0% 100%)',
                    marginRight: '-12px',
                    borderRadius: '6px 8px 0 0'
                  }}
                >
                  Inicio
                </NavLink>
              </li>
              <li className="mr-1">
                <NavLink 
                  to="/loadvideo" 
                  className={({ isActive }) => 
                    `${tabStyle} ${
                      isActive 
                        ? 'bg-[#fff5e0] text-[#8a6d3b] border-t-2 border-l-2 border-r-2 border-[#d4b772] shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] z-10 font-semibold' 
                        : 'bg-[#f0d9a7] text-[#7a5c2b] hover:bg-[#f5e0b5] border-t border-l border-r border-[#d4b772]'
                    }`
                  }
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)',
                    marginRight: '-12px',
                    borderRadius: '6px 8px 0 0'
                  }}
                >
                  Cargar Video
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/search" 
                  className={({ isActive }) => 
                    `${tabStyle} ${
                      isActive 
                        ? 'bg-[#fff5e0] text-[#8a6d3b] border-t-2 border-l-2 border-r-2 border-[#d4b772] shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] z-10 font-semibold' 
                        : 'bg-[#f0d9a7] text-[#7a5c2b] hover:bg-[#f5e0b5] border-t border-l border-r border-[#d4b772]'
                    }`
                  }
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15px 100%)',
                    borderRadius: '6px 8px 0 0'
                  }}
                >
                  Buscar
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="p-6 bg-[#fff5e0] border-t-2 border-[#d4b772] min-h-[calc(100vh-120px)]">
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={<Home />} />
              <Route path="/loadvideo" element={<Loadvideo />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}