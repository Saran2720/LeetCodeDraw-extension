import { createContext, useContext, useRef, useState } from "react";

const DrawingContext = createContext();

export const DrawingProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [lineWidth, setLineWidth] = useState(2);

  //stack for undo redo del erase
  const undoStack = useRef([]); //stack ref
  const redoStack = useRef([]);
  const fabriccanvasref = useRef(null);

  const setCanvas = (canvas) => {
    fabriccanvasref.current = canvas;

    //intial empty state => [] save in undo
    const json = canvas.toJSON();
    undoStack.current.push(json);

    //save the state for every draw modification
    canvas.on("path:created", () => {
      const json = canvas.toJSON();
      undoStack.current.push(json);
      redoStack.current = [];
    });
  };

  //undo function
  const undo = () => {
    if (undoStack.current.length > 1) {
      const currState = undoStack.current.pop();
      redoStack.current.push(currState);
      const prevState = undoStack.current[undoStack.current.length - 1];

      fabriccanvasref.current.loadFromJSON(prevState, () => {
        fabriccanvasref.current.renderAll();
      });
    }
  };

  //redo fuction
  const redo = () => {
    if (redoStack.current.length > 0) {
      const nextState = redoStack.current.pop();
      undoStack.current.push(nextState);
      fabriccanvasref.current.loadFromJSON(nextState, () => {
        fabriccanvasref.current.renderAll();
      });
    }
  };

  //clear canvas
  const clear = () => {
    const canvas = fabriccanvasref.current;
    if (canvas) {
      const currState = canvas.toJSON();
      undoStack.current.push(currState);
      redoStack.current = [];
      canvas.clear();
      canvas.backgroundColor = "#1c1917";
      canvas.renderAll();
    }
  };
  return (
    <DrawingContext.Provider
      value={{
        selectedColor,
        setSelectedColor,
        lineWidth,
        setLineWidth,
        setCanvas,
        undo,
        redo,
        clear,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawing = () => useContext(DrawingContext);
