import { z } from 'zod'

export const RequestSchema = z.object({
  id: z.string().uuid(), sessionToken: z.string().uuid(), productId: z.string().uuid(),
  customerName: z.string().trim().min(2).max(120),
  customerEmail: z.string().trim().email().max(254),
  idea: z.string().trim().min(3).max(2000), lang: z.string().min(2).max(5).default('lv'),
  parentId: z.string().uuid().optional(),
})
export const allowedImageTypes = ['image/png', 'image/jpeg', 'image/webp']
export function hasAdminRole(roles: { role: string }[] | null): boolean {
  return roles?.some(({ role }) => role === 'admin') ?? false
}
export function validImage(file: { size: number; type: string }) {
  return file.size > 0 && file.size <= 5 * 1024 * 1024 && allowedImageTypes.includes(file.type)
}
export function canRevise(parent: { session_token: string; product_id: string; status: string; image_path: string | null } | null, sessionToken: string, productId: string) {
  return Boolean(parent && parent.session_token === sessionToken && parent.product_id === productId && parent.status === 'completed' && parent.image_path)
}