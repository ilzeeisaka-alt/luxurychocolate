import { describe, expect, it } from 'vitest'
import { RequestSchema, validImage, hasAdminRole } from '../../supabase/functions/product-visualization/validation'
describe('private client product visualizations', () => {
  const request = { id: '671c09d4-03f3-44f0-9fd0-49fb33d6e640', sessionToken: '671c09d4-03f3-44f0-9fd0-49fb33d6e641', productId: '671c09d4-03f3-44f0-9fd0-49fb33d6e642', customerName: 'Test Client', customerEmail: 'client@example.com', idea: 'Logo on the chocolate', lang: 'lv' }
  it('requires the client name for administrator identification', () => { expect(RequestSchema.safeParse({ ...request, customerName: '' }).success).toBe(false); expect(RequestSchema.safeParse(request).success).toBe(true) })
  it('requires a valid client email', () => { expect(RequestSchema.safeParse({ ...request, customerEmail: '' }).success).toBe(false) })
  it('keeps the client idea with the product', () => { const parsed = RequestSchema.parse(request); expect(parsed.idea).toBe('Logo on the chocolate'); expect(parsed.productId).toBe(request.productId) })
  it('rejects executable and oversized logo files', () => { expect(validImage({ type: 'image/svg+xml', size: 100 })).toBe(false); expect(validImage({ type: 'image/png', size: 5 * 1024 * 1024 + 1 })).toBe(false); expect(validImage({ type: 'image/png', size: 100 })).toBe(true) })
  it('allows only protected administrators to read all client designs', () => { expect(hasAdminRole([{ role: 'customer' }])).toBe(false); expect(hasAdminRole([{ role: 'admin' }])).toBe(true) })
})