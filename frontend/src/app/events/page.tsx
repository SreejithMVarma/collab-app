"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CalendarDays,
  Heart,
  MessageSquare,
  Plus,
  Search,
} from "lucide-react";
import BottomNav from "../navigation/BottomNav";
import { Skeleton } from "@/components/ui/skeleton";

type EventTag = string;

type EventItem = {
  id: number;
  title: string;
  company: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  priceInr: number;
  mode: "Online" | "In-person";
  tags: EventTag[];
  badge: string;
};

const mockEvents: EventItem[] = [
  {
    id: 1,
    title: "Wearable Robotics Challenge",
    company: "International Institute for Haptics",
    dateLabel: "Fri, Apr 11, 2025",
    timeLabel: "9:00 AM - 5:00 PM",
    location: "MIT Media Lab, Cambridge, MA",
    priceInr: 0,
    mode: "In-person",
    tags: ["recommended", "robotics"],
    badge: "IIH",
  },
  {
    id: 2,
    title: "FoundersHub Pitch Night",
    company: "FoundersHub",
    dateLabel: "Fri, Apr 11, 2025",
    timeLabel: "9:00 AM - 12:30 PM",
    location: "Startup Pier, San Francisco, CA",
    priceInr: 0,
    mode: "In-person",
    tags: ["pitch", "startup"],
    badge: "FH",
  },
  {
    id: 3,
    title: "AI Builders Meetup",
    company: "SphereNet Community",
    dateLabel: "Sat, Apr 12, 2025",
    timeLabel: "10:00 AM - 1:00 PM",
    location: "Online",
    priceInr: 0,
    mode: "In-person",
    tags: ["ai", "community"],
    badge: "AI",
  },
  {
    id: 4,
    title: "Design Systems Workshop",
    company: "PixelWorks",
    dateLabel: "Mon, Apr 14, 2025",
    timeLabel: "7:00 PM - 9:00 PM",
    location: "Gachibowli, Hyderabad",
    priceInr: 499,
    mode: "In-person",
    tags: ["design", "workshop"],
    badge: "PW",
  },
  {
    id: 5,
    title: "Weekend Hackathon",
    company: "DevSprint",
    dateLabel: "Fri, Apr 18, 2025",
    timeLabel: "10:00 AM - Sun 10:00 AM",
    location: "Madhapur, Hyderabad",
    priceInr: 199,
    mode: "In-person",
    tags: ["hackathon", "career"],
    badge: "DS",
  },
  {
    id: 6,
    title: "Career Webinar",
    company: "HiringStudio",
    dateLabel: "Fri, Apr 25, 2025",
    timeLabel: "8:00 PM - 9:00 PM",
    location: "Online",
    priceInr: 0,
    mode: "Online",
    tags: ["career", "webinar"],
    badge: "HS",
  },
];

const SAVED_KEY = "savedEvents_v1";
const REGISTERED_KEY = "registeredEvents_v1";

function formatPrice(priceInr: number) {
  if (!priceInr || priceInr <= 0) return "Free";
  return `₹${priceInr}`;
}

type FilterKey = "all" | "free" | "paid" | "online" | "nearby";

