export type ThemeId = "default" | "paper" | "midnight" | "sakura" | "lagoon" | "dusk";

export interface Settings {
  theme: ThemeId;
  collapseNav: boolean;
  hideSidebar: boolean;
  centerFeed: boolean;
  compactDensity: boolean;
  hidePromoted: boolean;
}

export interface SavedPost {
  id: string;
  text: string;
  authorName: string;
  authorHandle: string;
  avatarUrl?: string;
  postUrl: string;
  postedAt?: string;
  note: string;
  tags: string[];
  savedAt: number;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: "default",
  collapseNav: false,
  hideSidebar: false,
  centerFeed: false,
  compactDensity: false,
  hidePromoted: true
};

export type SettingsUpdate = Partial<Settings>;

export const MSG_UPDATE_SETTINGS = "xext:update-settings";
