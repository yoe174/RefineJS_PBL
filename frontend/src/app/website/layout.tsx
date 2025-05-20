// src\app\webiste\layout.tsx
import "../globals.css";
import WebLayout from "../../webComponents/WebLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WebLayout>
          {children}
        </WebLayout>
      </body>
    </html>
  );
}
// export const metadata = {
//   title: "Website",
//   description: "Public-facing page",
// };

// export default function WebsiteLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="id">
//       <body>
//         <WebLayout>{children}</WebLayout>
//       </body>
//     </html>
//   );
// }
