import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, ExternalLink, Trash2, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import {
  loadNotifications,
  clearNotifications,
  removeNotification,
  type NotificationEntry,
} from "@/lib/notificationHistory";

interface Props {
  userId: string;
}

const formatDate = (iso: string) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("lv-LV");
  } catch {
    return iso;
  }
};

const NotificationsHistory = ({ userId }: Props) => {
  const [items, setItems] = useState<NotificationEntry[]>([]);

  const refresh = () => setItems(loadNotifications(userId));

  useEffect(() => {
    refresh();
    // Refresh when storage changes in another tab.
    const onStorage = (e: StorageEvent) => {
      if (e.key === `seen-tracking-${userId}`) refresh();
    };
    window.addEventListener("storage", onStorage);
    // Light polling — toasts only update localStorage in this tab.
    const id = window.setInterval(refresh, 3000);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(id);
    };
  }, [userId]);

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Paziņojumu vēsture
            </CardTitle>
            <CardDescription>
              Izsekošanas numuri, par kuriem jau saņēmi paziņojumu šajā ierīcē.
            </CardDescription>
          </div>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearNotifications(userId);
                refresh();
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Notīrīt visu
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            Vēl nav neviena paziņojuma. Tiklīdz pasūtījumam tiks piešķirts
            izsekošanas numurs, tas parādīsies šeit.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {items.map((e) => (
              <li
                key={e.tracking}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Truck className="h-4 w-4 text-primary shrink-0" />
                    {e.orderNumber ? (
                      <Link
                        to={`/track/${e.orderNumber}`}
                        className="font-mono hover:text-primary hover:underline truncate"
                      >
                        {e.orderNumber}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground italic">
                        Nezināms pasūtījums
                      </span>
                    )}
                  </div>
                  <a
                    href={`https://www.venipak.com/tracking/?code=${encodeURIComponent(e.tracking)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary hover:underline mt-1"
                  >
                    {e.tracking}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Paziņots: {formatDate(e.seenAt)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    removeNotification(userId, e.tracking);
                    refresh();
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsHistory;
