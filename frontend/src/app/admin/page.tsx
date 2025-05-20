// app/admin/page.tsx

import { redirect } from "next/navigation";
import { prefixAdminPath } from "@utils/resourceWithPrefix";

export default function Page() {
  redirect(prefixAdminPath("/home"));
}