export default function EventsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const [savedIds, setSavedIds] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [registeredIds, setRegisteredIds] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(REGISTERED_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const visibleEvents = useMemo(() => {
    const q = query.trim().toLowerCase();

    return mockEvents.filter((e) => {
      const hay = `${e.title} ${e.company} ${e.location} ${e.mode} ${e.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !q || hay.includes(q);

      let matchesFilter = true;
      if (filter === "free") matchesFilter = e.priceInr === 0;
      if (filter === "paid") matchesFilter = e.priceInr > 0;
      if (filter === "online") matchesFilter = e.mode === "Online";
      if (filter === "nearby") matchesFilter = e.mode === "In-person";

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const registeredEvents = useMemo(() => {
    return mockEvents.filter((e) => registeredIds.includes(e.id));
  }, [registeredIds]);

  const toggleSave = (id: number) => {
    const next = savedIds.includes(id)
      ? savedIds.filter((x) => x !== id)
      : [...savedIds, id];

    setSavedIds(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  };

  const toggleRegister = (id: number) => {
    const next = registeredIds.includes(id)
      ? registeredIds.filter((x) => x !== id)
      : [...registeredIds, id];

    setRegisteredIds(next);
    localStorage.setItem(REGISTERED_KEY, JSON.stringify(next));
  };

  const filterPills: { key: FilterKey; label: string }[] = [
    { key: "all", label: "recommended" },
    { key: "free", label: "robotics" },
    { key: "paid", label: "startup" },
    { key: "online", label: "online" },
  ];

  const quickActions = [
    { icon: Plus, label: "Create", href: "/create" },
    { icon: Bell, label: "Alerts", href: "/notifications", dot: true },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
  ];

  return (
    <div className="sync-theme-page sync-page-with-bottom-nav min-h-screen">
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-4 pb-6 pt-4">
        <header className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            
            <h1 className="sync-theme-text-main text-4xl font-black tracking-[-0.03em]">
              Events
            </h1>
            <p className="mt-1 max-w-[18rem] text-sm leading-5 sync-theme-text-muted">
              Discover meetups, hackathons, workshops, and more.
            </p>
          </div>

          <div className="flex shrink-0 items-start gap-2 pt-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => router.push(action.href)}
                  className="flex flex-col items-center gap-1"
                  aria-label={action.label}
                  title={action.label}
                >
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full sync-theme-surface sync-theme-border">
                    <Icon size={18} />
                    {action.dot ? (
                      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                    ) : null}
                  </span>
                 
                </button>
              );
            })}
          </div>
        </header>

        <div className="mb-4 sync-theme-surface sync-theme-border rounded-[24px] p-3 shadow-sm">
          {/* <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="sync-theme-text-main text-sm font-semibold">
              Search and Filter
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold sync-theme-text-muted">
              <Filter size={12} />
              {visibleEvents.length} results
            </span>
          </div> */}

         <div className="sync-theme-border flex items-center gap-3 rounded-2xl border bg-black/[0.03] px-4 py-3 dark:bg-white/[0.04]">
            <Search size={16} className="sync-theme-text-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, competitions..."
              className="sync-theme-text-main w-full bg-transparent text-sm outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scroll-hide">
            {filterPills.map((pill) => {
              const active = filter === pill.key;
              return (
                <button
                  key={pill.key}
                  onClick={() => setFilter(pill.key)}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-medium transition ${
                    active
                      ? "sync-theme-primary-btn"
                      : "sync-theme-border sync-theme-surface border"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}

          </div>
        </div>

        {registeredEvents.length > 0 && (
          <section className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="sync-theme-text-main text-lg font-semibold">Registered</h2>
              <span className="text-sm sync-theme-text-muted">{registeredEvents.length} saved</span>
            </div>

            <div className="space-y-3">
              {registeredEvents.map((event) => (
                <article key={`reg-${event.id}`} className="sync-theme-surface sync-theme-border rounded-[24px] p-3 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-[1fr_108px] gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] sync-theme-text-muted">
                        {event.company}
                      </p>
                      <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-5 sync-theme-text-main">
                        {event.title}
                      </h3>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
                        <div>
                          <p className="text-[10px] sync-theme-text-muted">Date</p>
                          <p className="font-medium sync-theme-text-main">{event.dateLabel}</p>
                        </div>
                        <div>
                          <p className="text-[10px] sync-theme-text-muted">Time</p>
                          <p className="font-medium sync-theme-text-main">{event.timeLabel}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-[10px] sync-theme-text-muted">Location</p>
                          <p className="font-medium sync-theme-text-main">{event.location}</p>
                        </div>
                      </div>
                    </div>

                    <EventPlaceholder />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="rounded-full px-3 py-1 text-[11px] font-medium sync-theme-text-main sync-theme-surface sync-theme-border">
                      Registered
                    </span>

                    <button onClick={() => toggleRegister(event.id)} className="rounded-full px-4 py-2 sync-theme-border sync-theme-surface font-semibold">
                      Unregister
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="mb-3 flex items-center justify-between">
          <h2 className="sync-theme-text-main text-lg font-semibold">Upcoming Events</h2>
        </div>

        <div className="space-y-3">
          {visibleEvents.length === 0 ? (
            <div className="sync-theme-surface sync-theme-border rounded-[24px] p-6 text-center shadow-sm">
              <CalendarDays size={32} className="mx-auto sync-theme-text-main" />
              <div className="mt-3 text-[16px] font-bold sync-theme-text-main">No events found</div>
              <div className="mt-1 text-sm sync-theme-text-muted">Try another search or filter.</div>
            </div>
          ) : (
            visibleEvents.map((event, index) => {
              const saved = savedIds.includes(event.id);
              const isRegistered = registeredIds.includes(event.id);

              return (
                <article key={event.id} className="sync-theme-surface sync-theme-border rounded-[24px] p-3 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-[1fr_108px] gap-3">
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-[0.12em] sync-theme-text-muted">
                            {event.company}
                          </p>
                          <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-5 sync-theme-text-main">
                            {event.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => toggleSave(event.id)}
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition ${
                            saved
                              ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                              : "border-black/10 bg-black/[0.03] text-black/75 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/75"
                          }`}
                          title={saved ? "Saved" : "Save"}
                          aria-label={saved ? "Saved" : "Save"}
                        >
                          <Heart size={14} className={saved ? "fill-current" : ""} />
                        </button>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
                        <div>
                          <p className="text-[10px] sync-theme-text-muted">Date</p>
                          <p className="font-medium sync-theme-text-main">{event.dateLabel}</p>
                        </div>
                        <div>
                          <p className="text-[10px] sync-theme-text-muted">Time</p>
                          <p className="font-medium sync-theme-text-main">{event.timeLabel}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-[10px] sync-theme-text-muted">{event.mode === "Online" ? "Mode" : "Location"}</p>
                          <p className="font-medium sync-theme-text-main">{event.location}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full px-3 py-1 text-[11px] font-medium sync-theme-surface sync-theme-border">
                          {formatPrice(event.priceInr)}
                        </span>
                        <span className="rounded-full px-3 py-1 text-[11px] font-medium sync-theme-surface sync-theme-border">
                          {event.mode}
                        </span>
                      
                      </div>
                    </div>

                    <EventPlaceholder index={index} />
                  </div>

                  <div className="mt-3 flex gap-2">
                    {/* <button onClick={() => alert(`Demo: open event ${event.id}`)} className="flex-1 rounded-full sync-theme-surface sync-theme-border py-2.5 text-[12px] font-semibold">
                      View
                    </button> */}

                    <button
                      onClick={() => toggleRegister(event.id)}
                      className={`flex-1 rounded-full py-2.5 text-[12px] font-semibold shadow-sm transition ${
                        isRegistered ? "sync-theme-surface sync-theme-border" : "sync-theme-primary-btn"
                      }`}
                    >
                      {isRegistered ? "Registered" : "Register"}
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function EventPlaceholder({ index = 0 }: { index?: number }) {
  return (
    <div className="relative overflow-hidden rounded-3xl sync-theme-surface sync-theme-border p-3 shadow-sm">
      <div className={`absolute inset-0 ${index % 2 === 0 ? "opacity-10" : "opacity-6"}`} />
      <div className="relative flex flex-col gap-3">
        <div className="w-full">
          <Skeleton className="h-[96px] w-full rounded-2xl" />
        </div>

        <div className="space-y-1">
          <div className="h-2.5 w-14 rounded-full bg-[var(--line-soft)]" />
          <div className="h-2 w-20 rounded-full bg-[var(--line-soft)]/80" />
          <div className="h-2 w-16 rounded-full bg-[var(--line-soft)]/60" />
        </div>
      </div>
    </div>
  );
}