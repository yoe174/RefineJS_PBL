import { Header } from "@components/header";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  // Memeriksa apakah pengguna sudah terautentikasi
  if (!data.authenticated) {
    return redirect(data?.redirectTo || "/login");
  }

  // Memeriksa apakah pengguna memiliki role yang sesuai
//   if (!data.hasRequiredRole) {
//     return redirect("/403"); // Redirect ke halaman Forbidden jika role tidak cocok
//   }

  // Jika pengguna terautentikasi dan memiliki role yang sesuai, tampilkan layout
  return <ThemedLayoutV2 Header={Header}>{children}</ThemedLayoutV2>;
}

async function getData() {
//   const { authenticated, redirectTo, role } = await authProviderServer.check();
  const { authenticated, redirectTo } = await authProviderServer.check();

  // Cek apakah pengguna memiliki role yang sesuai (misalnya "admin" atau "user")
  const requiredRole = "admin"; // Atur role yang diperlukan di sini
//   const hasRequiredRole = role === requiredRole;

  return {
    authenticated,
    redirectTo,
    // hasRequiredRole,
  };
}
