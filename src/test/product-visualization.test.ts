import { describe, expect, it } from 'vitest'
import { RequestSchema, validImage, hasAdminRole, canRevise } from '../../supabase/functions/product-visualization/validation'
import { visualizationComposition } from '../../supabase/functions/product-visualization/composition'
describe('private client product visualizations', () => {
  it('does not force products and surrounding design into a square canvas', () => {
    expect(visualizationComposition.size).toBe('auto')
  })
  const request = { id: '671c09d4-03f3-44f0-9fd0-49fb33d6e640', sessionToken: '671c09d4-03f3-44f0-9fd0-49fb33d6e641', productId: '671c09d4-03f3-44f0-9fd0-49fb33d6e642', customerName: 'Test Client', customerEmail: 'client@example.com', idea: 'Logo on the chocolate', lang: 'lv' }
  it('requires the client name for administrator identification', () => { expect(RequestSchema.safeParse({ ...request, customerName: '' }).success).toBe(false); expect(RequestSchema.safeParse(request).success).toBe(true) })
  it('requires a valid client email', () => { expect(RequestSchema.safeParse({ ...request, customerEmail: '' }).success).toBe(false) })
  it('keeps the client idea with the product', () => { const parsed = RequestSchema.parse(request); expect(parsed.idea).toBe('Logo on the chocolate'); expect(parsed.productId).toBe(request.productId) })
  it('rejects executable and oversized logo files', () => { expect(validImage({ type: 'image/svg+xml', size: 100 })).toBe(false); expect(validImage({ type: 'image/png', size: 5 * 1024 * 1024 + 1 })).toBe(false); expect(validImage({ type: 'image/png', size: 100 })).toBe(true) })
  it('allows only protected administrators to read all client designs', () => { expect(hasAdminRole([{ role: 'customer' }])).toBe(false); expect(hasAdminRole([{ role: 'admin' }])).toBe(true) })
  it('accepts successive instructions for a selected previous version', () => {
    const parsed = RequestSchema.parse({ ...request, parentId: request.id, idea: 'Change the box to red. Remove the logo. Add a gold ribbon.' })
    expect(parsed.parentId).toBe(request.id)
    expect(parsed.idea).toBe('Change the box to red. Remove the logo. Add a gold ribbon.')
  })
  it('only revises completed images belonging to the same visitor and product', () => {
    const parent = { session_token: request.sessionToken, product_id: request.productId, status: 'completed', image_path: 'private/image.png' }
    expect(canRevise(parent, request.sessionToken, request.productId)).toBe(true)
    expect(canRevise(parent, request.id, request.productId)).toBe(false)
    expect(canRevise(parent, request.sessionToken, request.id)).toBe(false)
    expect(canRevise({ ...parent, status: 'pending' }, request.sessionToken, request.productId)).toBe(false)
    expect(canRevise(null, request.sessionToken, request.productId)).toBe(false)
  })
})