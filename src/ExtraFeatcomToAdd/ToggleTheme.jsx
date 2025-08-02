import React, { useEffect, useState } from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  const changeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <button
      onClick={() => changeTheme()}
      className="p-2 rounded hover-bg-gray-200 dark:hoverbg-gray-700"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ToggleTheme;
