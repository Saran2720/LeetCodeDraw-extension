// content.js
const rootId = "flating-btn-wrapper";
if (!document.getElementById(rootId)) {
  const app = document.createElement("div");
  app.id = rootId;
  document.body.appendChild(app);

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("assets/main.js");
  script.type = "module";
  document.body.appendChild(script);
}
