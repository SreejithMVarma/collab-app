// file: src/lib/startup-data.ts
// Startup-side mock data & types

export type StartupProject = {
  id: string;
  name: string;
  tagline: string;
  icon: string; // emoji or icon key
};

export type StartupActiveCollab = {
  id: number;
  projectId: string;
  title: string;
  status: "Active" | "Paused";
  deadline: string;
  sprintsLeft: string;
};

export type StartupActivityPost = {
  id: number;
  orgName: string;
  orgSubtitle: string;
  logoText: string;
  images: string[];
  text: string;
  time: string;
  category: "Collaboration" | "Surveys" | "Events" | "Updates";
};

export type StartupProfile = {
  name: string;
  tagline: string;
  avatarText: string;
};

// ── Mock startup profile ──────────────────────────────────────────

const STARTUP_PROFILE_KEY = "startupProfile_v1";

export function getStartupProfile(): StartupProfile {
  try {
    const raw = localStorage.getItem(STARTUP_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StartupProfile>;
      return {
        name: parsed.name || "Syncreate",
        tagline:
          parsed.tagline ||
          "Your hub for innovative projects and collaborations.",
        avatarText: parsed.avatarText || "S",
      };
    }
  } catch {
    // fall through
  }

  return {
    name: "Syncreate",
    tagline: "Your hub for innovative projects and collaborations.",
    avatarText: "S",
  };
}

// ── Startup's own projects ────────────────────────────────────────

export const mockStartupProjects: StartupProject[] = [
  {
    id: "kriya",
    name: "Kriya",
    tagline: "Ground Level Service Network for India.",
    icon: "🚁",
  },
  {
    id: "printouts-online",
    name: "printouts.online",
    tagline: "Online on-demand print services.",
    icon: "☁️",
  },
  {
    id: "robotic-prosthetics",
    name: "Robotic Prosthetics",
    tagline: "Bio-integrated mobility solution.",
    icon: "🦾",
  },
  {
    id: "agritech-drones",
    name: "AgriTech Drones",
    tagline: "Precision agriculture with AI drones.",
    icon: "🌾",
  },
];

// ── Active collaborations ─────────────────────────────────────────

export const mockStartupCollabs: StartupActiveCollab[] = [
  {
    id: 1001,
    projectId: "sphere-ai-collab",
    title: "AI Model Optimization",
    status: "Active",
    deadline: "Deadline: 10/03/26",
    sprintsLeft: "2 sprints left",
  },
  {
    id: 1002,
    projectId: "startup-landing-revamp",
    title: "Startup Landing Page Revamp",
    status: "Active",
    deadline: "Deadline: 18/03/26",
    sprintsLeft: "1 sprint left",
  },
];

// ── Activity / updates feed ───────────────────────────────────────

export const mockStartupActivity: StartupActivityPost[] = [
  {
    id: 2001,
    orgName: "Aerogrid Robotics",
    orgSubtitle: "Update",
    logoText: "AR",
    images: ["/feed/drone-1.jpg", "/feed/drone-2.jpg", "/feed/drone-3.jpg"],
    text: "We have successfully built an agricultural drone which we are currently testing in the fields of Haryana.",
    time: "2h ago",
    category: "Updates",
  },
  {
    id: 2002,
    orgName: "Apogee",
    orgSubtitle: "Survey",
    logoText: "A",
    images: ["/feed/campus-1.jpg", "/feed/campus-2.jpg"],
    text: "Quick survey: what should we build next for student-startup collaborations?",
    time: "6h ago",
    category: "Surveys",
  },
  {
    id: 2003,
    orgName: "TechSprint Labs",
    orgSubtitle: "Collaboration",
    logoText: "T",
    images: ["/feed/drone-1.jpg"],
    text: "Looking for frontend engineers to join our next sprint cycle. Apply through SphereNet!",
    time: "1d ago",
    category: "Collaboration",
  },
  {
    id: 2004,
    orgName: "InnovateFest",
    orgSubtitle: "Event",
    logoText: "IF",
    images: ["/feed/campus-1.jpg", "/feed/campus-2.jpg"],
    text: "Join us for the annual startup-university meetup on March 15th at Gachibowli.",
    time: "2d ago",
    category: "Events",
  },
];

// ── Feed filter categories ────────────────────────────────────────

export const feedCategories = [
  "Collaboration",
  "Surveys",
  "Events",
  "Updates",
] as const;

export type FeedCategory = (typeof feedCategories)[number];
