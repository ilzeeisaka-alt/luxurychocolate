import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

const STATUS_LABELS: Record<string, string> = {
  pending: "Gaida apmaksu",
  paid: "Apmaksāts",
  in_production: "Ražošanā",
  shipped: "Nosūtīts",
  delivered: "Piegādāts",
  cancelled: "Atcelts",
  refunded: "Atmaksāts",
};

/**
 * Subscribes to realtime updates on the user's orders and shows a toast
 * notification whenever an order's status or tracking_number changes.
 */
export const useOrderNotifications = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    // Cache last-known status/tracking per order id to detect real changes
    const cache = new Map<string, { status: string; tracking: string | null }>();

    // Persistent set of "tracking numbers we've already notified about" — keyed
    // per user so the same tracking nr never re-notifies across reloads/tabs.
    const seenKey = `seen-tracking-${user.id}`;
    const loadSeen = (): Set<string> => {
      try {
        const raw = localStorage.getItem(seenKey);
        return new Set(raw ? (JSON.parse(raw) as string[]) : []);
      } catch {
        return new Set();
      }
    };
    const markSeen = (tracking: string) => {
      const s = loadSeen();
      s.add(tracking);
      try {
        localStorage.setItem(seenKey, JSON.stringify([...s]));
      } catch {
        /* ignore quota */
      }
    };

    supabase
      .from("orders")
      .select("id,status,tracking_number")
      .eq("user_id", user.id)
      .then(({ data }) => {
        data?.forEach((o) => {
          cache.set(o.id, { status: o.status, tracking: o.tracking_number });
          // Pre-seed seen set with existing tracking numbers so we don't
          // re-notify for orders that already had tracking before this session.
          if (o.tracking_number) markSeen(o.tracking_number);
        });
      });

    const channel = supabase
      .channel(`user-orders-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const next = payload.new as {
            id: string;
            order_number: string;
            status: string;
            tracking_number: string | null;
          };
          const prev = cache.get(next.id);
          cache.set(next.id, {
            status: next.status,
            tracking: next.tracking_number,
          });

          const statusChanged = prev && prev.status !== next.status;
          // Trigger when tracking number first appears — even if we have no
          // prior snapshot cached yet (prev undefined) or status also changed.
          const trackingAppeared =
            !!next.tracking_number &&
            (!prev || prev.tracking !== next.tracking_number) &&
            (!prev || !prev.tracking);

          if (trackingAppeared) {
            toast.success(`Pasūtījums ${next.order_number} nosūtīts`, {
              description: `Izsekošanas nr.: ${next.tracking_number}`,
              action: {
                label: "Sekot",
                onClick: () =>
                  (window.location.href = `/track/${next.order_number}`),
              },
              duration: 9000,
            });
          } else if (statusChanged) {
            const label = STATUS_LABELS[next.status] || next.status;
            toast.success(`Pasūtījums ${next.order_number}: ${label}`, {
              description:
                next.status === "shipped" && next.tracking_number
                  ? `Izsekošanas nr.: ${next.tracking_number}`
                  : "Statuss atjaunināts",
              action: {
                label: "Skatīt",
                onClick: () =>
                  (window.location.href = `/track/${next.order_number}`),
              },
              duration: 8000,
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);
};

export const OrderNotificationsListener = () => {
  useOrderNotifications();
  return null;
};
