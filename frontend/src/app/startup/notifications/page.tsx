"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Inbox, CheckCircle, MessageCircle, Handshake, Bell, BellOff } from "lucide-react";
import Header from "@/app/navigation/Header";
import BottomNav from "@/app/navigation/BottomNav";

type NotiType = "verify" | "apply" | "status" | "message" | "collab" | "system";

type NotificationItem = {
  id: string;
  type: NotiType;
  title: string;
  message: string;
  createdAt: number;
  read: boolean;
  href?: string;
  /** For verify-type: the user requesting verification */
  verifyUser?: string;
  verifyStatus?: "Pending" | "Verified" | "Rejected";
};

const STORAGE_KEY = "startupNotifications_v1";

function uid() {
  return Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

function NotiIcon({ type }: { type: NotiType }) {
  const cls = "w-5 h-5";
  switch (type) {
    case "verify":
      return <ShieldCheck className={cls} />;
    case "apply":
      return <Inbox className={cls} />;
    case "status":
      return <CheckCircle className={cls} />;
    case "message":
      return <MessageCircle className={cls} />;
    case "collab":
      return <Handshake className={cls} />;
    default:
      return <Bell className={cls} />;
  }
}

function seedIfEmpty() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return;

  const now = Date.now();
  const seeded: NotificationItem[] = [
    {
      id: uid(),
      type: "verify",
      title: "Verification request",
      message:
        "Rahul Sharma has requested to be verified as a member of your organization.",
      createdAt: now - 1000 * 60 * 15,
      read: false,
      verifyUser: "Rahul Sharma",
      verifyStatus: "Pending",
    },
    {
      id: uid(),
      type: "verify",
      title: "Verification request",
      message:
        "Ayesha Khan is requesting verification for the Design team.",
      createdAt: now - 1000 * 60 * 60 * 2,
      read: false,
      verifyUser: "Ayesha Khan",
      verifyStatus: "Pending",
    },
    {
      id: uid(),
      type: "apply",
      title: "New applicant",
      message:
        'Kiran applied to your collaboration: "AI Model Optimization Sprint".',
      createdAt: now - 1000 * 60 * 60 * 5,
      read: false,
      href: "/startup/explore",
    },
    {
      id: uid(),
      type: "collab",
      title: "Collaboration accepted",
      message:
        'Your collaboration "Startup Landing Page Revamp" has been accepted by the university team.',
      createdAt: now - 1000 * 60 * 60 * 24,
      read: true,
      href: "/startup/home",
    },
    {
      id: uid(),
      type: "message",
      title: "New message",
      message: 'Rahul: "Can you share the project brief for next week?"',
      createdAt: now - 1000 * 60 * 60 * 48,
      read: true,
      href: "/startup/messages",
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
}

function loadList(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveList(list: NotificationItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function StartupNotificationsPage() {
  const router = useRouter();

  const [items, setItems] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "verify">("all");

  useEffect(() => {
    seedIfEmpty();
    setItems(loadList());
  }, []);

  const unreadCount = useMemo(
    () => items.filter((n) => !n.read).length,
    [items],
  );

  const pendingVerifyCount = useMemo(
    () =>
      items.filter((n) => n.type === "verify" && n.verifyStatus === "Pending")
        .length,
    [items],
  );

  const visible = useMemo(() => {
    const sorted = [...items].sort((a, b) => b.createdAt - a.createdAt);
    if (filter === "unread") return sorted.filter((n) => !n.read);
    if (filter === "verify") return sorted.filter((n) => n.type === "verify");
    return sorted;
  }, [items, filter]);

  const markAllRead = () => {
    const updated = items.map((n) => ({ ...n, read: true }));
    setItems(updated);
    saveList(updated);
  };

  const clearAll = () => {
    setItems([]);
    saveList([]);
  };

  const toggleRead = (id: string) => {
    const updated = items.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n,
    );
    setItems(updated);
    saveList(updated);
  };

  const openNoti = (n: NotificationItem) => {
    const updated = items.map((x) =>
      x.id === n.id ? { ...x, read: true } : x,
    );
    setItems(updated);
    saveList(updated);
    if (n.href) router.push(n.href);
  };

  const handleVerify = (id: string, status: "Verified" | "Rejected") => {
    const updated = items.map((n) =>
      n.id === id ? { ...n, verifyStatus: status, read: true } : n,
    );
    setItems(updated);
    saveList(updated);
  };

  return (
    <div className="sync-theme-page sync-page-with-bottom-nav min-h-dvh">
      <Header title="Notifications" />

      <div className="mx-auto w-full max-w-[480px] px-4 pb-4">
        {/* Filter row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex rounded-2xl border border-[var(--line-soft)] bg-[var(--muted)] p-1">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                filter === "all"
                  ? "bg-[var(--surface-solid)] text-[var(--text-main)] shadow-sm"
                  : "text-[var(--text-muted-2)]"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                filter === "unread"
                  ? "bg-[var(--surface-solid)] text-[var(--text-main)] shadow-sm"
                  : "text-[var(--text-muted-2)]"
              }`}
            >
              {unreadCount} Unread
            </button>

            <button
              onClick={() => setFilter("verify")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                filter === "verify"
                  ? "bg-[var(--surface-solid)] text-[var(--text-main)] shadow-sm"
                  : "text-[var(--text-muted-2)]"
              }`}
            >
              Verify {pendingVerifyCount}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] px-4 py-2 text-sm font-medium text-[var(--text-main)] shadow-sm"
            >
              Read all
            </button>

            <button
              onClick={clearAll}
              className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] px-4 py-2 text-sm font-medium text-[var(--text-main)] shadow-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Notification cards */}
        <div className="mt-5 space-y-4">
          {visible.length === 0 ? (
            <div className="rounded-3xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-6 text-center shadow-sm">
              <BellOff size={28} className="mx-auto text-[var(--text-muted-2)]" />
              <div className="mt-2 text-base font-semibold text-[var(--text-main)]">
                No notifications
              </div>
              <div className="mt-1 text-sm text-[var(--text-muted-2)]">
                You&apos;re all caught up.
              </div>
            </div>
          ) : (
            visible.map((n) => (
              <div
                key={n.id}
                className="rounded-3xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm"
              >
                <button
                  onClick={() => openNoti(n)}
                  className="w-full text-left"
                >
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--muted)]">
                      <NotiIcon type={n.type} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-base font-semibold leading-snug text-[var(--text-main)]">
                            {n.title}
                          </div>
                        </div>
                        <span className="shrink-0 pt-0.5 text-xs text-[var(--text-muted-2)]">
                          {timeAgo(n.createdAt)}
                        </span>
                      </div>
                      <div className="mt-1 text-sm leading-7 text-[var(--text-muted-2)]">
                        {n.message}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Action buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {/* Verification-specific actions */}
                  {n.type === "verify" && n.verifyStatus === "Pending" && (
                    <>
                      <button
                        onClick={() => handleVerify(n.id, "Verified")}
                        className="rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700"
                      >
                        ✓ Verify
                      </button>
                      <button
                        onClick={() => handleVerify(n.id, "Rejected")}
                        className="rounded-2xl bg-[var(--danger-soft-bg)] px-4 py-2 text-sm font-semibold text-[var(--danger-soft-text)]"
                      >
                        ✕ Reject
                      </button>
                    </>
                  )}

                  {n.type === "verify" && n.verifyStatus === "Verified" && (
                    <span className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                      ✓ Verified
                    </span>
                  )}

                  {n.type === "verify" && n.verifyStatus === "Rejected" && (
                    <span className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                      ✕ Rejected
                    </span>
                  )}

                  {/* Generic actions */}
                  <button
                    onClick={() => toggleRead(n.id)}
                    className="rounded-2xl bg-[var(--muted)] px-4 py-2 text-sm font-medium text-[var(--text-main)]"
                  >
                    {n.read ? "Mark unread" : "Mark read"}
                  </button>

                  {n.href && n.type !== "verify" && (
                    <button
                      onClick={() => openNoti(n)}
                      className="rounded-2xl bg-[var(--primary-btn-bg)] px-4 py-2 text-sm font-medium text-[var(--primary-btn-text)]"
                    >
                      Open
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
