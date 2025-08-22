// content.js
(function () {
  if (document.getElementById("floating-button-wrapper")) return;

  const button = document.createElement("div");
  button.id = "floating-button-wrapper";
  button.style.position = "fixed";
  button.style.bottom = "100px";
  button.style.right = "30px";
  button.style.zIndex = "99999";
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.padding = "2px";
  button.style.borderRadius = "50%";
  button.style.background = "linear-gradient(to top, #029e9eff 0%, #330867 100%)";
  button.style.display = "flex";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.style.cursor = "pointer";
  button.style.color = "#fff";
  button.style.fontSize = "28px";
  button.innerText = "🖊️";

  document.body.appendChild(button);

  // Draggable
  let isDragging = false,
    offsetX,
    offsetY;
  button.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - button.getBoundingClientRect().left;
    offsetY = e.clientY - button.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    button.style.left = e.clientX - offsetX + "px";
    button.style.top = e.clientY - offsetY + "px";
    button.style.right = "auto";
    button.style.bottom = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Toggle canvas
  let isBoardOpen = false;
 
  button.addEventListener("click", () => {
    let container = document.getElementById("canvas-root");
    if (!container) {
      // console.log("Creating canvas-root div");
      container = document.createElement("div");
      container.id = "canvas-root";
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = "100vw";
      container.style.height = "100vh";
      container.style.zIndex = "99998";
      container.style.background = "rgba(30, 30, 30, 1)";
      container.style.opacity=1;
      container.style.display = "block";
      document.body.appendChild(container);

      //injecting react files as build
      const script = document.createElement("script");
      script.src = chrome.runtime.getURL("assets/main.js"); // correct Vite build path
      script.type = "module";
      document.body.appendChild(script);

      isBoardOpen = true;
    } else {
      console.log("Toggling canvas visibility");
      if (isBoardOpen) {
        container.style.display = "none";
      } else {
        container.style.display = "block";
      }
      isBoardOpen = !isBoardOpen;
    }
  });
})();
