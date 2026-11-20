/** A browser trigger requires the owning user; payment hooks are already server-verified. */
export function canSendOrderDocuments(requesterId: string | undefined, orderUserId: string | null, browserTrigger: boolean) {
  return !browserTrigger || Boolean(requesterId && orderUserId && requesterId === orderUserId);
}
