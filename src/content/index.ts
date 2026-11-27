import { buildThemeCss, themeById } from "./themes";
import { buildLayoutCss } from "./layout";
import { getSettings } from "../shared/storage";
import { MSG_UPDATE_SETTINGS, type Settings } from "../shared/types";
import { injectSaveButtons } from "./library";

const THEME_STYLE_ID = "xext-theme";
const LAYOUT_STYLE_ID = "xext-layout";

function setStyle(id: string, css: string): void {
  let el = document.getElementById(id);
  if (!css) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("style");
    el.id = id;
    document.documentElement.appendChild(el);
  }
  el.textContent = css;
}

export function applySettings(s: Settings): void {
  setStyle(THEME_STYLE_ID, buildThemeCss(themeById(s.theme)));
  setStyle(LAYOUT_STYLE_ID, buildLayoutCss(s));
}

let observer: MutationObserver | null = null;
let debounceTimer: number | undefined;

function startObserver(): void {
  if (observer) return;
  observer = new MutationObserver(() => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      void injectSaveButtons();
    }, 300);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

async function main(): Promise<void> {
  applySettings(await getSettings());

  // The style element injected at document_start survives SPA navigation,
  // but X may wipe <head>/<body> on full reloads; re-apply defensively.
  document.addEventListener("DOMContentLoaded", async () => {
    applySettings(await getSettings());
  });

  chrome.runtime.onMessage.addListener((msg: { type?: string; settings?: Settings }) => {
    if (msg?.type === MSG_UPDATE_SETTINGS && msg.settings) {
      applySettings(msg.settings);
    }
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.settings) {
      applySettings({ ...(changes.settings.newValue as Settings) });
    }
  });

  if (document.body) {
    startObserver();
    void injectSaveButtons();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      startObserver();
      void injectSaveButtons();
    });
  }
}

void main();
