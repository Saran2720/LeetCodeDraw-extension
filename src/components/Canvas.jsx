import React, { useState } from "react";
import { useRef, useEffect } from "react";

import { useDrawing } from "../ContextAPI/DrawingContext.jsx";
const Canvas = () => {
  //destructuring
  const {
    canvasRef,
    containerRef,
    selectedColor,
    lineWidth,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    redraw
  } = useDrawing();

  // const [tool, setTo0l] = useState("pencil");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redraw();
    }

    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  //pointers listener functions
  useEffect(() => {
    const c = canvasRef.current;
    const opts = { passive: false };

    const down = (e) => handlePointerDown(e);
    const move = (e) => handlePointerMove(e);
    const up = (e) => handlePointerUp(e);

    c.addEventListener("mousedown", down, opts);
    c.addEventListener("mousemove", move, opts);
    window.addEventListener("mouseup", up, opts);

    c.addEventListener("touchstart", down, opts);
    c.addEventListener("touchmove", move, opts);
    window.addEventListener("touchend", up, opts);

    return () => {
      c.removeEventListener("mousedown", down, opts);
      c.removeEventListener("mousemove", move, opts);
      window.removeEventListener("mouseup", up, opts);

      c.removeEventListener("touchstart", down, opts);
      c.removeEventListener("touchmove", move, opts);
      window.removeEventListener("touchend", up, opts);
    };
  }, [selectedColor, lineWidth,handlePointerDown, handlePointerMove, handlePointerUp]);

  return (
    <div ref={containerRef}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="border"
      ></canvas>
    </div>
  );
};

export default Canvas;

