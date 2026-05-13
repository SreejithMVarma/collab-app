"use client";

import { useEffect, useState } from "react";

interface MobileDeviceFrameProps {
  children: React.ReactNode;
}

export default function MobileDeviceFrame({ children }: MobileDeviceFrameProps) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="device-frame-outer">
      <div className="device-bezel">
        {/* Status bar */}
        <div className="device-status-bar">
          <span className="device-status-time">9:41</span>
          <div className="device-camera" />
          <div className="device-status-icons">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="white"><path d="M1 8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-3zm4-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-5zm4-2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V4zm4-3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v10.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V1z"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><path d="M8 2.5a8.5 8.5 0 0 1 6.07 2.53.5.5 0 0 1-.71.7A7.5 7.5 0 0 0 8 3.5a7.5 7.5 0 0 0-5.36 2.23.5.5 0 1 1-.71-.7A8.5 8.5 0 0 1 8 2.5zm0 3a5.5 5.5 0 0 1 3.89 1.62.5.5 0 0 1-.71.7A4.5 4.5 0 0 0 8 6.5a4.5 4.5 0 0 0-3.18 1.32.5.5 0 1 1-.71-.7A5.5 5.5 0 0 1 8 5.5zm0 3a2.5 2.5 0 0 1 1.77.73.5.5 0 0 1-.71.71A1.5 1.5 0 0 0 8 9.5a1.5 1.5 0 0 0-1.06.44.5.5 0 0 1-.71-.71A2.5 2.5 0 0 1 8 8.5z"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="white"><rect x="0" y="1" width="21" height="10" rx="2" ry="2" stroke="white" strokeWidth="1" fill="none"/><rect x="1.5" y="2.5" width="16" height="7" rx="1" fill="white"/><rect x="22" y="4" width="2" height="4" rx="1" fill="white" opacity="0.4"/></svg>
          </div>
        </div>
        {/* Screen */}
        <div className="device-screen">
          {children}
        </div>
        {/* Home indicator */}
        <div className="device-home-indicator">
          <div className="device-home-bar" />
        </div>
      </div>
    </div>
  );
}
