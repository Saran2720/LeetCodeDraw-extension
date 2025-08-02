import React from "react";

const tailwindColors = [
  { name: "red-500", hex: "#ef4444" },
  { name: "amber-500", hex: "#f59e0b" },
  { name: "emerald-500", hex: "#4eafe7ff" },
  { name: "sky-500", hex: "#12d597ff" },
  { name: "white", hex: "#ffffff" },
  { name: "purple-500", hex: "#8b5cf6" },
  { name: "rose-400", hex: "#eda9b4ff" },
];


const ColorPicker = ({ selectedColor, changeColor }) => (
  <div className="grid grid-cols-4 gap-2 mb-3">
    {tailwindColors.map(({ hex, name }) => (
      <button
        key={name}
        className={`w-6 h-6 rounded-full border-2 transition-shadow duration-200 ${
          selectedColor === hex
            ? "ring-2 ring-white shadow-md shadow-white"
            : "border-white"
        }`}
        style={{ backgroundColor: hex }}
        onClick={() => changeColor(hex) }
        title={name}
      />
    ))}
  </div>
);

export default ColorPicker;
