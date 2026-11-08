import { describe, expect, it } from 'vitest'
import { ProposalSchema } from '../../supabase/functions/product-price-proposal/validation'
describe('customer product price proposals', () => {
  const proposal = { id: '671c09d4-03f3-44f0-9fd0-49fb33d6e640', productId: '37f7dfab-48e2-4977-8653-eb228c63e4d3', customerName: 'Test Client', customerEmail: 'client@example.com', proposedPriceCents: 2000, quantity: 50, consent: true, lang: 'lv' }
  it('keeps the customer proposed unit price and order quantity', () => { const value = ProposalSchema.parse(proposal); expect(value.proposedPriceCents).toBe(2000); expect(value.quantity).toBe(50) })
  it('requires contact details so the administrator can reply', () => { expect(ProposalSchema.safeParse({ ...proposal, customerEmail: '' }).success).toBe(false); expect(ProposalSchema.safeParse({ ...proposal, customerName: '' }).success).toBe(false) })
  it('rejects nonpositive prices and fractional quantities', () => { expect(ProposalSchema.safeParse({ ...proposal, proposedPriceCents: 0 }).success).toBe(false); expect(ProposalSchema.safeParse({ ...proposal, quantity: 1.5 }).success).toBe(false) })
  it('requires consent before saving contact information', () => { expect(ProposalSchema.safeParse({ ...proposal, consent: false }).success).toBe(false) })
})