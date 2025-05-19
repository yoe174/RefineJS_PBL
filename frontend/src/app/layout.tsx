// src/app/layout.tsx
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Layout minimal untuk root (misal redirect)
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}