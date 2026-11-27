import { getSettings, saveSettings } from "../shared/storage";
import { THEMES } from "../content/themes";
import { MSG_UPDATE_SETTINGS, type Settings, type ThemeId } from "../shared/types";

let current: Settings;

async function pushToTab(settings: Settings): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id && tab.url && /(x|twitter)\.com/.test(tab.url)) {
    chrome.tabs.sendMessage(tab.id, { type: MSG_UPDATE_SETTINGS, settings }).catch(() => {
      // content script not ready (e.g. page reloaded) — storage listener covers it
    });
  }
}

async function update(patch: Partial<Settings>): Promise<void> {
  current = { ...current, ...patch };
  await saveSettings(current);
  await pushToTab(current);
}

function renderThemes(): void {
  const grid = document.getElementById("themes")!;
  grid.innerHTML = "";
  for (const theme of THEMES) {
    const btn = document.createElement("button");
    btn.className = "theme-swatch" + (current.theme === theme.id ? " active" : "");
    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.style.background = theme.vars["--xext-bg"] ?? "#000";
    swatch.style.color = theme.vars["--xext-text"];
    const label = document.createElement("span");
    label.textContent = theme.label;
    btn.append(swatch, label);
    btn.addEventListener("click", () => {
      void update({ theme: theme.id as ThemeId });
      grid.querySelectorAll(".theme-swatch").forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");
    });
    grid.appendChild(btn);
  }
}

document.getElementById("open-library")!.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

function init(): void {
  renderThemes();
  document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-key]').forEach((cb) => {
    cb.checked = current[cb.dataset.key as keyof Settings] as boolean;
    cb.addEventListener("change", () => {
      void update({ [cb.dataset.key!]: cb.checked });
    });
  });
}

void getSettings().then((s) => {
  current = s;
  init();
});
