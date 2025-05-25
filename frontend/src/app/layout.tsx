"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Refine } from "@refinedev/core";
// import routerProvider from "@refinedev/nextjs-router";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="id">
      <body>
        <QueryClientProvider client={queryClient}
        >
          {children}
          {/* <Refine
            routerProvider={routerProvider}
            resources={[]}
            options={{ syncWithLocation: true, useNewQueryKeys: true }}
          >
            {children}
          </Refine> */}
        </QueryClientProvider>
      </body>
    </html>
  );
}
