import { z } from 'zod'

export const ProposalSchema = z.object({
  id: z.string().uuid(), productId: z.string().uuid(),
  customerName: z.string().trim().min(2).max(120),
  customerEmail: z.string().trim().email().max(254).transform(v => v.toLowerCase()),
  proposedPriceCents: z.number().int().min(1).max(100000000),
  quantity: z.number().int().min(1).max(1000000),
  message: z.string().trim().max(2000).default(''),
  lang: z.string().min(2).max(5).default('lv'),
  consent: z.literal(true),
})