import React, { useState } from "react";

export default function LoadVideo() {
  const [videoSrc, setVideoSrc] = useState("");
  const [detectedPlates, setDetectedPlates] = useState([
    { id: 1, plate: "ABC-123", timestamp: "10:23:45", confidence: 0.92 },
    { id: 2, plate: "XYZ-789", timestamp: "10:24:13", confidence: 0.87 },
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white p-4">
      <div className="w-[70%] pr-4">
        <div className="h-full bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          {videoSrc ? (
            <video
              controls
              className="w-full h-full object-contain bg-black"
              src={videoSrc}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <svg
                className="w-16 h-16 mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xl font-medium mb-2">Cargar video para análisis</p>
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                Seleccionar archivo
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-gray-400 text-sm mt-2">Formatos soportados: MP4</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-[30%]">
        <div className="h-full bg-gray-800 rounded-lg shadow-xl flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold">Placas detectadas</h2>
            <p className="text-sm text-gray-400">{detectedPlates.length} resultados</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {detectedPlates.length > 0 ? (
              <ul className="divide-y divide-gray-700">
                {detectedPlates.map((plate) => (
                  <li key={plate.id} className="p-4 hover:bg-gray-700/50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-xl font-bold">{plate.plate}</p>
                        <p className="text-sm text-gray-400">{plate.timestamp}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          plate.confidence > 0.9
                            ? "bg-green-900 text-green-300"
                            : "bg-yellow-900 text-yellow-300"
                        }`}
                      >
                        {Math.round(plate.confidence * 100)}%
                      </span>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button className="text-xs bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded">
                        Ver captura
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                <svg
                  className="w-12 h-12 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>No se han detectado placas aún</p>
                <p className="text-sm mt-1">Analiza un video para ver resultados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}