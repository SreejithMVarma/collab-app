"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import Header from "@/app/navigation/Header";
import BottomNav from "@/app/navigation/BottomNav";
import { mockStartupProjects } from "@/lib/startup-data";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  avatarText: string;
  verified: boolean;
};

type CompanyProfile = {
  name: string;
  tagline: string;
  description: string;
  location: string;
  founded: string;
  avatarText: string;
  website: string;
};

const companyProfile: CompanyProfile = {
  name: "Syncreate",
  tagline: "Building the future of collaborative innovation",
  description:
    "Syncreate is a technology company focused on bridging the gap between startups and university talent. We build tools for real-time collaboration, project management, and skill-based matching.",
  location: "Hyderabad, India",
  founded: "2024",
  avatarText: "S",
  website: "syncreate.com",
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Harshith",
    role: "Founder & CEO",
    avatarText: "H",
    verified: true,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Engineering Lead",
    avatarText: "R",
    verified: true,
  },
  {
    id: 3,
    name: "Ayesha Khan",
    role: "Design Lead",
    avatarText: "A",
    verified: true,
  },
  {
    id: 4,
    name: "Kiran Reddy",
    role: "Backend Engineer",
    avatarText: "K",
    verified: false,
  },
];

const domainTags = [
  "EdTech",
  "Collaboration",
  "SaaS",
  "Mobile-first",
  "AI/ML",
];

const techStack = [
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
];

export default function StartupProfilePage() {
  const router = useRouter();
  const [showAllTeam, setShowAllTeam] = useState(false);

  const stats = useMemo(
    () => ({
      projects: mockStartupProjects.length,
      team: teamMembers.length,
      verified: teamMembers.filter((m) => m.verified).length,
    }),
    [],
  );

  const visibleTeam = showAllTeam ? teamMembers : teamMembers.slice(0, 3);

  return (
    <div className="sync-theme-page sync-page-with-bottom-nav min-h-screen">
      <Header
        title="Profile"
        subtitle="Company profile & team"
        variant="profile"
      />

      <div className="mx-auto w-full max-w-[480px] space-y-5 px-4 py-5">
        {/* ── Company Card ──────────────────────────────── */}
        <div className="rounded-[28px] border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[var(--line-soft)] bg-[var(--muted)] text-[1.6rem] font-bold text-[var(--text-main)]">
              {companyProfile.avatarText}
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[1.65rem] font-extrabold tracking-[-0.03em] text-[var(--text-main)]">
                {companyProfile.name}
              </div>
              <div className="mt-1 text-sm text-[var(--text-muted-2)]">
                {companyProfile.tagline}
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-[var(--text-soft-2)]">
                <MapPin size={13} className="shrink-0" />
                {companyProfile.location} · Est. {companyProfile.founded}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 flex justify-center">
            <div className="grid w-full max-w-[280px] grid-cols-3 gap-2.5">
              <div className="rounded-[22px] bg-[var(--muted)] px-2.5 py-3 text-center">
                <div className="text-[1.5rem] font-extrabold leading-none text-[var(--text-main)]">
                  {stats.projects}
                </div>
                <div className="mt-1.5 text-[11px] text-[var(--text-muted-2)]">
                  Projects
                </div>
              </div>

              <div className="rounded-[22px] bg-[var(--muted)] px-2.5 py-3 text-center">
                <div className="text-[1.5rem] font-extrabold leading-none text-[var(--text-main)]">
                  {stats.team}
                </div>
                <div className="mt-1.5 text-[11px] text-[var(--text-muted-2)]">
                  Team
                </div>
              </div>

              <div className="rounded-[22px] bg-[var(--muted)] px-2.5 py-3 text-center">
                <div className="text-[1.5rem] font-extrabold leading-none text-[var(--text-main)]">
                  {stats.verified}
                </div>
                <div className="mt-1.5 text-[11px] text-[var(--text-muted-2)]">
                  Verified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── About ─────────────────────────────────────── */}
        <div>
          <h3 className="text-[1.15rem] font-bold text-[var(--text-main)]">
            About
          </h3>
          <div className="mt-2 rounded-[26px] border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm">
            <p className="text-sm leading-relaxed text-[var(--text-muted-2)]">
              {companyProfile.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {domainTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--muted)] px-3 py-1 text-xs text-[var(--text-muted-2)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Team ──────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-[1.15rem] font-bold text-[var(--text-main)]">
              Team
            </h3>
            <span className="text-sm text-[var(--text-muted-2)]">
              {teamMembers.length} members
            </span>
          </div>

          <div className="mt-2 space-y-3">
            {visibleTeam.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-solid)] p-3 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--muted)] font-bold text-[var(--text-main)]">
                  {m.avatarText}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-semibold text-[var(--text-main)]">
                      {m.name}
                    </span>
                    {m.verified && (
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--text-muted-2)]">
                    {m.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {teamMembers.length > 3 && (
            <button
              onClick={() => setShowAllTeam((v) => !v)}
              className="mt-3 h-12 w-full rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-solid)] font-bold text-[var(--text-main)] shadow-sm"
            >
              {showAllTeam ? "Show less" : "Show all team members"}
            </button>
          )}
        </div>

        {/* ── Projects ──────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-[1.15rem] font-bold text-[var(--text-main)]">
              Projects
            </h3>
            <button
              onClick={() => router.push("/startup/home")}
              className="text-sm font-semibold text-[var(--text-muted-2)]"
            >
              View all
            </button>
          </div>

          <div className="mt-2 space-y-3">
            {mockStartupProjects.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ background: p.gradient }}
                  >
                    {p.iconLetter}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[var(--text-main)]">
                      {p.name}
                    </div>
                    <div className="text-xs text-[var(--text-muted-2)]">
                      {p.tagline}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech Stack ────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between pt-1">
            <h3 className="text-[1.15rem] font-bold text-[var(--text-main)]">
              Tech Stack
            </h3>
            <button className="text-sm font-semibold text-[var(--text-muted-2)]">
              Tags
            </button>
          </div>

          <div className="mt-2 rounded-[26px] border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {techStack.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-[var(--muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-main)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Website CTA ───────────────────────────────── */}
        <button
          onClick={() => alert(`Visit ${companyProfile.website} (demo)`)}
          className="h-12 w-full rounded-[22px] bg-[var(--primary-btn-bg)] font-extrabold text-[var(--primary-btn-text)] shadow-md active:scale-[0.99]"
        >
          Visit Website
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
