"use client";

import { Header, ThemedLayoutV2 } from "@refinedev/antd";
import { Typography } from "antd";
// import { HomeOutlined } from "@ant-design/icons";

export default function HomePage({ children }: React.PropsWithChildren) {
  return (
    // <ThemedLayoutV2 Header={Header}
    // //   siderProps={{
    // //     defaultOpenKeys: ["dashboard"],
    // //   }}
    // >{children}
    
    // </ThemedLayoutV2>
  <>
<Typography.Title level={2} style={{ margin: "20px 0" }}>
 HAlo
 </Typography.Title>
 <Typography.Paragraph>
  Ini adalah halaman beranda dari aplikasi Anda. Silakan pilih menu di sebelah kiri untuk mulai menggunakan fitur.
 </Typography.Paragraph>
  </>
  );
}
