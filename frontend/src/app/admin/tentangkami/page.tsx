import  Navbar from "@/components/tentangkami/Navbar";
import { TentangKamiSection } from "@/components/tentangkami/TentangKamiSection";
import { InfaqSection } from "@/components/tentangkami/InfaqSection";
import { JadwalAdzanSection } from "@/components/tentangkami/JadwalAdzan";
import  Footer from "@/components/tentangkami/Footer";

export default function TentangKamiPage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <TentangKamiSection />
        <Navbar/>
        <InfaqSection />
        <JadwalAdzanSection />
        <Footer/>
      </div>
    </div>
  );
}
