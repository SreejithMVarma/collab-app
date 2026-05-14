export type TaskStatus = "Backlog" | "Todo" | "In Progress" | "Review" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export type ActivityItem = {
  id: number;
  text: string;
  time: string;
};

export type TaskItem = {
  id: number;
  title: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  avatar: string;
};

export type MilestonePriority = "Low" | "Medium" | "High" | "Critical";

export type MilestoneItem = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  owner: string;
  priority: MilestonePriority;
  linkedTaskIds: number[];
};

export type ProjectItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  createdBy: string;
  dueDate: string;
  team: TeamMember[];
  tasks: TaskItem[];
  milestones: MilestoneItem[];
  activity: ActivityItem[];
};

export const projects: ProjectItem[] = [
  {
    id: "sphere-ai-collab",
    title: "Sphere AI Collab",
    tagline: "A collaboration platform for startups and student builders",
    description:
      "This workspace helps teams manage projects, tasks, updates, milestones, and collaboration across product development.",
    category: "Startup Collaboration",
    createdBy: "Rahul",
    dueDate: "2026-03-30",
    team: [
      { id: 1, name: "Rahul", role: "Frontend Developer", avatar: "V" },
      { id: 2, name: "Harshith", role: "Backend Developer", avatar: "H" },
      { id: 3, name: "Divya", role: "UI/UX Designer", avatar: "D" },
    ],
    tasks: [
      {
        id: 1,
        title: "Build onboarding flow",
        assignee: "Rahul",
        priority: "High",
        status: "Done",
        dueDate: "2026-03-14",
      },
      {
        id: 2,
        title: "Design workspace layout",
        assignee: "Divya",
        priority: "High",
        status: "In Progress",
        dueDate: "2026-03-18",
      },
      {
        id: 3,
        title: "Setup project routing",
        assignee: "Rahul",
        priority: "Medium",
        status: "Done",
        dueDate: "2026-03-12",
      },
      {
        id: 4,
        title: "Build task tracker",
        assignee: "Rahul",
        priority: "High",
        status: "Review",
        dueDate: "2026-03-17",
      },
      {
        id: 5,
        title: "Create updates system",
        assignee: "Harshith",
        priority: "Medium",
        status: "Todo",
        dueDate: "2026-03-20",
      },
      {
        id: 6,
        title: "Add milestones section",
        assignee: "Rahul",
        priority: "Medium",
        status: "In Progress",
        dueDate: "2026-03-19",
      },
    ],
    milestones: [
      {
        id: 1,
        title: "Workspace MVP",
        description:
          "Complete the core project workspace with task tracker, updates, milestones, and team visibility.",
        dueDate: "2026-03-20",
        owner: "Rahul",
        priority: "High",
        linkedTaskIds: [1, 3, 4, 6],
      },
      {
        id: 2,
        title: "Collaboration Updates System",
        description:
          "Enable project update posting, activity feed visibility, and smoother team communication inside workspace.",
        dueDate: "2026-03-24",
        owner: "Harshith",
        priority: "Medium",
        linkedTaskIds: [5],
      },
      {
        id: 3,
        title: "UI Polish Phase",
        description:
          "Refine design consistency, layout quality, and professional visual polish for demo readiness.",
        dueDate: "2026-03-28",
        owner: "Divya",
        priority: "Critical",
        linkedTaskIds: [2],
      },
    ],
    activity: [
      {
        id: 1,
        text: "Rahul completed onboarding flow and connected workspace route.",
        time: "2 hours ago",
      },
      {
        id: 2,
        text: "Divya is improving workspace layout design and visual hierarchy.",
        time: "4 hours ago",
      },
      {
        id: 3,
        text: "Harshith planned backend integration for updates system.",
        time: "Today",
      },
    ],
  },

  {
    id: "startup-landing-revamp",
    title: "Startup Landing Page Revamp",
    tagline: "Revamping the startup’s first impression for demo and growth",
    description:
      "This project focuses on redesigning the landing page, improving content hierarchy, polishing visuals, and making the startup pitch clearer and sharper.",
    category: "Design & Frontend",
    createdBy: "Divya",
    dueDate: "2026-04-05",
    team: [
      { id: 1, name: "Divya", role: "UI/UX Designer", avatar: "D" },
      { id: 2, name: "Rahul", role: "Frontend Developer", avatar: "V" },
      { id: 3, name: "Harshith", role: "Backend Support", avatar: "H" },
    ],
    tasks: [
      {
        id: 1,
        title: "Audit current landing sections",
        assignee: "Divya",
        priority: "Medium",
        status: "Done",
        dueDate: "2026-03-16",
      },
      {
        id: 2,
        title: "Create updated hero layout",
        assignee: "Divya",
        priority: "High",
        status: "In Progress",
        dueDate: "2026-03-21",
      },
      {
        id: 3,
        title: "Implement responsive CTA section",
        assignee: "Rahul",
        priority: "High",
        status: "Todo",
        dueDate: "2026-03-23",
      },
      {
        id: 4,
        title: "Optimize typography and spacing",
        assignee: "Rahul",
        priority: "Medium",
        status: "Review",
        dueDate: "2026-03-24",
      },
      {
        id: 5,
        title: "Prepare investor-facing version",
        assignee: "Harshith",
        priority: "Low",
        status: "Backlog",
        dueDate: "2026-03-28",
      },
    ],
    milestones: [
      {
        id: 1,
        title: "Hero Section Revamp",
        description:
          "Redesign and finalize the top section, CTA blocks, and messaging clarity.",
        dueDate: "2026-03-23",
        owner: "Divya",
        priority: "High",
        linkedTaskIds: [1, 2, 3],
      },
      {
        id: 2,
        title: "Polish & QA",
        description:
          "Refine spacing, responsiveness, and final demo visual quality.",
        dueDate: "2026-03-29",
        owner: "Rahul",
        priority: "Medium",
        linkedTaskIds: [4, 5],
      },
    ],
    activity: [
      {
        id: 1,
        text: "Divya finalized direction for the new hero section.",
        time: "1 hour ago",
      },
      {
        id: 2,
        text: "Rahul started responsive implementation for the revised layout.",
        time: "Today",
      },
    ],
  },

  {
    id: "creator-community-app",
    title: "Creator Community Mobile App",
    tagline: "A mobile-first space for creators to connect and collaborate",
    description:
      "This project is about building a community-driven mobile app for creators with profiles, discovery, collaboration rooms, and engagement features.",
    category: "Mobile Product",
    createdBy: "Harshith",
    dueDate: "2026-04-12",
    team: [
      { id: 1, name: "Harshith", role: "Product & Backend", avatar: "H" },
      { id: 2, name: "Rahul", role: "Frontend Developer", avatar: "V" },
      { id: 3, name: "Divya", role: "Mobile UI Designer", avatar: "D" },
    ],
    tasks: [
      {
        id: 1,
        title: "Define app navigation flow",
        assignee: "Divya",
        priority: "High",
        status: "Done",
        dueDate: "2026-03-18",
      },
      {
        id: 2,
        title: "Build community feed UI",
        assignee: "Rahul",
        priority: "High",
        status: "In Progress",
        dueDate: "2026-03-25",
      },
      {
        id: 3,
        title: "Create creator profile module",
        assignee: "Rahul",
        priority: "Medium",
        status: "Todo",
        dueDate: "2026-03-27",
      },
      {
        id: 4,
        title: "Design collaboration room cards",
        assignee: "Divya",
        priority: "Medium",
        status: "Review",
        dueDate: "2026-03-24",
      },
      {
        id: 5,
        title: "Plan notification service",
        assignee: "Harshith",
        priority: "Low",
        status: "Backlog",
        dueDate: "2026-03-30",
      },
    ],
    milestones: [
      {
        id: 1,
        title: "Feed Experience MVP",
        description:
          "Launch the first version of the creator feed, profile preview, and discovery cards.",
        dueDate: "2026-03-28",
        owner: "Rahul",
        priority: "High",
        linkedTaskIds: [1, 2, 3, 4],
      },
      {
        id: 2,
        title: "Platform Communication Layer",
        description:
          "Prepare notification and interaction system for creator engagement.",
        dueDate: "2026-04-02",
        owner: "Harshith",
        priority: "Medium",
        linkedTaskIds: [5],
      },
    ],
    activity: [
      {
        id: 1,
        text: "Navigation flow is approved for the mobile-first experience.",
        time: "3 hours ago",
      },
      {
        id: 2,
        text: "Community feed UI is actively under development.",
        time: "Today",
      },
    ],
  },
  {
    id: "kriya",
    title: "Kriya",
    tagline: "Ground Level Service Network for India.",
    description: "Kriya is a ground-level service network designed to connect rural and semi-urban India with essential services.",
    category: "Service Network",
    createdBy: "Syncreate",
    dueDate: "2026-06-15",
    team: [
      { id: 1, name: "Harshith", role: "Product Manager", avatar: "H" },
      { id: 2, name: "Rahul", role: "Lead Developer", avatar: "R" },
    ],
    tasks: [
      { id: 1, title: "Initial network mapping", assignee: "Harshith", priority: "High", status: "Done", dueDate: "2026-04-10" },
      { id: 2, title: "Onboard early service providers", assignee: "Rahul", priority: "High", status: "In Progress", dueDate: "2026-04-20" },
    ],
    milestones: [
      { id: 1, title: "MVP Launch", description: "Launch the basic service connection framework in select districts.", dueDate: "2026-05-01", owner: "Harshith", priority: "Critical", linkedTaskIds: [1, 2] },
    ],
    activity: [
      { id: 1, text: "Harshith completed initial network mapping.", time: "1 day ago" },
    ],
  },
  {
    id: "printouts-online",
    title: "printouts.online",
    tagline: "Online on-demand print services.",
    description: "A fast, scalable on-demand printing service allowing students and businesses to order prints and get them delivered to their doorstep.",
    category: "E-Commerce",
    createdBy: "Syncreate",
    dueDate: "2026-05-20",
    team: [
      { id: 1, name: "Divya", role: "UI/UX Designer", avatar: "D" },
      { id: 2, name: "Rahul", role: "Frontend Developer", avatar: "R" },
    ],
    tasks: [
      { id: 1, title: "Design storefront UI", assignee: "Divya", priority: "Medium", status: "Done", dueDate: "2026-03-15" },
      { id: 2, title: "Integrate payment gateway", assignee: "Rahul", priority: "High", status: "In Progress", dueDate: "2026-03-22" },
    ],
    milestones: [
      { id: 1, title: "Beta Release", description: "Open print ordering for a limited set of users.", dueDate: "2026-04-01", owner: "Divya", priority: "High", linkedTaskIds: [1, 2] },
    ],
    activity: [
      { id: 1, text: "Divya completed storefront UI design.", time: "2 days ago" },
    ],
  },
  {
    id: "robotic-prosthetics",
    title: "Robotic Prosthetics",
    tagline: "Bio-integrated mobility solution.",
    description: "Developing accessible and advanced bio-integrated robotic prosthetics for amputees using modern sensors and 3D printing.",
    category: "HealthTech",
    createdBy: "Syncreate",
    dueDate: "2026-08-10",
    team: [
      { id: 1, name: "Dr. Smith", role: "Medical Advisor", avatar: "S" },
      { id: 2, name: "Harshith", role: "Hardware Engineer", avatar: "H" },
    ],
    tasks: [
      { id: 1, title: "Sensor calibration", assignee: "Harshith", priority: "High", status: "In Progress", dueDate: "2026-04-12" },
      { id: 2, title: "Clinical safety review", assignee: "Dr. Smith", priority: "High", status: "Todo", dueDate: "2026-05-05" },
    ],
    milestones: [
      { id: 1, title: "Prototype V2 Testing", description: "Complete internal safety tests and sensor calibration.", dueDate: "2026-05-15", owner: "Harshith", priority: "Critical", linkedTaskIds: [1, 2] },
    ],
    activity: [
      { id: 1, text: "Hardware assembly for Prototype V2 completed.", time: "3 days ago" },
    ],
  },
  {
    id: "agritech-drones",
    title: "AgriTech Drones",
    tagline: "Precision agriculture with AI drones.",
    description: "Using AI-powered drones to analyze crop health, optimize watering, and improve agricultural yield precision.",
    category: "AgriTech",
    createdBy: "Syncreate",
    dueDate: "2026-07-25",
    team: [
      { id: 1, name: "Divya", role: "Data Analyst", avatar: "D" },
      { id: 2, name: "Rahul", role: "Drone Pilot/Tester", avatar: "R" },
    ],
    tasks: [
      { id: 1, title: "Flight stability tests", assignee: "Rahul", priority: "High", status: "Done", dueDate: "2026-03-10" },
      { id: 2, title: "Build AI crop analysis model", assignee: "Divya", priority: "High", status: "In Progress", dueDate: "2026-04-18" },
    ],
    milestones: [
      { id: 1, title: "First Field Test", description: "Successfully run an AI analysis flight over a test farm.", dueDate: "2026-04-25", owner: "Rahul", priority: "High", linkedTaskIds: [1, 2] },
    ],
    activity: [
      { id: 1, text: "Rahul finished flight stability testing under windy conditions.", time: "Last week" },
    ],
  }
];