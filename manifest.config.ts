import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "X Ext — Themes & Library for X",
  version: "0.1.0",
  description: "Custom themes, layout tweaks and a local save-library for X (Twitter). All data stays in your browser.",
  permissions: ["storage"],
  host_permissions: ["*://x.com/*", "*://twitter.com/*"],
  content_scripts: [
    {
      matches: ["*://x.com/*", "*://twitter.com/*"],
      js: ["src/content/index.ts"],
      run_at: "document_start"
    }
  ],
  action: {
    default_popup: "src/popup/popup.html",
    default_title: "X Ext"
  },
  options_page: "src/pages/library.html"
});
