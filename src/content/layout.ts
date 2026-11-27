import type { Settings } from "../shared/types";

export function buildLayoutCss(s: Settings): string {
  let css = "";

  if (s.collapseNav) {
    css += `
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
`;
  }

  if (s.hideSidebar) {
    css += `
/* Hide right sidebar, widen main column */
[data-testid="sidebarColumn"] {
  display: none !important;
}
`;
  }

  if (s.centerFeed) {
    css += `
/* Center the timeline and widen it */
[data-testid="primaryColumn"] {
  margin-inline: auto !important;
  max-width: 900px !important;
  border-inline-width: 0 !important;
}
`;
  }

  if (s.compactDensity) {
    css += `
/* Compact density: tighten vertical spacing in the feed */
[data-testid="cellInnerDiv"] {
  padding-block: 4px !important;
}
article div[data-testid="tweetText"] {
  margin-bottom: 2px !important;
}
`;
  }

  if (s.hidePromoted) {
    css += `
/* Hide promoted posts */
[data-testid="placementTracking"] {
  display: none !important;
}
`;
  }

  return css;
}
