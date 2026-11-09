import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// After a new deploy, browsers with a cached page can fail to load old
// lazy-loaded chunks ("Importing a module script failed" /
// "Failed to fetch dynamically imported module"). Reload once to recover.
const CHUNK_RELOAD_KEY = "chunk-load-reload-at";

function isChunkLoadError(message: string): boolean {
  return (
    message.includes("Importing a module script failed") ||
    message.includes("Failed to fetch dynamically imported module") ||
    message.includes("error loading dynamically imported module") ||
    message.includes("Loading chunk") ||
    message.includes("Loading CSS chunk")
  );
}

function recoverFromChunkError(message: string): void {
  if (!isChunkLoadError(message)) return;
  const last = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0);
  if (Date.now() - last < 60_000) return; // avoid reload loops
  sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
  window.location.reload();
}

window.addEventListener("error", (event) => {
  recoverFromChunkError(event.message || "");
});

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const message =
    typeof reason === "string" ? reason : reason?.message || String(reason);
  recoverFromChunkError(message);
});

createRoot(document.getElementById("root")!).render(<App />);
