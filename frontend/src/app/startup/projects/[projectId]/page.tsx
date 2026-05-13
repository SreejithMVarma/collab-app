"use client";

import { useParams, useRouter } from "next/navigation";
import { SearchX } from "lucide-react";
import Header from "@/app/navigation/Header";
import BottomNav from "@/app/navigation/BottomNav";
import { mockStartupProjects } from "@/lib/startup-data";

export default function StartupProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const project = mockStartupProjects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="sync-theme-page sync-page-with-bottom-nav min-h-screen">
        <Header title="Project" />
        <div className="mx-auto w-full max-w-[480px] px-4 py-10 text-center">
          <SearchX size={32} className="mx-auto text-[var(--text-muted-2)]" />
          <div className="mt-3 text-lg font-bold text-[var(--text-main)]">
            Project not found
          </div>
          <button
            onClick={() => router.push("/startup/home")}
            className="mt-4 rounded-xl bg-[var(--primary-btn-bg)] px-6 py-2 font-semibold text-[var(--primary-btn-text)]"
          >
            Back to Home
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="sync-theme-page sync-page-with-bottom-nav min-h-screen">
      <Header title={project.name} />

      <div className="mx-auto w-full max-w-[480px] px-4 pb-4">
        {/* Project hero */}
        <div className="mt-4 rounded-[28px] border border-[var(--line-soft)] bg-[var(--surface-solid)] p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
              style={{ background: project.gradient }}
            >
              {project.iconLetter}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold text-[var(--text-main)]">
                {project.name}
              </h2>
              <p className="mt-1 text-sm text-[var(--text-muted-2)]">
                {project.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Project details (mock) */}
        <div className="mt-4 space-y-4">
          <div className="rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm">
            <h3 className="font-bold text-[var(--text-main)]">Overview</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted-2)]">
              This is a mock project detail page for &quot;{project.name}&quot;.
              Full project management features including tasks, milestones, and
              team collaboration will be available in future updates.
            </p>
          </div>

          <div className="rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm">
            <h3 className="font-bold text-[var(--text-main)]">Status</h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Active
              </span>
              <span className="text-xs text-[var(--text-muted-2)]">
                Last updated 2h ago
              </span>
            </div>
          </div>

          <div className="rounded-[22px] border border-[var(--line-soft)] bg-[var(--surface-solid)] p-4 shadow-sm">
            <h3 className="font-bold text-[var(--text-main)]">Quick Actions</h3>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => alert("Edit project (demo)")}
                className="flex-1 rounded-xl bg-[var(--muted)] px-4 py-2 text-sm font-semibold text-[var(--text-main)]"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  alert("Share project link (demo)")
                }
                className="flex-1 rounded-xl bg-[var(--primary-btn-bg)] px-4 py-2 text-sm font-semibold text-[var(--primary-btn-text)]"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
