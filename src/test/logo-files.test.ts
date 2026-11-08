import { describe, expect, it } from 'vitest'
import { validLogoFile, referenceGrid } from '../lib/logoFiles'

describe('visualization logo uploads', () => {
  it('allocates a reference tile for every file without a count cap', () => {
    for (const count of [1, 2, 10, 100, 1000, 10000]) {
      const grid = referenceGrid(count)
      expect(grid.columns * grid.rows).toBeGreaterThanOrEqual(count)
      expect(grid.rows).toBe(Math.ceil(count / grid.columns))
    }
  })
  it.each(['svg', 'pdf', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'avif', 'tif', 'tiff', 'ico'])('accepts %s logo files', extension => {
    expect(validLogoFile({ name: `logo.${extension}`, size: 100 })).toBe(true)
  })
  it('accepts uppercase SVG extension without a MIME type', () => {
    expect(validLogoFile({ name: 'Logo.SVG', size: 100 })).toBe(true)
  })
  it('rejects unsupported and executable files', () => {
    for (const name of ['logo.exe', 'logo.svg.exe', 'logo.html', 'logo.ai', 'logo.eps']) expect(validLogoFile({ name, size: 100 })).toBe(false)
  })
  it('accepts logos without a file-size cap', () => {
    expect(validLogoFile({ name: 'logo.svg', size: 5 * 1024 * 1024 })).toBe(true)
    expect(validLogoFile({ name: 'logo.svg', size: 5 * 1024 * 1024 + 1 })).toBe(true)
    expect(validLogoFile({ name: 'logo.pdf', size: 1024 * 1024 * 1024 })).toBe(true)
  })
  it('rejects empty logo files', () => {
    expect(validLogoFile({ name: 'logo.svg', size: 0 })).toBe(false)
  })
})