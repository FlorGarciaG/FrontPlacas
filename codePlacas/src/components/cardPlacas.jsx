import React from "react";
import { Chip } from "@mui/material";
import pruebaImg from "../assets/prueba.jpeg";
import { Report } from "@mui/icons-material";
import { Error } from "@mui/icons-material";

export default function CardPlacas({ placa }) {
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

  return (
    <div className="card rounded-lg shadow-md bg-white outline outline-2 outline-[#e0c48c]">
      <div className="card-body m-4">
        <h1 className="text-center font-bold text-lg">{placa.texto_placa}</h1>
        <div className="flex justify-center my-3">
          <img
            src={pruebaImg}
            alt="Placa"
            className="rounded-lg"
            height={120}
            width={170}
          />
        </div>{" "}
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
        {/* <div className="flex justify-between gap-2 mt-3">
              <Chip
                label="Robado?"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                }}
                icon={<Report />}
              />
              <Chip
                label="Ticket?"
                sx={{
                  backgroundColor: "orange",
                  color: "white",
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                }}
                icon={<Error />}
              />
            </div> */}
      </div>
    </div>
  );
}
