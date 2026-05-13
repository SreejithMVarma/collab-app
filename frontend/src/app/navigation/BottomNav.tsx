"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Compass, CalendarDays, CircleUserRound } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  match?: string[];
};

const baseNavItems: NavItem[] = [
  {
    label: "Home",
    href: "/home",
    icon: Home,
    match: ["/home"],
  },
  {
    label: "Offerings",
    href: "/offerings",
    icon: Briefcase,
    match: ["/offerings"],
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Compass,
    match: ["/explore"],
  },
  {
    label: "Events",
    href: "/events",
    icon: CalendarDays,
    match: ["/events"],
  },
  {
    label: "Profile",
    href: "/profile",
    icon: CircleUserRound,
    match: ["/profile"],
  },
];

function deriveRoutePrefix(pathname: string): string {
  if (pathname.startsWith("/startup")) return "/startup";
  return "";
}

function isItemActive(pathname: string, item: NavItem) {
  if (!pathname) return false;
  if (pathname === item.href) return true;
  if (item.match?.length) {
    return item.match.some((route) => pathname.startsWith(route));
  }
  return false;
}

export default function BottomNav() {
  const pathname = usePathname();
  const prefix = deriveRoutePrefix(pathname);

  const navItems = baseNavItems.map((item) => ({
    ...item,
    href: `${prefix}${item.href}`,
    match: item.match?.map((route) => `${prefix}${route}`),
  }));

  return (
    <nav className="sync-bottom-nav" aria-label="Bottom Navigation">
      <div className="sync-bottom-nav__inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(pathname, item);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`sync-bottom-nav__item ${active ? "is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="sync-bottom-nav__icon-wrap">
                <Icon className="sync-bottom-nav__icon" />
              </span>
              <span className="sync-bottom-nav__label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}