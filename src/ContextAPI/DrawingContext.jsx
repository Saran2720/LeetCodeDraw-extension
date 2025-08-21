import { createContext, useContext, useRef, useState, useEffect } from "react";

const DrawingContext = createContext();

export const DrawingProvider = ({ children }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Vector history (redo-safe): list of strokes
  const strokesRef = useRef([]); // [{ tool, color, lineWidth, points: [{x,y}], id }]
  const historyRef = useRef([]); // stack of actions: {type:"stroke", stroke} | {type:"clear", prev}
  const redoRef = useRef([]); // same shape as historyRef

  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [lineWidth, setLineWidth] = useState(2);
  const [tool, setTool] = useState("pencil");

  const drawingRef = useRef(false);
  const currentStrokeRef = useRef(null);

  // Draw only the last segment for smooth incremental painting
  const drawStrokeSegment = (stroke, startIndex) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pts = stroke.points;
    if (pts.length < 2) return;

    const isEraser = stroke.tool === "eraser";
    const prevOp = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = isEraser ? "destination-out" : "source-over";

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = stroke.lineWidth;
    if (!isEraser) ctx.strokeStyle = stroke.color;

    ctx.beginPath();
    const i = Math.max(0, startIndex);
    ctx.moveTo(pts[i].x, pts[i].y);
    for (let j = i + 1; j < pts.length; j++) {
      ctx.lineTo(pts[j].x, pts[j].y);
    }
    ctx.stroke();

    ctx.globalCompositeOperation = prevOp;
  };

  //helpers fuction
  const getCanvasPos = (evt) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if (evt.touches && evt.touches[0]) {
      clientX = evt.touches[0].clientX;
      clientY = evt.touches[0].clientY;
    } else {
      clientX = evt.clientX;
      clientY = evt.clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  // const beginStroke = (pt) => {
  //   drawingRef.current = true;
  //   currentStrokeRef.current = {
  //     id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random(),
  //     tool, // use the selected tool (pencil or eraser)
  //     color: selectedColor,
  //     lineWidth: tool === "eraser" ? 20 : lineWidth, // bigger eraser size
  //     points: [pt],
  //   };
  // };
const beginStroke = (pt) => {
  drawingRef.current = true;
  currentStrokeRef.current = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random(),
    tool,                          // "pencil" or "eraser"
    color: selectedColor,          // ignored for eraser because of composite op
    lineWidth: tool === "eraser" ? 20 : lineWidth,
    points: [pt],
  };
};
  const extendStroke = (pt) => {
    const s = currentStrokeRef.current;
    if (!s) return;
    const last = s.points[s.points.length - 1];
    // Skip if movement is negligible to reduce points
    if (Math.hypot(pt.x - last.x, pt.y - last.y) < 0.5) return;
    s.points.push(pt);
    // Incremental draw for smoother preview
    drawStrokeSegment(s, s.points.length - 2);
  };

  const endStroke = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const s = currentStrokeRef.current;
    currentStrokeRef.current = null;
    if (!s || s.points.length < 2) return; // ignore taps
    strokesRef.current = [...strokesRef.current, s];
    historyRef.current = [...historyRef.current, { type: "stroke", stroke: s }];
    redoRef.current = []; // invalidate redo after new action
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    const pt = getCanvasPos(e);
    beginStroke(pt);
  };
  const handlePointerMove = (e) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const pt = getCanvasPos(e);
    extendStroke(pt);
  };
  const handlePointerUp = (e) => {
    e.preventDefault();
    endStroke();
  };

  const redraw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    clearCanvasPixels();
    for (const s of strokesRef.current) {
      drawStroke(ctx, s);
    }
  };

  const clearCanvasPixels = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
  };

  // Drawing primitives
  // const drawStroke = (ctx, stroke) => {
  //   const isEraser = stroke.tool === "eraser";
  //   const prevOp = ctx.globalCompositeOperation;
  //   ctx.globalCompositeOperation = isEraser ? "destination-out" : "source-over";

  //   ctx.lineJoin = "round";
  //   ctx.lineCap = "round";
  //   ctx.lineWidth = stroke.lineWidth;
  //   if (!isEraser) ctx.strokeStyle = stroke.color;

  //   ctx.beginPath();
  //   const pts = stroke.points;
  //   if (pts.length === 1) {
  //     // Dot
  //     const p = pts[0];
  //     ctx.arc(p.x, p.y, stroke.lineWidth / 2, 0, Math.PI * 2);
  //     ctx.fillStyle = isEraser ? "rgba(0,0,0,1)" : stroke.color;
  //     ctx.fill();
  //   } else {
  //     ctx.moveTo(pts[0].x, pts[0].y);
  //     for (let i = 1; i < pts.length; i++) {
  //       ctx.lineTo(pts[i].x, pts[i].y);
  //     }
  //     ctx.stroke();
  //   }

  //   ctx.globalCompositeOperation = prevOp;
  // };
const drawStroke = (ctx, stroke) => {
  const isEraser = stroke.tool === "eraser";
  const prevOp = ctx.globalCompositeOperation;

  ctx.globalCompositeOperation = isEraser ? "destination-out" : "source-over";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = stroke.lineWidth;
  if (!isEraser) ctx.strokeStyle = stroke.color;

  const pts = stroke.points;

  if (pts.length === 1) {
    // dot
    ctx.beginPath();
    ctx.arc(pts[0].x, pts[0].y, stroke.lineWidth / 2, 0, Math.PI * 2);
    if (!isEraser) ctx.fillStyle = stroke.color;
    ctx.fill();
  } else {
    // polyline
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
  }

  ctx.globalCompositeOperation = prevOp;
};


  // Undo / Redo / clear
  function undo() {
    const lastAction = historyRef.current[historyRef.current.length - 1];
    if (!lastAction) return;

    historyRef.current = historyRef.current.slice(0, -1);
    redoRef.current = [...redoRef.current, lastAction];

    if (lastAction.type === "stroke") {
      // remove that stroke
      const id = lastAction.stroke.id;
      strokesRef.current = strokesRef.current.filter((s) => s.id !== id);
    } else if (lastAction.type === "clear") {
      // restore previous strokes
      strokesRef.current = lastAction.prev;
    }
    redraw();
  }

  function redo() {
    const action = redoRef.current[redoRef.current.length - 1];
    if (!action) return;

    redoRef.current = redoRef.current.slice(0, -1);
    historyRef.current = [...historyRef.current, action];

    if (action.type === "stroke") {
      strokesRef.current = [...strokesRef.current, action.stroke];
    } else if (action.type === "clear") {
      strokesRef.current = [];
    }
    redraw();
  }

  function clear() {
    if (strokesRef.current.length === 0) return;
    const prev = strokesRef.current;
    strokesRef.current = [];
    historyRef.current = [...historyRef.current, { type: "clear", prev }];
    redoRef.current = [];
    redraw();
  }

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      } else if (e.key === "Delete" || e.key === "Backspace") {
        if (
          document.activeElement &&
          document.activeElement.tagName === "INPUT"
        )
          return;
        e.preventDefault();
        clear();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <DrawingContext.Provider
      value={{
        canvasRef,
        containerRef,
        selectedColor,
        setSelectedColor,
        lineWidth,
        setLineWidth,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        redraw,
        setTool,
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
