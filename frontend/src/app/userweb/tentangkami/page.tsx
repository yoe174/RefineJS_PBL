
import HeroTentangKami from "@/components/user/tentangkami/HeroTentangKami";
import InfaqSection from "@/components/user/tentangkami/InfaqSection";
import JadwalAdzan from "@/components/user/tentangkami/JadwalAdzan";
import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";

export default function TentangKamiPage() {
  return (
    <div>
      <HeroTentangKami />
      <InfaqSection />
      <JadwalAdzan />
      <Footer />
      <Navbar />
    </div>
  );
}
