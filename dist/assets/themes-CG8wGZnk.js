const d=[{id:"default",label:"Default (X)",dark:!0,vars:{}},{id:"paper",label:"Paper",dark:!1,vars:{"--xext-bg":"#f8f5ef","--xext-bg-elevated":"#ffffff","--xext-text":"#2f2a24","--xext-text-secondary":"#6b635a","--xext-border":"#e6e0d6","--xext-accent":"#8a6d3b","--xext-hover":"rgba(0,0,0,0.03)"}},{id:"midnight",label:"Midnight",dark:!0,vars:{"--xext-bg":"#000000","--xext-bg-elevated":"#0a0a0a","--xext-text":"#e7e9ea","--xext-text-secondary":"#71767b","--xext-border":"#1e1f20","--xext-accent":"#1d9bf0","--xext-hover":"rgba(255,255,255,0.03)"}},{id:"sakura",label:"Sakura",dark:!1,vars:{"--xext-bg":"#fdf2f4","--xext-bg-elevated":"#ffffff","--xext-text":"#43333a","--xext-text-secondary":"#8a7078","--xext-border":"#f0dbe0","--xext-accent":"#e0577f","--xext-hover":"rgba(0,0,0,0.03)"}},{id:"lagoon",label:"Lagoon",dark:!0,vars:{"--xext-bg":"#0b1e26","--xext-bg-elevated":"#102a34","--xext-text":"#dceaf0","--xext-text-secondary":"#7d9aa6","--xext-border":"#1c3742","--xext-accent":"#35c4c8","--xext-hover":"rgba(255,255,255,0.04)"}},{id:"dusk",label:"Dusk",dark:!0,vars:{"--xext-bg":"#1b1a2b","--xext-bg-elevated":"#242238","--xext-text":"#e4e1f0","--xext-text-secondary":"#8d88a8","--xext-border":"#302d4a","--xext-accent":"#9d7bea","--xext-hover":"rgba(255,255,255,0.04)"}}];function o(t){return d.find(e=>e.id===t)??d[0]}function x(t){if(t.id==="default")return"";const e=(a,r)=>`var(${a}, ${r})`;return`
:root {
  color-scheme: ${t.dark?"dark":"light"};
${Object.entries(t.vars).map(([a,r])=>`  ${a}: ${r};`).join(`
`)}
}

/* ---- main surfaces ---- */
html, body {
  background-color: ${e("--xext-bg","#fff")} !important;
}
[data-testid="primaryColumn"],
header[role="banner"],
[data-testid="sidebarColumn"],
[role="dialog"],
[data-testid="Dropdown"],
[data-testid="sheetDialog"],
main menu[role="menu"] {
  background-color: ${e("--xext-bg","#fff")} !important;
}
[data-testid="primaryColumn"] section,
[data-testid="primaryColumn"] div,
[data-testid="cellInnerDiv"] {
  background-color: transparent;
}
[data-testid="tweetButtonInline"],
[data-testid="tweetButton"],
[data-testid=" SideNav_AccountSwitcher_Button"] {
  background-color: ${e("--xext-accent","#1d9bf0")} !important;
}

/* ---- text colors ---- */
[data-testid="tweetText"],
[data-testid="User-Name"],
[data-testid="UserName"],
div[lang] {
  color: ${e("--xext-text","#000")} !important;
}
[data-testid="User-Name"] span,
[data-testid="User-Name"] div,
[data-testid="app-text-transition"],
[data-testid="tweetText"] a,
a[href^="/"][role="link"] span,
time,
[role="tab"] span,
h2[role="heading"] span,
#react-root span {
  color: ${e("--xext-text","#000")};
}

/* ---- borders ---- */
[data-testid="primaryColumn"],
[role="separator"],
[data-testid="placementTracking"],
article {
  border-color: ${e("--xext-border","#eff3f4")} !important;
}
[role="tablist"] {
  border-bottom-color: ${e("--xext-border","#eff3f4")} !important;
}

/* ---- hover / buttons ---- */
[data-testid="cellInnerDiv"]:hover,
[role="link"]:hover,
[role="tab"]:hover {
  background-color: ${e("--xext-hover","transparent")};
}

/* ---- scrollbars ---- */
* {
  scrollbar-color: ${e("--xext-border","#999")} transparent;
}
`}export{d as T,x as b,o as t};
