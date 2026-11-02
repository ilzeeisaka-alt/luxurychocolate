// Legacy editorial links are aliases, never independent search pages.
export const seoAliases: Record<string, string> = {
  "/en/christmas-corporate-chocolates": "/en/christmas-corporate-chocolate",
  "/ru/reklamnyi-shokolad": "/ru/reklamniy-shokolad",
  "/ru/rozhdestvenskiy-korporativnyj-shokolad": "/ru/rozhdestvenskij-shokolad",
  "/et/joulushokolaad-ettevottele": "/et/joulu-sokolaad",
  "/sv/reklam-choklad": "/sv/reklamchoklad",
  "/no/julesjokolade-bedrifter": "/no/julesjokolade-bedrift",
  "/korporativo-davanu-celvedis": "/korporativo-davanu-celvedis-placeholder",
};

export function canonicalPath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return seoAliases[clean] ?? clean;
}