"use client";

import "@/global.css";
import React, { ReactNode, Suspense } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ColorModeContextProvider } from "@contexts/color-mode";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Suspense>
          <AntdRegistry>
            <ColorModeContextProvider defaultMode="light">
              <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={dehydrate(queryClient)}>
                  <Navbar />
                  <main className="min-h-screen">{children}</main>
                  <Footer />
                  <ReactQueryDevtools initialIsOpen={false} />
                </HydrationBoundary>
              </QueryClientProvider>
            </ColorModeContextProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
