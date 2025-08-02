import React from "react";
import ToolsWrapper from "./Tools/ToolsWrapper";
import Canvas from "./Canvas";
import { DrawingProvider } from "../ContextAPI/DrawingContext";

const WhiteBoard = () => {
  return (
    <DrawingProvider>
      <Canvas />
      <ToolsWrapper />
    </DrawingProvider>
  );
};

export default WhiteBoard;
