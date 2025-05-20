// src\webComponents\WebLayout.tsx

import  WebHeader  from "@/webComponents/WebHeader";
import  WebFooter  from "@/webComponents/WebFooter";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="web-layout">
      <WebHeader />
      <main>{children}</main>
      <WebFooter />
    </div>
  );
}

