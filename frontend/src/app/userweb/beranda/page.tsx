
import HeroSection from "@/components/user/beranda/HeroSection";
import EventSection from "@/components/user/beranda/EventSection";
import JadwalAdzan from "@/components/user/beranda/JadwalAdzan";
import FeatureSection from "@/components/user/beranda/FeatureSection";
import MapSection from "@/components/user/beranda/MapSection";
import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";

export default function TentangKamiPage() {
  return (
    <div>
      <HeroSection />
      <EventSection />
      <FeatureSection />
      <JadwalAdzan />
      <MapSection />
      <Footer />
      <Navbar />
    </div>
  );
}
