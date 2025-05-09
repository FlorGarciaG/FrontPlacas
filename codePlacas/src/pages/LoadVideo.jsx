import React, { useState } from "react";
import api from "../services/api"; // Importar la configuración de Axios

export default function LoadVideo() {
  const [videoSrc, setVideoSrc] = useState(""); // URL del video procesado
  const [detectedPlates, setDetectedPlates] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        alert("Por favor, selecciona un archivo de video válido.");
        return;
      }

      console.log("Archivo seleccionado:", file);
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("sample_rate", 1);

      // Depurar el contenido de formData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      try {
        const response = await api.post("/detect/video", formData);
        console.log("Respuesta del backend:", response.data);

        // Establecer las placas detectadas
        setDetectedPlates(response.data.placas_detectadas || []);

        // Construir la URL del video procesado
        const videoName = response.data.video_guardado.replace(
          ".mp4",
          "_etiquetado_fixed.mp4"
        );
        const videoUrl = `http://127.0.0.1:5000/videos/${videoName}`;
        console.log("URL del video procesado:", videoUrl);

        // Establecer la URL del video procesado
        setVideoSrc(videoUrl);
      } catch (error) {
        console.error("Error al cargar el video:", error);
        alert(
          "Hubo un error al procesar el video. Verifica que el backend esté corriendo y que permita solicitudes desde este origen."
        );
      } finally {
        setIsUploading(false);
      }
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  };

  return (
    <div className="flex h-screen bg-[#fff5e0] text-gray-800">
      {/* Sección de video */}
      <div className="w-[60%] p-6">
        <div className="h-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
          {videoSrc ? (
            <video
              controls
              className="w-full h-full object-contain"
              src={videoSrc}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analizar video</h3>
              <p className="text-gray-500 mb-5">
                Sube un video para detectar placas vehiculares
              </p>
              <label
                className={`cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition shadow-sm ${
                  isUploading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isUploading
                  ? "Subiendo y procesando el video..."
                  : "Seleccionar video"}
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Sección de resultados */}
      <div className="w-[40%] p-6">
        <div className="h-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
          <div className="p-5 bg-gray-50 border-b">
            <h2 className="font-semibold text-lg">Placas detectadas</h2>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-500">
                {detectedPlates.length} elementos
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {detectedPlates.length > 0 ? (
              <div className="space-y-3">
                {detectedPlates.map((plate, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-200 transition"
                  >
                    <p className="font-mono font-bold text-gray-800">{plate}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <h4 className="font-medium text-gray-500">No hay resultados</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Procesa un video para ver detecciones
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
