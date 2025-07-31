import React from "react";

const ToolButton = ({ icon, onclick }) => {
  return (
    <button
      className="p-2 rounded hover-bg-gray-200 dark:hoverbg-gray-700"
      onClick={onclick}
    >
      {icon}
    </button>
  );
};

export default ToolButton;
