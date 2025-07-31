import React from "react";

const SizeSlider = ({ lineWidth,changeWidth }) => {
  return (
    <div>
      <input
        id="small-range"
        type="range"
        value={lineWidth}
        className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
        onChange={(e) => changeWidth(e.target.value)}
      ></input>
    </div>
  );
};

export default SizeSlider;
