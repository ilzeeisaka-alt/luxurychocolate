import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, ExternalLink, Trash2, Truck, Search, Calendar } from "lucide-react";
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

type DateFilter = "all" | "7days" | "30days" | "90days";

const DATE_FILTERS: { value: DateFilter; label: string }[] = [
  { value: "all", label: "Visi laiki" },
  { value: "7days", label: "Pēdējās 7 dienas" },
  { value: "30days", label: "Pēdējās 30 dienas" },
  { value: "90days", label: "Pēdējās 90 dienas" },
];

const isWithinDays = (iso: string, days: number) => {
  if (!iso) return false;
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  return diffMs >= 0 && diffMs <= days * 24 * 60 * 60 * 1000;
};

const NotificationsHistory = ({ userId }: Props) => {
  const [items, setItems] = useState<NotificationEntry[]>([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const refresh = () => setItems(loadNotifications(userId));

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === `seen-tracking-${userId}`) refresh();
    };
    window.addEventListener("storage", onStorage);
    const id = window.setInterval(refresh, 3000);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(id);
    };
  }, [userId]);

  const filtered = useMemo(() => {
    let list = items;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (e) =>
          e.tracking.toLowerCase().includes(q) ||
          (e.orderNumber && e.orderNumber.toLowerCase().includes(q))
      );
    }

    if (dateFilter !== "all") {
      const days =
        dateFilter === "7days" ? 7 : dateFilter === "30days" ? 30 : 90;
      list = list.filter((e) => isWithinDays(e.seenAt, days));
    }

    return list;
  }, [items, search, dateFilter]);

  const hasActiveFilters = search.trim() || dateFilter !== "all";

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between gap-3 flex-wrap">
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

        {items.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Meklēt pēc tracking numura vai pasūtījuma..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              {DATE_FILTERS.map((f) => (
                <Button
                  key={f.value}
                  variant={dateFilter === f.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateFilter(f.value)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            Vēl nav neviena paziņojuma. Tiklīdz pasūtījumam tiks piešķirts
            izsekošanas numurs, tas parādīsies šeit.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            Nav rezultātu ar izvēlētajiem filtriem.
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSearch("");
                  setDateFilter("all");
                }}
                className="ml-1 underline hover:text-primary"
              >
                Notīrīt filtrus
              </button>
            )}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((e) => (
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
