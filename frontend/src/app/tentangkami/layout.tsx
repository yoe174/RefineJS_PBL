import "./globals.css";
import Navbar from "@/components/tentangkami/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-900">
        {/* Navbar di atas */}
        <Navbar />
        
        {/* Wrapper untuk konten agar tidak tertutup Navbar */}
        <main className="pt-16 container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
