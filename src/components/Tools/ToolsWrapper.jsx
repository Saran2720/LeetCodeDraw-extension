import React from "react";
import ToolButton from "./ToolButton";
import { useState } from "react";
import { FaEraser, FaPen, FaTrash, FaRedo, FaUndo } from "react-icons/fa";
import PenTool from "./PenTool";
import { useDrawing } from "../../ContextAPI/DrawingContext";

const ToolsWrapper = () => {
  const [showpenTool, setShowPenTool] = useState(false);
  const { undo, redo, clear, setTool } = useDrawing();
  return (
    <div className="fixed top-10 right-4 flex flex-col items-center gap-3 p-2 bd-white dark:bg-stone-800 dark-text-white rounded-xl shadow-lg z-50">
      <ToolButton
        icon={<FaPen />}
        onClick={() => {
          setShowPenTool(true);
          setTool("pencil");
          // console.log("pen")
        }}
      />
      {showpenTool && <PenTool onClose={() => setShowPenTool(false)} />}

      <ToolButton
        icon={<FaEraser />}
        onClick={() => {
          setTool("eraser");
          setShowPenTool(false);
          // console.log("eraser");
        }}
      />
      <div className="border-t w-full border-gray-300 dark:border-gray-600 my-1"></div>
      <ToolButton icon={<FaUndo />} onClick={undo} />
      <ToolButton icon={<FaRedo />} onClick={redo} />
      <ToolButton icon={<FaTrash />} onClick={clear} />
    </div>
  );
};

export default ToolsWrapper;
