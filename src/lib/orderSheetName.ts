/** Renders names typed in ALL CAPS as normal words, leaving already mixed-case text untouched. */
export function normalCase(value: string | null | undefined) {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  if (!text || text !== text.toUpperCase()) return text;
  return text
    .toLocaleLowerCase("lv")
    .replace(/(^|\s)(\S)/g, (_match, space: string, char: string) => space + char.toLocaleUpperCase("lv"));
}

/**
 * Splits an order contact field into the person's name (first two words, shown in capitals)
 * and the job title typed after it (shown in normal letters).
 */
export function splitContactName(value: string | null | undefined) {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return { name: "", title: "" };
  const words = text.split(" ");
  return {
    name: words.slice(0, 2).join(" ").toLocaleUpperCase("lv"),
    title: normalCase(words.slice(2).join(" ")),
  };
}
