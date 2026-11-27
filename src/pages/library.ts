import { deleteSavedPost, getSavedPosts, updateSavedPost } from "../shared/storage";
import type { SavedPost } from "../shared/types";

const listEl = document.getElementById("list")!;
const searchEl = document.getElementById("search") as HTMLInputElement;

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function renderCard(post: SavedPost): HTMLElement {
  const card = document.createElement("article");
  card.className = "card";

  const head = document.createElement("div");
  head.className = "card-head";
  if (post.avatarUrl) {
    const img = document.createElement("img");
    img.src = post.avatarUrl;
    img.alt = post.authorName;
    head.appendChild(img);
  }
  const who = document.createElement("div");
  who.className = "who";
  who.innerHTML = `<div class="name">${escapeHtml(post.authorName)}</div>
<div class="handle">@${escapeHtml(post.authorHandle)}</div>`;
  head.appendChild(who);
  if (post.postedAt) {
    const t = document.createElement("time");
    t.dateTime = post.postedAt;
    t.textContent = new Date(post.postedAt).toLocaleString();
    head.appendChild(t);
  }
  card.appendChild(head);

  const text = document.createElement("div");
  text.className = "card-text";
  text.textContent = post.text;
  card.appendChild(text);

  const meta = document.createElement("div");
  meta.className = "card-meta";
  for (const tag of post.tags) {
    const b = document.createElement("button");
    b.className = "tag";
    b.textContent = `# ${tag}`;
    b.title = "クリックで削除";
    b.addEventListener("click", () => {
      void updateSavedPost(post.id, { tags: post.tags.filter((t2) => t2 !== tag) }).then(render);
    });
    meta.appendChild(b);
  }
  const addTag = document.createElement("button");
  addTag.className = "tag";
  addTag.textContent = "+ タグ";
  addTag.addEventListener("click", () => {
    const input = prompt("タグ名")?.trim();
    if (input && !post.tags.includes(input)) {
      void updateSavedPost(post.id, { tags: [...post.tags, input] }).then(render);
    }
  });
  meta.appendChild(addTag);
  card.appendChild(meta);

  const note = document.createElement("textarea");
  note.className = "note";
  note.placeholder = "ノートを追加…";
  note.value = post.note;
  note.addEventListener("change", () => {
    void updateSavedPost(post.id, { note: note.value });
  });
  card.appendChild(note);

  const actions = document.createElement("div");
  actions.className = "card-actions";
  if (post.postUrl) {
    const link = document.createElement("a");
    link.href = post.postUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "Xで開く";
    actions.appendChild(link);
  }
  const del = document.createElement("button");
  del.className = "danger";
  del.textContent = "削除";
  del.addEventListener("click", () => {
    void deleteSavedPost(post.id).then(render);
  });
  actions.appendChild(del);
  card.appendChild(actions);

  return card;
}

function render(): void {
  void getSavedPosts().then((posts) => {
    const q = searchEl.value.trim().toLowerCase();
    const filtered = q
      ? posts.filter(
          (p) =>
            p.text.toLowerCase().includes(q) ||
            p.authorName.toLowerCase().includes(q) ||
            p.authorHandle.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
        )
      : posts;

    listEl.innerHTML = "";
    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = posts.length === 0 ? "保存した投稿はまだありません。" : "一致する投稿がありません。";
      listEl.appendChild(empty);
      return;
    }
    for (const post of filtered) listEl.appendChild(renderCard(post));
  });
}

searchEl.addEventListener("input", render);
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.savedPosts) render();
});
render();
