import React, { useEffect, useState } from "react";
import Filters from "../components/filters.jsx";
import CardPlacas from "../components/cardPlacas.jsx";
import { getPlacas } from "../services/api.js";

export default function Search() {
  const [placas, setPlacas] = useState([]);
  const [filteredPlacas, setFilteredPlacas] = useState([]);
  const [filters, setFilters] = useState({
    placas: "",
    estado: null,
    fecha_inicio: "",
    fecha_fin: "",
  });

  useEffect(() => {
    const fetchPlacas = async () => {
      try {
        const data = await getPlacas();
        const placasConImagenes = data.placas
          .filter((placa) => placa.tipo !== "video") // Filtrar los que tienen "Video" en el campo "tipo"
          .map((placa) => ({
            ...placa,
            imagenUrl: placa.url_imagen || null, // Agregar URL de imagen si está disponible
          }));
        setPlacas(placasConImagenes);
        setFilteredPlacas(placasConImagenes); // mostrar todo por defecto
      } catch (error) {
        console.error("Error al obtener las placas:", error);
      }
    };
    fetchPlacas();
  }, []);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);

    const filtered = placas.filter((placa) => {
      const matchPlaca =
        !newFilters.placas ||
        placa.texto_placa
          ?.toLowerCase()
          .includes(newFilters.placas.toLowerCase());

      const matchEstado =
        !newFilters.estado || placa.estado === newFilters.estado.label;

      // Convertir fecha UTC a CDMX
      const fechaPlaca = new Date(
        new Date(placa.fecha_deteccion).toLocaleString("en-US", {
          timeZone: "America/Mexico_City",
        })
      );

      const fechaInicio = newFilters.fecha_inicio
        ? new Date(newFilters.fecha_inicio)
        : null;

      const fechaFin = newFilters.fecha_fin
        ? new Date(newFilters.fecha_fin + "T23:59:59")
        : null;

      const matchFechaInicio = !fechaInicio || fechaPlaca >= fechaInicio;
      const matchFechaFin = !fechaFin || fechaPlaca <= fechaFin;

      return matchPlaca && matchEstado && matchFechaInicio && matchFechaFin;
    });

    setFilteredPlacas(filtered);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-screen overflow-y-auto p-2">
        <div className="mb-4 bg-white outline outline-1 outline-[#e0c48c] rounded-lg shadow-md">
          <Filters onFilter={applyFilters} />
        </div>
        <div className="flex flex-wrap py-2 gap-3 justify-center items-center ">
          {filteredPlacas.length > 0 ? (
            filteredPlacas.map((placa) => (
              <CardPlacas key={placa._id} placa={placa} />
            ))
          ) : (
            <p>No se encontraron placas</p>
          )}
        </div>
      </div>
    </div>
  );
}
