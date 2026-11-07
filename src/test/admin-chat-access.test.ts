import { describe, expect, it } from 'vitest'
import { hasAdminRole } from '../../supabase/functions/ai-chat/admin-access'

describe('private AI conversation access', () => {
  it('allows an administrator to read customer conversations', () => {
    expect(hasAdminRole([{ role: 'admin' }])).toBe(true)
  })
  it('denies customer accounts', () => {
    expect(hasAdminRole([{ role: 'customer' }])).toBe(false)
  })
  it('denies visitors without a verified role', () => {
    expect(hasAdminRole(null)).toBe(false)
    expect(hasAdminRole([])).toBe(false)
  })
})