import React, { useEffect } from "react";
import ColorPicker from "./ColorPicker";
import { useState, useRef } from "react";
import SizeSlider from "./SizeSlider";
import { useDrawing } from "../../ContextAPI/DrawingContext.jsx";

const PenTool = ({ onClose }) => {
  const pickerRef = useRef();

  const { selectedColor, setSelectedColor, lineWidth, setLineWidth } =
    useDrawing();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    //it cleanup the event listener and avoid memory leak
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="p-4 dark:bg-stone-800 rounded-lg shadow-md absolute right-14 top-0 z-50"
      ref={pickerRef}
      style={{ width: "200px" }}
    >
      <ColorPicker
        selectedColor={selectedColor}
        changeColor={(color) => {
          setSelectedColor(color);
        }}
      />

      <SizeSlider
        lineWidth={lineWidth}
        changeWidth={(width) => setLineWidth(width)}
      />
    </div>
  );
};

export default PenTool;
