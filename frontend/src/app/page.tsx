// "use client";

// import { Suspense } from "react";

// import { Authenticated } from "@refinedev/core";
// import { NavigateToResource } from "@refinedev/nextjs-router";

// export default function IndexPage() {
//   return (
//     <Suspense>
//       <Authenticated key="home-page">
//         <NavigateToResource />
//       </Authenticated>
//     </Suspense>
//   );
// }

// src/app/page.tsx atau src/pages/index.tsx (Next.js 13+ atau versi sebelumnya)
"use client";

// import { Header, ThemedLayoutV2 } from "@refinedev/antd";
// import { Typography } from "antd";
// import { HomeOutlined } from "@ant-design/icons";

// export default function HomePage({ children }: React.PropsWithChildren) {
//   return (
//     <ThemedLayoutV2 Header={Header}
//     //   siderProps={{
//     //     defaultOpenKeys: ["dashboard"],
//     //   }}
//     >{children}
//       <Typography.Title level={2} style={{ margin: "20px 0" }}>
//         <HomeOutlined /> Selamat Datang di Dashboard!
//       </Typography.Title>
//       <Typography.Paragraph>
//         Ini adalah halaman beranda dari aplikasi Anda. Silakan pilih menu di sebelah kiri untuk mulai menggunakan fitur.
//       </Typography.Paragraph>
//     </ThemedLayoutV2>
//   );
// }

// app/page.tsx
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/home");
}

