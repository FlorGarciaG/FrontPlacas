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
    <div className="flex h-screen bg-[#fff5e0] text-gray-800">
      {/* Sección de video */}
      <div className="w-[60%] p-6">
        <div className="h-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
          {videoSrc ? (
            <video controls className="w-full h-full object-contain" src={videoSrc} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analizar video</h3>
              <p className="text-gray-500 mb-5">Sube un video para detectar placas vehiculares</p>
              <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition shadow-sm">
                Seleccionar video
                <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="w-[40%] p-6">
        <div className="h-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
          <div className="p-5 bg-gray-50 border-b">
            <h2 className="font-semibold text-lg">Placas detectadas</h2>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-500">{detectedPlates.length} elementos</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {detectedPlates.length > 0 ? (
              <div className="space-y-3">
                {detectedPlates.map((plate) => (
                  <div key={plate.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-200 transition">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-mono font-bold text-gray-800">{plate.plate}</p>
                        <p className="text-xs text-gray-500 mt-1">{plate.timestamp}</p>
                      </div>
                      <span 
                        className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center justify-center ${
                        plate.confidence > 0.9 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {Math.round(plate.confidence * 100)}% confianza
                      </span>
                    </div>
                    <button className="mt-3 text-xs text-blue-500 hover:text-blue-700 font-medium">
                      Ver captura →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-500">No hay resultados</h4>
                <p className="text-sm text-gray-400 mt-1">Procesa un video para ver detecciones</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}