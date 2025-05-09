import React, { useState, useEffect, useRef } from "react";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

export default function Home() {
  // URLs de streaming
  const [viewUrl, setViewUrl] = useState("");
  const [wsUrl, setWsUrl]     = useState("");
  const wsRef                 = useRef(null);

  // Estados de alerta
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Lista de placas únicas (máximo 10)
  const [platesList, setPlatesList] = useState([]);

  // 1) Iniciar el stream al montar
  useEffect(() => {
    const BACKEND_BASE = "http://127.0.0.1:5001";
    fetch(`${BACKEND_BASE}/api/stream/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: 0 }),
    })
      .then(res => res.json())
      .then(json => {
        setViewUrl(json.view_url);
        setWsUrl(json.ws_url);
      })
      .catch(err => console.error("Error al iniciar stream:", err));
  }, []);

  // 2) Conectar WebSocket y actualizar placas
  useEffect(() => {
    if (!wsUrl) return;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = evt => {
      try {
        const msg = JSON.parse(evt.data);
        if (msg.event === "plate_detected" && Array.isArray(msg.data)) {
          // Mostrar alerta
          setAlertType("detected");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);

          // Actualizar listado de matrículas
          setPlatesList(prev => {
            const next = [...prev];
            msg.data.forEach(plate => {
              // plate.texto existe según tu payload
              if (!next.includes(plate.texto)) {
                next.unshift(plate.texto);
              }
            });
            return next.slice(0, 10);
          });
        }
      } catch (e) {
        console.error("WS parse error:", e);
      }
    };

    ws.onerror = e => console.error("WS error:", e);

    return () => ws.close();
  }, [wsUrl]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#fff5e0] overflow-hidden p-4">
      {/* Stream MJPEG */}
      <div className="w-full max-w-lg mb-4">
        {viewUrl ? (
          <img src={viewUrl} className="rounded-xl w-full" alt="Live Stream" />
        ) : (
          <p>Cargando video…</p>
        )}
      </div>

      {/* Lista de placas */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Placas detectadas</h2>
        {platesList.length === 0 ? (
          <p className="text-gray-500">No se han detectado placas aún.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {platesList.map(texto => (
              <li key={texto} className="font-mono">
                {texto}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Alertas sobrepuestas */}
      <div className="absolute top-6 right-6">
        <Slide direction="left" in={showAlert} mountOnEnter unmountOnExit>
          <div>
            {alertType === "detected" && (
              <Alert variant="filled" severity="success" className="w-80">
                Vehículo detectado correctamente.
              </Alert>
            )}
          </div>
        </Slide>
      </div>
    </div>
  );
}