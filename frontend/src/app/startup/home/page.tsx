"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/navigation/Header";
import BottomNav from "@/app/navigation/BottomNav";
import {
  getStartupProfile,
  mockStartupProjects,
  mockStartupCollabs,
  mockStartupActivity,
  feedCategories,
  type FeedCategory,
  type StartupActiveCollab,
  type StartupActivityPost,
} from "@/lib/startup-data";

export default function StartupHomePage() {
  const router = useRouter();

  const [startupName, setStartupName] = useState("Syncreate");
  const [startupTagline, setStartupTagline] = useState(
    "Your hub for innovative projects and collaborations.",
  );
  const [activeCollabs, setActiveCollabs] =
    useState<StartupActiveCollab[]>(mockStartupCollabs);
  const [activeCategory, setActiveCategory] = useState<FeedCategory>("Updates");
  const [searchQuery, setSearchQuery] = useState("");
  const [imgIndexByPost, setImgIndexByPost] = useState<Record<number, number>>(
    {},
  );

  useEffect(() => {
    const profile = getStartupProfile();
    setStartupName(profile.name);
    setStartupTagline(profile.tagline);

    const init: Record<number, number> = {};
    for (const p of mockStartupActivity) init[p.id] = 0;
    setImgIndexByPost(init);
  }, []);

  const filteredActivity = useMemo(() => {
    return mockStartupActivity.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const go = (path: string) => {
    router.push(path);
  };

  const nextImg = (postId: number, total: number) => {
    setImgIndexByPost((prev) => ({
      ...prev,
      [postId]: ((prev[postId] ?? 0) + 1) % total,
    }));
  };

  const prevImg = (postId: number, total: number) => {
    setImgIndexByPost((prev) => ({
      ...prev,
      [postId]: ((prev[postId] ?? 0) - 1 + total) % total,
    }));
  };

  const setImg = (postId: number, idx: number) => {
    setImgIndexByPost((prev) => ({ ...prev, [postId]: idx }));
  };

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    go(`/startup/explore?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="sync-theme-page sync-page-with-bottom-nav min-h-screen">
      <Header
        title={startupName}
        subtitle={startupTagline}
        showNotificationDot={true}
      />

      <div className="mx-auto w-full max-w-[480px] px-4 pb-4">
        {/* ── Search Bar ────────────────────────────────── */}
        <section className="mb-6">
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--field-border)] bg-[var(--field-bg)] px-4 py-3 shadow-sm">
            <span className="text-lg text-[var(--text-muted-2)]">🔎</span>
            <input
              id="startup-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Search projects or partners..."
              className="w-full bg-transparent text-sm text-[var(--text-main)] outline-none placeholder:text-[var(--text-muted-2)]"
            />
          </div>
        </section>

        {/* ── Startup's Projects ─────────────────────────── */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-[var(--text-main)]">
            {startupName}&apos;s Projects:
          </h2>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {mockStartupProjects.map((project) => (
              <div
                key={project.id}
                className="min-w-[170px] max-w-[170px] shrink-0 rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm"
              >
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--muted)] text-xl">
                  {project.icon}
                </div>
                <div className="text-sm font-bold text-[var(--text-main)]">
                  {project.name}
                </div>
                <div className="mt-1 line-clamp-2 text-xs text-[var(--text-muted-2)]">
                  {project.tagline}
                </div>
                <button
                  onClick={() => go(`/startup/projects/${project.id}`)}
                  className="mt-3 w-full rounded-xl border border-[var(--line-soft)] bg-[var(--surface-solid)] py-2 text-xs font-semibold text-[var(--text-main)] transition hover:bg-[var(--muted)]"
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Active Collaborations ──────────────────────── */}
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-main)]">
              Active collaborations:
            </h2>
            <button
              onClick={() => go("/startup/explore")}
              className="text-sm font-semibold text-[var(--text-main)]"
            >
              View all
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {activeCollabs.length === 0 ? (
              <div className="min-w-[230px] rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm">
                <div className="font-semibold text-[var(--text-main)]">
                  No active collaborations yet
                </div>
                <div className="mt-1 text-sm text-[var(--text-muted-2)]">
                  Once a request is accepted, it will appear here.
                </div>
                <button
                  onClick={() => go("/startup/explore")}
                  className="mt-4 w-full rounded-xl bg-[var(--primary-btn-bg)] py-2 font-semibold text-[var(--primary-btn-text)]"
                >
                  Explore Requests
                </button>
              </div>
            ) : (
              activeCollabs.map((c) => (
                <div
                  key={c.id}
                  onClick={() => go(`/projects/${c.projectId}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      go(`/projects/${c.projectId}`);
                    }
                  }}
                  className="min-w-[220px] cursor-pointer rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-[var(--text-main)]">
                        {c.title}
                      </div>
                      <div className="mt-1 text-xs text-[var(--text-muted-2)]">
                        {c.deadline}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="rounded-full bg-[var(--muted)] px-2 py-1 text-[11px] font-semibold text-[var(--text-main)]">
                        {c.status}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted-2)]">
                        {c.sprintsLeft}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── Feed Filter Tabs ───────────────────────────── */}
        <section className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {feedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat
                    ? "border-[var(--text-main)] bg-[var(--surface-solid)] text-[var(--text-main)]"
                    : "border-[var(--line-soft)] bg-[var(--surface-solid)] text-[var(--text-muted-2)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── Updates / Activity Feed ────────────────────── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-main)]">
              {filteredActivity.length > 0
                ? `${filteredActivity[0].orgName} ${activeCategory}`
                : `${activeCategory}`}
            </h2>
            <button
              onClick={() => go("/startup/explore")}
              className="text-sm font-semibold text-[var(--text-main)]"
            >
              Explore
            </button>
          </div>

          <div className="space-y-4">
            {filteredActivity.length === 0 ? (
              <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-6 text-center shadow-sm">
                <div className="text-2xl">📭</div>
                <div className="mt-2 font-semibold text-[var(--text-main)]">
                  No {activeCategory.toLowerCase()} yet
                </div>
                <div className="mt-1 text-sm text-[var(--text-muted-2)]">
                  {activeCategory === "Surveys"
                    ? "Surveys feature coming soon."
                    : "Check back later for new updates."}
                </div>
              </div>
            ) : (
              filteredActivity.map((p) => {
                const idx = imgIndexByPost[p.id] ?? 0;
                const total = p.images.length;

                return (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm"
                  >
                    {/* Post header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--muted)] text-xs font-bold text-[var(--text-main)]">
                          {p.logoText}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-[var(--text-main)]">
                            {p.orgName}
                          </div>
                          <div className="text-xs text-[var(--text-muted-2)]">
                            {p.orgSubtitle}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-[var(--text-muted-2)]">
                        {p.time}
                      </span>
                    </div>

                    {/* Image carousel */}
                    <div className="relative mt-3 overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[var(--muted)]">
                      <div className="aspect-[16/10] w-full">
                        <img
                          src={p.images[idx]}
                          alt="Activity"
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                      </div>

                      {total > 1 && (
                        <>
                          <button
                            onClick={() => prevImg(p.id, total)}
                            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white shadow"
                            aria-label="Previous image"
                            title="Previous"
                          >
                            ‹
                          </button>
                          <button
                            onClick={() => nextImg(p.id, total)}
                            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white shadow"
                            aria-label="Next image"
                            title="Next"
                          >
                            ›
                          </button>
                        </>
                      )}

                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-end">
                          <div className="rounded-full border border-[var(--line-soft)] bg-white px-2 py-1 text-[11px] font-semibold text-[var(--text-main)]">
                            {idx + 1}/{total}
                          </div>
                        </div>

                        {total > 1 && (
                          <div className="mt-2 flex items-center justify-center gap-1">
                            {p.images.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setImg(p.id, i)}
                                className={[
                                  "h-1.5 rounded-full transition",
                                  i === idx
                                    ? "w-5 bg-white"
                                    : "w-2 bg-white/60",
                                ].join(" ")}
                                aria-label={`Go to image ${i + 1}`}
                                title={`Image ${i + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Post body */}
                    <p className="mt-3 text-sm text-[var(--text-muted-2)]">
                      {p.text}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
