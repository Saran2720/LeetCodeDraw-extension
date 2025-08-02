import React from "react";
import { useRef, useEffect } from "react";
import * as fabric from "fabric";
import { useDrawing } from "../ContextAPI/DrawingContext.jsx";
const Canvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const { selectedColor, lineWidth } = useDrawing();

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      backgroundColor: "#1c1917",
    });
    fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.color = selectedColor;
    fabricCanvas.freeDrawingBrush.width = 3;
    fabricCanvas.renderAll();

    fabricCanvasRef.current = fabricCanvas;
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      //   console.log(fabricCanvasRef.current);
      fabricCanvasRef.current.freeDrawingBrush.color = selectedColor;
      fabricCanvasRef.current.freeDrawingBrush.width = lineWidth;
      console.log(lineWidth);
    }
    // console.log(selectedColor);
  }, [selectedColor, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="border"
    ></canvas>
  );
};

export default Canvas;
