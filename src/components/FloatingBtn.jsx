import React, { useRef } from "react";

const FloatingBtn = () => {
  const btnRef = useRef(null);
  const handleStartDrag = (e) => {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newLeft = e.clientX - offsetX;
      const newTop = e.clientY - offsetY;
      btn.style.left = `${newLeft}px`;
      btn.style.top = `${newTop}px`;
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
      <button
        ref={btnRef}
        onMouseDown={handleStartDrag}
        className="fixed bottom-[20px] right-[30px] z-[999999] w-[50px] h-[50px] p-[2px] rounded-full bg-[#519ceb] text-white text-[28px] flex justify-center items-center cursor-pointer"
      >
        🖊️
      </button>
    </div>
  );
};

export default FloatingBtn;
