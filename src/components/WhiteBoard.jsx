import React from "react";
import ToolsWrapper from "./Tools/ToolsWrapper";
import Canvas from "./Canvas";
import { DrawingProvider } from "../ContextAPI/DrawingContext";

const WhiteBoard = () => {
  return (
    // contextAPI => logic implementtaion of drawing , undo , redo ,delete , erase
    <DrawingProvider>
      {/* implementtaion of pointers listener */}
      <Canvas />
      {/* has the components of all tools  */}
      <ToolsWrapper />
    </DrawingProvider>
  );
};

export default WhiteBoard;
