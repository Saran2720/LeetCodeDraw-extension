import React from "react";

const ToolButton = ({ icon, onClick }) => {
  return (
    <button
      className="p-2 rounded hover-bg-gray-200 dark:hoverbg-gray-700"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default ToolButton;
