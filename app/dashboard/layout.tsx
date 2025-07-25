// app/dashboard/layout.tsx
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* put your dashboard header/sidebar here */}
      {children}
    </div>
  );
}
