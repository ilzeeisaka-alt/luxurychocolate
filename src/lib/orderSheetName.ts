/** Renders names typed in ALL CAPS as normal words, leaving already mixed-case text untouched. */
export function normalCase(value: string | null | undefined) {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  if (!text || text !== text.toUpperCase()) return text;
  return text
    .toLocaleLowerCase("lv")
    .replace(/(^|\s)(\S)/g, (_match, space: string, char: string) => space + char.toLocaleUpperCase("lv"));
}
