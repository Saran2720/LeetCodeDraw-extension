import { createContext, useContext, useState } from "react";

const DrawingContext = createContext();

export const DrawingProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [lineWidth, setLineWidth] = useState(2);

  return (
    <DrawingContext.Provider
      value={{ selectedColor, setSelectedColor, lineWidth, setLineWidth }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawing = () => useContext(DrawingContext);


