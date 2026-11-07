export function hasAdminRole(roles: { role: string }[] | null): boolean {
  return roles?.some(({ role }) => role === 'admin') ?? false
}