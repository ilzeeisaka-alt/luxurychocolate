import DOMPurify from 'dompurify'
import { validImage } from '../../supabase/functions/product-visualization/validation'

export const logoAccept = '.svg,.pdf,.png,.jpg,.jpeg,.webp,.gif,.bmp,.avif,.tif,.tiff,.ico'
const extensions = new Set(logoAccept.split(',').map(value => value.slice(1)))
export function validLogoFile(file: { name: string; size: number }) {
  return file.size > 0 && extensions.has(file.name.split('.').pop()?.toLowerCase() ?? '')
}
export function referenceGrid(count: number) {
  const columns = Math.max(1, Math.ceil(Math.sqrt(count)))
  return { columns, rows: Math.max(1, Math.ceil(count / columns)) }
}
export async function combineDesignFiles(files: File[]): Promise<File> {
  if (!files.length) throw new Error('No references')
  if (files.length === 1 && files[0]) return files[0]
  const { columns, rows } = referenceGrid(files.length)
  const canvas = document.createElement('canvas'); canvas.width = 2048; canvas.height = 2048
  const context = canvas.getContext('2d'); if (!context) throw new Error('Canvas unavailable')
  const cellWidth = canvas.width / columns; const cellHeight = canvas.height / rows
  for (const [index, file] of files.entries()) {
    const url = URL.createObjectURL(file)
    try {
      const image = new Image(); image.src = url; await image.decode()
      const scale = Math.min((cellWidth - 8) / image.naturalWidth, (cellHeight - 8) / image.naturalHeight)
      const width = Math.max(1, image.naturalWidth * Math.max(0.001, scale)); const height = Math.max(1, image.naturalHeight * Math.max(0.001, scale))
      context.drawImage(image, (index % columns) * cellWidth + (cellWidth - width) / 2, Math.floor(index / columns) * cellHeight + (cellHeight - height) / 2, width, height)
    } finally { URL.revokeObjectURL(url) }
  }
  return pngFile(canvas, 'design-references.png')
}
function canvasFor(width: number, height: number) {
  if (!Number.isFinite(width * height) || width <= 0 || height <= 0 || width * height > 40_000_000) throw new Error('Invalid image dimensions')
  const scale = Math.min(1, 2048 / Math.max(width, height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width * scale)); canvas.height = Math.max(1, Math.round(height * scale))
  return canvas
}
async function pngFile(canvas: HTMLCanvasElement, name: string) {
  let output = canvas
  while (true) {
    const blob = await new Promise<Blob>((resolve, reject) => output.toBlob(value => value ? resolve(value) : reject(new Error('Conversion failed')), 'image/png'))
    const result = new File([blob], `${name.replace(/\.[^.]+$/, '')}.png`, { type: 'image/png' })
    if (validImage(result)) return result
    if (output.width <= 1 && output.height <= 1) throw new Error('Conversion failed')
    const smaller = document.createElement('canvas')
    smaller.width = Math.max(1, Math.floor(output.width * 0.75)); smaller.height = Math.max(1, Math.floor(output.height * 0.75))
    const context = smaller.getContext('2d'); if (!context) throw new Error('Canvas unavailable')
    context.drawImage(output, 0, 0, smaller.width, smaller.height)
    output = smaller
  }
}
// Only a rasterized PNG leaves the browser; SVG is never inserted into the page.
export async function prepareLogo(file: File): Promise<File> {
  if (!validLogoFile(file)) throw new Error('Unsupported logo file')
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (extension === 'pdf') {
    const pdfjs = await import('pdfjs-dist')
    const { default: worker } = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
    pdfjs.GlobalWorkerOptions.workerSrc = worker
    const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) })
    const pdf = await task.promise
    try {
      const page = await pdf.getPage(1)
      const original = page.getViewport({ scale: 1 })
      const viewport = page.getViewport({ scale: Math.min(2, 2048 / Math.max(original.width, original.height)) })
      const canvas = canvasFor(viewport.width, viewport.height)
      await page.render({ canvas, viewport }).promise
      return await pngFile(canvas, file.name)
    } finally { await task.destroy() }
  }
  if (extension === 'tif' || extension === 'tiff') {
    const UTIF = await import('utif')
    const bytes = await file.arrayBuffer(); const frame = UTIF.decode(bytes)[0]
    if (!frame) throw new Error('Invalid TIFF')
    const width = Number(Array.isArray(frame.t256) ? frame.t256[0] : frame.t256)
    const height = Number(Array.isArray(frame.t257) ? frame.t257[0] : frame.t257)
    canvasFor(width, height) // Bound decoding before allocating the pixel buffer.
    UTIF.decodeImage(bytes, frame)
    const source = document.createElement('canvas'); source.width = width; source.height = height
    const context = source.getContext('2d'); if (!context) throw new Error('Canvas unavailable')
    const pixels = context.createImageData(width, height); pixels.data.set(UTIF.toRGBA8(frame)); context.putImageData(pixels, 0, 0)
    const canvas = canvasFor(width, height); const output = canvas.getContext('2d')
    if (!output) throw new Error('Canvas unavailable')
    output.drawImage(source, 0, 0, canvas.width, canvas.height)
    return pngFile(canvas, file.name)
  }
  let blob: Blob = file
  if (extension === 'svg') {
    const clean = DOMPurify.sanitize(await file.text(), { USE_PROFILES: { svg: true, svgFilters: true }, FORBID_TAGS: ['foreignObject', 'image', 'style', 'script', 'animate', 'set'], FORBID_ATTR: ['href', 'xlink:href'] })
    const document = new DOMParser().parseFromString(clean, 'image/svg+xml')
    if (document.querySelector('parsererror') || document.documentElement.localName !== 'svg') throw new Error('Invalid SVG')
    blob = new Blob([new XMLSerializer().serializeToString(document.documentElement)], { type: 'image/svg+xml' })
  }
  const url = URL.createObjectURL(blob)
  try {
    const image = new Image(); image.src = url; await image.decode()
    const canvas = canvasFor(image.naturalWidth, image.naturalHeight); const context = canvas.getContext('2d')
    if (!context) throw new Error('Canvas unavailable')
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    return await pngFile(canvas, file.name)
  } finally { URL.revokeObjectURL(url) }
}