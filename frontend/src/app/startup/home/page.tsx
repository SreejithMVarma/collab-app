"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Inbox } from "lucide-react";
import Header from "@/app/navigation/Header";
import BottomNav from "@/app/navigation/BottomNav";
import CoverFlowCarousel from "@/app/components/CoverFlowCarousel";
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

function ActivityCard({ post }: { post: StartupActivityPost }) {
  const [imgIdx, setImgIdx] = useState(0);
  const total = post.images.length;

  return (
    <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--muted)] text-xs font-bold text-[var(--text-main)]">
            {post.logoText}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-[var(--text-main)]">
              {post.orgName}
            </div>
            <div className="text-[11px] text-[var(--text-muted-2)]">
              {post.orgSubtitle}
            </div>
          </div>
        </div>
        <span className="text-[11px] text-[var(--text-muted-2)]">
          {post.time}
        </span>
      </div>

      <div className="relative mt-2 overflow-hidden rounded-xl border border-[var(--line-soft)] bg-[var(--muted)]">
        <div className="aspect-[16/10] w-full">
          <img
            src={post.images[imgIdx]}
            alt="Activity"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
        {total > 1 && (
          <>
            <button
              onClick={() => setImgIdx((prev) => (prev - 1 + total) % total)}
              className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white shadow text-xs"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={() => setImgIdx((prev) => (prev + 1) % total)}
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line-soft)] bg-white shadow text-xs"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
        <div className="absolute bottom-2 right-2 rounded-full border border-[var(--line-soft)] bg-white px-2 py-0.5 text-[10px] font-semibold text-[var(--text-main)]">
          {imgIdx + 1}/{total}
        </div>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted-2)]">
        {post.text}
      </p>
    </div>
  );
}

export default function StartupHomePage() {
  const router = useRouter();

  const [startupName, setStartupName] = useState("Syncreate");
  const [startupTagline, setStartupTagline] = useState(
    "Your hub for innovative projects and collaborations.",
  );
  const [activeCollabs] =
    useState<StartupActiveCollab[]>(mockStartupCollabs);
  const [activeCategory, setActiveCategory] = useState<FeedCategory>("Updates");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const profile = getStartupProfile();
    setStartupName(profile.name);
    setStartupTagline(profile.tagline);
  }, []);

  const filteredActivity = useMemo(() => {
    return mockStartupActivity.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const go = (path: string) => router.push(path);

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    go(`/startup/explore?q=${encodeURIComponent(q)}`);
  };

  const collabGradients = [
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  ];

  const carouselItems = filteredActivity.map((p) => ({
    id: p.id,
    content: <ActivityCard post={p} />,
  }));

  return (
    <div className="sync-theme-page sync-page-with-bottom-nav min-h-screen">
      <Header
        title={startupName}
        showNotificationDot={true}
      />

      <div className="mx-auto w-full max-w-[480px] px-5 pb-6 pt-2">
        {/* ── Search Bar (narrower) ─────────────────────── */}
        <section className="mb-4 px-2">
          <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--field-border)] bg-[var(--field-bg)] px-3.5 py-2.5 shadow-sm">
            <Search size={16} className="shrink-0 text-[var(--text-muted-2)]" />
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

        {/* ── Startup's Projects (horizontal split top/bottom) ── */}
        <section className="mb-4">
          <h2 className="mb-2 text-base font-semibold text-[var(--text-main)]">
            {startupName}&apos;s Projects:
          </h2>

          <div className="flex gap-2 overflow-x-auto scroll-hide pb-1">
            {mockStartupProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col min-w-[260px] max-w-[260px] shrink-0 overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] shadow-sm"
              >
                {/* Top gradient image area */}
                <div
                  className="flex h-[75px] w-full shrink-0 items-center justify-center"
                  style={{ background: project.gradient }}
                >
                  <span className="text-3xl font-bold text-white/90">
                    {project.iconLetter}
                  </span>
                </div>
                {/* Bottom content area */}
                <div className="flex flex-col p-2.5">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-main)]">
                      {project.name}
                    </div>
                    <div className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[var(--text-muted-2)]">
                      {project.tagline}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {["Workspace", "Milestones", "Meetings"].map((pill) => (
                      <button
                        key={pill}
                        onClick={(e) => {
                          e.stopPropagation();
                          go(`/startup/projects/${project.id}`);
                        }}
                        className="rounded-full border border-[var(--line-soft)] bg-[var(--muted)] px-2 py-0.5 text-[9px] font-semibold text-[var(--text-main)]"
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Active Collaborations (horizontal split top/bottom) ─── */}
        <section className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--text-main)]">
              Active collaborations:
            </h2>
            <button
              onClick={() => go("/startup/explore")}
              className="text-xs font-semibold text-[var(--text-main)]"
            >
              View all
            </button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto scroll-hide pb-1">
            {activeCollabs.length === 0 ? (
              <div className="min-w-[230px] rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-2.5 shadow-sm">
                <div className="font-semibold text-[var(--text-main)]">
                  No active collaborations yet
                </div>
                <div className="mt-1 text-xs text-[var(--text-muted-2)]">
                  Once a request is accepted, it will appear here.
                </div>
              </div>
            ) : (
              activeCollabs.map((c, i) => (
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
                  className="flex flex-col min-w-[260px] cursor-pointer overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] shadow-sm"
                >
                  {/* Top gradient */}
                  <div
                    className="flex h-[65px] w-full shrink-0 flex-col items-center justify-center p-2"
                    style={{ background: collabGradients[i % collabGradients.length] }}
                  >
                    <span className="text-2xl font-bold text-white/80">
                      {c.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  {/* Bottom content */}
                  <div className="flex flex-col p-2.5">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div className="min-w-0 truncate text-sm font-semibold text-[var(--text-main)]">
                          {c.title}
                        </div>
                        <span className="shrink-0 rounded-full bg-[var(--muted)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--text-main)]">
                          {c.status}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--text-muted-2)]">
                        {c.deadline}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted-2)]">
                        {c.sprintsLeft}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {["Workspace", "Milestones", "Meetings"].map((pill) => (
                        <button
                          key={pill}
                          onClick={(e) => {
                            e.stopPropagation();
                            go(`/projects/${c.projectId}`);
                          }}
                          className="rounded-full border border-[var(--line-soft)] bg-[var(--muted)] px-2 py-0.5 text-[9px] font-semibold text-[var(--text-main)]"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── Feed Filter Tabs ───────────────────────────── */}
        <section className="mb-2">
          <div className="flex gap-2 overflow-x-auto scroll-hide pb-1">
            {feedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
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

        {/* ── Updates CoverFlow Carousel ──────────────────── */}
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--text-main)]">
              {activeCategory}
            </h2>
            <button
              onClick={() => go("/startup/explore")}
              className="text-xs font-semibold text-[var(--text-main)]"
            >
              Explore
            </button>
          </div>

          {carouselItems.length === 0 ? (
            <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface-solid)] p-6 text-center shadow-sm">
              <Inbox size={28} className="mx-auto text-[var(--text-muted-2)]" />
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
            <CoverFlowCarousel items={carouselItems} />
          )}
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
