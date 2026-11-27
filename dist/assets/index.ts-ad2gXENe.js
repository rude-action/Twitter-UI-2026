import{b as w,t as C}from"./themes-CG8wGZnk.js";import{g as L,s as T,a as f,M as E}from"./storage-DhCMBcHk.js";function A(t){let n="";return t.collapseNav&&(n+=`
/* Collapse left navigation to icons only */
header[role="banner"] nav a span,
header[role="banner"] nav a div:last-child {
  display: none !important;
}
header[role="banner"] {
  width: auto !important;
}
header[role="banner"] nav a {
  padding: 12px 16px !important;
}
`),t.hideSidebar&&(n+=`
/* Hide right sidebar, widen main column */
[data-testid="sidebarColumn"] {
  display: none !important;
}
`),t.centerFeed&&(n+=`
/* Center the timeline and widen it */
[data-testid="primaryColumn"] {
  margin-inline: auto !important;
  max-width: 900px !important;
  border-inline-width: 0 !important;
}
`),t.compactDensity&&(n+=`
/* Compact density: tighten vertical spacing in the feed */
[data-testid="cellInnerDiv"] {
  padding-block: 4px !important;
}
article div[data-testid="tweetText"] {
  margin-bottom: 2px !important;
}
`),t.hidePromoted&&(n+=`
/* Hide promoted posts */
[data-testid="placementTracking"] {
  display: none !important;
}
`),n}const r="xext-save-btn";function v(t){var m,p,h;const n=t.querySelector('article a[href*="/status/"] time, article time'),e=t.querySelector('a[href*="/status/"]')??t.closest("a[href*='/status/']");let i="";e instanceof HTMLAnchorElement&&(i=new URL(e.getAttribute("href"),location.origin).toString());const o=t.querySelector('[data-testid="User-Name"]'),a=((m=o==null?void 0:o.querySelector("span"))==null?void 0:m.textContent)??"",s=(p=o==null?void 0:o.textContent)==null?void 0:p.match(/@[A-Za-z0-9_]+/),g=s?s[0].slice(1):"",u=t.querySelector("img[src*='twimg.com/profile_images']"),S=u instanceof HTMLImageElement?u.src:void 0;return{id:i||null,text:((h=t.querySelector('[data-testid="tweetText"]'))==null?void 0:h.textContent)??"",authorName:a,authorHandle:g,avatarUrl:S,postUrl:i,postedAt:(n==null?void 0:n.getAttribute("datetime"))??void 0}}function M(){const t=document.createElement("button");return t.className=r,t.type="button",t.title="Save to X Ext library",t.innerHTML=`
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
</svg>`,t}function q(t){const n=t.querySelector('[role="group"][aria-label]');if(!n||n.querySelector(`.${r}`))return;const e=v(t);if(!(e!=null&&e.id)||!e.text)return;const i=M();i.addEventListener("click",async o=>{o.stopPropagation(),o.preventDefault();const a=v(t)??e,s={id:a.id,text:a.text,authorName:a.authorName,authorHandle:a.authorHandle,avatarUrl:a.avatarUrl,postUrl:a.postUrl,postedAt:a.postedAt,note:"",tags:[],savedAt:Date.now()};await T(s),i.classList.add("xext-saved"),i.title="Saved!"}),n.appendChild(i)}async function c(){const t=await L(),n=new Set(t.map(e=>e.id));document.querySelectorAll("article").forEach(e=>{var a;if(!(e instanceof HTMLElement))return;q(e);const i=((a=e.querySelector('a[href*="/status/"]'))==null?void 0:a.getAttribute("href"))??"",o=e.querySelector(`.${r}`);o&&i&&n.has(i)&&o.classList.add("xext-saved")})}if(!document.getElementById("xext-save-btn-style")){const t=document.createElement("style");t.id="xext-save-btn-style",t.textContent=`
.${r} {
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
.${r}:hover {
  background-color: rgba(29, 155, 240, 0.1);
  color: #1d9bf0;
}
.${r}.xext-saved {
  color: #1d9bf0;
}
.${r}.xext-saved svg {
  fill: #1d9bf0;
}
`,document.documentElement.appendChild(t)}const I="xext-theme",U="xext-layout";function b(t,n){let e=document.getElementById(t);if(!n){e==null||e.remove();return}e||(e=document.createElement("style"),e.id=t,document.documentElement.appendChild(e)),e.textContent=n}function d(t){b(I,w(C(t.theme))),b(U,A(t))}let l=null,x;function y(){l||(l=new MutationObserver(()=>{window.clearTimeout(x),x=window.setTimeout(()=>{c()},300)}),l.observe(document.body,{childList:!0,subtree:!0}))}async function k(){d(await f()),document.addEventListener("DOMContentLoaded",async()=>{d(await f())}),chrome.runtime.onMessage.addListener(t=>{(t==null?void 0:t.type)===E&&t.settings&&d(t.settings)}),chrome.storage.onChanged.addListener((t,n)=>{n==="sync"&&t.settings&&d({...t.settings.newValue})}),document.body?(y(),c()):document.addEventListener("DOMContentLoaded",()=>{y(),c()})}k();export{d as applySettings};
