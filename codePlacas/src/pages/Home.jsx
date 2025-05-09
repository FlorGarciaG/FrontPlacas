import React from "react";
import Webcam from "react-webcam";
import Alert from "@mui/material/Alert";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Webcam
        audio={false}
        videoConstraints={{ facingMode: "user" }}
        className="rounded-xl w-100 h-auto"
      />
    </div>
  );
}
