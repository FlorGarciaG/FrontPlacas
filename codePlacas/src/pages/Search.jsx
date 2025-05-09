import React, { use, useEffect, useState } from "react";
import Filters from "../components/filters.jsx";
import CardPlacas from "../components/cardPlacas.jsx";
import { getPlacas } from "../services/api.js";

export default function Search() {
  const [placas, setPlacas] = useState([]);

  useEffect(() => {
    const fetchPlacas = async () => {
      try {
        const data = await getPlacas();
        console.log("Placas obtenidas", data.placas);
        setPlacas(data.placas);
      } catch (error) {
        console.error("Error al obtener las placas:", error);
      }
    };
    fetchPlacas();
  }, []);

  return (
    <div className="flex flex-col h-screen ">
      <div className="mb-4 bg-white outline outline-1 outline-[#e0c48c] rounded-lg shadow-md">
        <Filters />
      </div>
      <div className="flex flex-wrap py-2 justify-center items-center gap-4 overflow-y-auto h-full">
        {placas.length > 0 ? (
          placas.map((placa) => <CardPlacas key={placa._id} placa={placa} />)
        ) : (
          <p>No se encontraron placas</p>
        )}
      </div>
    </div>
  );
}
