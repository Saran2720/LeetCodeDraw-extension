import React from "react";

const colors = [
  "black", "red", "orange", "green", "blue", "white", "yellow", "purple"
];

const ColorPicker = ({ selectedColor, changeColor }) => (
  <div className="grid grid-cols-4 gap-2 mb-3">
    {colors.map((color) => (
      <button
        key={color}
        className={`w-6 h-6 rounded-full border-2 ${
          selectedColor === color
            ? "border-black dark:border-white"
            : "border-black"
        }`}
        style={{ backgroundColor: color }}
        onClick={() => changeColor(color)}
      />
    ))}
  </div>
);

export default ColorPicker;
