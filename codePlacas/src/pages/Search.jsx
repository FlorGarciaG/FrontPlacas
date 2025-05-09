import React from "react";
import Filters from "../components/filters.jsx";
import CardPlacas from "../components/cardPlacas.jsx";


export default function Search() {
  return (
    <div className="flex flex-col h-screen ">
      <div className="mb-4 bg-white outline outline-1 outline-[#e0c48c] rounded-lg shadow-md">
        <Filters />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <CardPlacas />
      </div>
    </div>
  );
}
