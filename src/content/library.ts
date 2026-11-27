import { getSavedPosts, savePost } from "../shared/storage";
import type { SavedPost } from "../shared/types";

const SAVE_BUTTON_CLASS = "xext-save-btn";

interface ExtractedPost {
  id: string | null;
  text: string;
  authorName: string;
  authorHandle: string;
  avatarUrl?: string;
  postUrl: string;
  postedAt?: string;
}

function extractPost(article: HTMLElement): ExtractedPost | null {
  const timeEl = article.querySelector("article a[href*=\"/status/\"] time, article time");
  const linkEl =
    article.querySelector('a[href*="/status/"]') ?? article.closest("a[href*='/status/']");

  let postUrl = "";
  if (linkEl instanceof HTMLAnchorElement) {
    postUrl = new URL(linkEl.getAttribute("href")!, location.origin).toString();
  }

  const nameEl = article.querySelector('[data-testid="User-Name"]');
  const authorName = nameEl?.querySelector("span")?.textContent ?? "";
  const handleMatch = nameEl?.textContent?.match(/@[A-Za-z0-9_]+/);
  const authorHandle = handleMatch ? handleMatch[0].slice(1) : "";

  const avatarImg = article.querySelector("img[src*='twimg.com/profile_images']");
  const avatarUrl = avatarImg instanceof HTMLImageElement ? avatarImg.src : undefined;

  return {
    id: postUrl || null,
    text: article.querySelector('[data-testid="tweetText"]')?.textContent ?? "",
    authorName,
    authorHandle,
    avatarUrl,
    postUrl,
    postedAt: timeEl?.getAttribute("datetime") ?? undefined
  };
}

function buildSaveButton(): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.className = SAVE_BUTTON_CLASS;
  btn.type = "button";
  btn.title = "Save to X Ext library";
  btn.innerHTML = `
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
</svg>`;
  return btn;
}

function injectButtonInto(article: HTMLElement): void {
  const group = article.querySelector('[role="group"][aria-label]');
  if (!group || group.querySelector(`.${SAVE_BUTTON_CLASS}`)) return;

  const extracted = extractPost(article);
  if (!extracted?.id || !extracted.text) return;

  const btn = buildSaveButton();
  btn.addEventListener("click", async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const fresh = extractPost(article) ?? extracted;
    const post: SavedPost = {
      id: fresh.id!,
      text: fresh.text,
      authorName: fresh.authorName,
      authorHandle: fresh.authorHandle,
      avatarUrl: fresh.avatarUrl,
      postUrl: fresh.postUrl,
      postedAt: fresh.postedAt,
      note: "",
      tags: [],
      savedAt: Date.now()
    };
    await savePost(post);
    btn.classList.add("xext-saved");
    btn.title = "Saved!";
  });
  group.appendChild(btn);
}

export async function injectSaveButtons(): Promise<void> {
  // Mark buttons on already-saved posts
  const saved = await getSavedPosts();
  const savedIds = new Set(saved.map((p) => p.id));

  document.querySelectorAll("article").forEach((article) => {
    if (!(article instanceof HTMLElement)) return;
    injectButtonInto(article);
    const href =
      article.querySelector('a[href*="/status/"]')?.getAttribute("href") ?? "";
    const btn = article.querySelector(`.${SAVE_BUTTON_CLASS}`);
    if (btn && href && savedIds.has(href)) {
      btn.classList.add("xext-saved");
    }
  });
}

// Button styling (injected once)
if (!document.getElementById("xext-save-btn-style")) {
  const style = document.createElement("style");
  style.id = "xext-save-btn-style";
  style.textContent = `
.${SAVE_BUTTON_CLASS} {
  all: unset;
  cursor: pointer;
  color: #71767b;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  width: 34.75px;
  height: 34.75px;
  transition: background-color 0.15s;
}
.${SAVE_BUTTON_CLASS}:hover {
  background-color: rgba(29, 155, 240, 0.1);
  color: #1d9bf0;
}
.${SAVE_BUTTON_CLASS}.xext-saved {
  color: #1d9bf0;
}
.${SAVE_BUTTON_CLASS}.xext-saved svg {
  fill: #1d9bf0;
}
`;
  document.documentElement.appendChild(style);
}
