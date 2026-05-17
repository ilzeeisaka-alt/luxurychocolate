// Lightweight per-user notification history stored in localStorage.
// Tracks which tracking numbers we have already shown a toast for, plus a
// timestamp + order_number so we can render a history view in the account.

export interface NotificationEntry {
  tracking: string;
  orderNumber: string;
  seenAt: string; // ISO
}

const KEY_PREFIX = "seen-tracking-"; // legacy + new key (per user)

export const getNotificationKey = (userId: string) => `${KEY_PREFIX}${userId}`;

export const loadNotifications = (userId: string): NotificationEntry[] => {
  try {
    const raw = localStorage.getItem(getNotificationKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Backwards-compat: previous format was a flat string[] of tracking nrs.
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "string") {
      return (parsed as string[]).map((t) => ({
        tracking: t,
        orderNumber: "",
        seenAt: "",
      }));
    }
    if (Array.isArray(parsed)) return parsed as NotificationEntry[];
    return [];
  } catch {
    return [];
  }
};

export const hasSeenTracking = (userId: string, tracking: string): boolean =>
  loadNotifications(userId).some((e) => e.tracking === tracking);

export const addNotification = (
  userId: string,
  entry: Omit<NotificationEntry, "seenAt"> & { seenAt?: string },
): NotificationEntry[] => {
  const list = loadNotifications(userId);
  if (list.some((e) => e.tracking === entry.tracking)) return list;
  const next: NotificationEntry[] = [
    { ...entry, seenAt: entry.seenAt || new Date().toISOString() },
    ...list,
  ];
  try {
    localStorage.setItem(getNotificationKey(userId), JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
  return next;
};

export const clearNotifications = (userId: string) => {
  try {
    localStorage.removeItem(getNotificationKey(userId));
  } catch {
    /* ignore */
  }
};

export const removeNotification = (userId: string, tracking: string) => {
  const next = loadNotifications(userId).filter((e) => e.tracking !== tracking);
  try {
    localStorage.setItem(getNotificationKey(userId), JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
};
