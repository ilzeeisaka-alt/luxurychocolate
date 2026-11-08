// Let the image model choose a canvas suited to the complete composition.
export const visualizationComposition = {
  size: 'auto',
  prompt: 'Choose a canvas orientation and aspect ratio that fits the requested composition, not a mandatory square. Do not constrain the product proportions to the preview window. Show the entire product, packaging, lid, separate cards and requested surrounding background with breathing room around all edges. Use a styled photographic setting around the product, not a tightly cropped isolated product or blank background, unless the customer requests it. Explicit customer framing, proportions and background instructions take priority.',
} as const