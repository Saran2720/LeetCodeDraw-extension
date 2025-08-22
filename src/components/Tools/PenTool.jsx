// import React, { useEffect } from "react";
// import ColorPicker from "./ColorPicker";
// import { useState, useRef } from "react";
// import SizeSlider from "./SizeSlider";
// import { useDrawing } from "../../ContextAPI/DrawingContext.jsx";

// const PenTool = ({ onClose }) => {
//   const pickerRef = useRef();

//   const { selectedColor, setSelectedColor, lineWidth, setLineWidth } =
//     useDrawing();

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (pickerRef.current && !pickerRef.current.contains(e.target)) {
//         onClose();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     //it cleanup the event listener and avoid memory leak
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [onClose]);

//   return (
//     <div
//       className="p-4 dark:bg-stone-800 rounded-lg shadow-md absolute right-14 top-0 z-50"
//       ref={pickerRef}
//       style={{ width: "200px" }}
//     >
//       <ColorPicker
//         selectedColor={selectedColor}
//         changeColor={(color) => {
//           setSelectedColor(color);
//         }}
//       />

//       <SizeSlider
//         lineWidth={lineWidth}
//         changeWidth={(width) => setLineWidth(width)}
//       />
//     </div>
//   );
// };

// export default PenTool;



import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ColorPicker from "./ColorPicker";
import SizeSlider from "./SizeSlider";
import { useDrawing } from "../../ContextAPI/DrawingContext.jsx";

const PenTool = ({ onClose, parentRef }) => {
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // ✅ Get position of parent button to place the popup near it
  const rect = parentRef?.current?.getBoundingClientRect();

  const style = rect
    ? {
        position: "absolute",
        top: rect.top + window.scrollY, // account for page scroll
        left: rect.left - 220, // show left of the toolbar
        zIndex: 99999,
        width: "200px",
      }
    : {};

  return createPortal(
    <div
      ref={pickerRef}
      style={style}
      className="p-4 bg-stone-800 rounded-lg shadow-md"
    >
      <ColorPicker
        selectedColor={selectedColor}
        changeColor={(color) => setSelectedColor(color)}
      />
      <SizeSlider
        lineWidth={lineWidth}
        changeWidth={(width) => setLineWidth(width)}
      />
    </div>,
    document.body
  );
};

export default PenTool;
