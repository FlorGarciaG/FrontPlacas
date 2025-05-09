import React, { useState } from "react";
import Webcam from "react-webcam";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import Slide from "@mui/material/Slide";

export default function Home() {
  const [alertType, setAlertType] = useState(""); // Estado para controlar el tipo de alerta
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la animación

  // Simulación de datos del backend
  const handleBackendResponse = (response) => {
    setAlertType(response);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Simular llamada al backend
  const simulateBackendCall = () => {
    const responses = ["detected", "error", "stolen"];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    handleBackendResponse(randomResponse);
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#fff5e0] overflow-hidden">
      {" "}
      {/* Webcam */}
      <div className="relative p-4">
        <Webcam
          audio={false}
          videoConstraints={{ facingMode: "user" }}
          className="rounded-xl w-100 h-auto"
        />

        {/* Alertas sobrepuestas con animación */}
        <div className="absolute top-6 right-6">
          <Slide direction="left" in={showAlert} mountOnEnter unmountOnExit>
            <div>
              {alertType === "detected" && (
                <Alert variant="filled"  severity="success" className="w-80">
                  Vehículo detectado correctamente.
                </Alert>
              )}
              {alertType === "error" && (
                <Alert variant="filled" severity="warning" className="w-80">
                  Fallo al detectar el vehículo.
                </Alert>
              )}
              {alertType === "stolen" && (
                <Alert variant="filled" severity="error" className="w-80">
                  ¡Vehículo reportado como robado!
                </Alert>
              )}
            </div>
          </Slide>
        </div>
      </div>
      {/* Botón para simular datos del backend */}
      <button
        onClick={simulateBackendCall}
        className="bg-[#8a6d3b] hover:bg-[#7a5c2b] text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors"
      >
        Simular Respuesta del Backend
      </button>
    </div>
  );
}
