import React, {useEffect, useState} from "react";
import { Chip } from "@mui/material";
import pruebaImg from "../assets/prueba.jpeg";
import { Report } from "@mui/icons-material";
import { Error } from "@mui/icons-material";
import { buscarPlaca } from "../services/not";

export default function CardPlacas({ placa }) {
  const [estadoPlaca, setEstadoPlaca] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const fecha = placa.fecha_deteccion ? new Date(placa.fecha_deteccion) : null;
  const fechaFormateada = fecha
    ? new Intl.DateTimeFormat("es-MX", {
        dateStyle: "short",
      }).format(fecha)
    : "Fecha no disponible";

  const horaFormateada = fecha
    ? new Intl.DateTimeFormat("es-MX", {
        timeStyle: "medium",
      }).format(fecha)
    : "Hora no disponible";

  useEffect(() => {
    const consultarEstadoPlaca = async () => {
      if (!placa?.texto_placa) return;

      setCargando(true);
      setError(null);

      try {
        const resultado = await buscarPlaca(placa.texto_placa);
        setEstadoPlaca(resultado);
      } catch (err) {
        console.error("Error al consultar estado de la placa:", err);
        setError("No se pudo verificar el estado de la placa");
        setEstadoPlaca(null);
      } finally {
        setCargando(false);
      }
    };

    consultarEstadoPlaca();
  }, [placa]);

  return (
    <div className="card rounded-lg shadow-md bg-white outline outline-2 outline-[#e0c48c]">
      <div className="card-body m-4">
        <h1 className="text-center font-bold text-lg">{placa.texto_placa}</h1>
        {/* <div className="flex justify-center my-3">
          <img
            src={placa.imagenUrl || pruebaImg} 
            alt={`Placa: ${placa.texto_placa}`} 
            className="rounded-lg"
            height={120}
            width={170}
          />
        </div> */}
        <p>
          <strong>Estado:</strong> {placa.estado}
        </p>
        {/* <p><strong>Tipo:</strong> Particular</p> */}
        <p>
          <strong>Fecha:</strong> {fechaFormateada}
        </p>
        <p>
          <strong>Hora:</strong> {horaFormateada}
        </p>
        {/* Estado de carga */}
        {cargando && (
          <div className="text-center py-2">
            Verificando estado de la placa...
          </div>
        )}

        <div className="flex justify-between gap-2 mt-3">
          {/* Chip de Robado */}
          {estadoPlaca?.robado && (
            <Chip
              label="Robado"
              sx={{
                backgroundColor: "red",
                color: "white",
                "& .MuiChip-icon": {
                  color: "white",
                },
              }}
              icon={<Report />}
            />
          )}

          {estadoPlaca?.tiene_multas && (
            <Chip
              label="Multas"
              sx={{
                backgroundColor: "orange",
                color: "white",
                "& .MuiChip-icon": {
                  color: "white",
                },
              }}
              icon={<Error />}
            />
          )}

          {!cargando && !error && estadoPlaca === null && (
            <Chip
              label="Sin registros"
              sx={{
                backgroundColor: "gray",
                color: "white",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
