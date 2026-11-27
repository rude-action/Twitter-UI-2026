import { DEFAULT_SETTINGS, type SavedPost, type Settings } from "./types";

const SETTINGS_KEY = "settings";
const LIBRARY_KEY = "savedPosts";

export async function getSettings(): Promise<Settings> {
  const stored = await chrome.storage.sync.get(SETTINGS_KEY);
  return { ...DEFAULT_SETTINGS, ...(stored[SETTINGS_KEY] ?? {}) };
}

export async function saveSettings(settings: Settings): Promise<void> {
  await chrome.storage.sync.set({ [SETTINGS_KEY]: settings });
}

export async function getSavedPosts(): Promise<SavedPost[]> {
  const stored = await chrome.storage.local.get(LIBRARY_KEY);
  return (stored[LIBRARY_KEY] ?? []) as SavedPost[];
}

export async function savePost(post: SavedPost): Promise<void> {
  const posts = await getSavedPosts();
  if (!posts.some((p) => p.id === post.id)) {
    await chrome.storage.local.set({ [LIBRARY_KEY]: [post, ...posts] });
  }
}

export async function updateSavedPost(id: string, patch: Partial<SavedPost>): Promise<void> {
  const posts = await getSavedPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx !== -1) {
    posts[idx] = { ...posts[idx], ...patch };
    await chrome.storage.local.set({ [LIBRARY_KEY]: posts });
  }
}

export async function deleteSavedPost(id: string): Promise<void> {
  const posts = await getSavedPosts();
  await chrome.storage.local.set({ [LIBRARY_KEY]: posts.filter((p) => p.id !== id) });
}
