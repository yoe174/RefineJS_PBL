
import Image from "next/image";
import masjidImg from "@/assets/images/masjidhero.jpg"; // Ganti dengan path gambar kamu

export default function HeroTentangKami() {
  return (
    <section className="bg-black text-white py-10 px-6 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Image src={masjidImg} alt="Masjid" className="w-full h-auto object-cover" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Tentang Kami</h2>
        <p className="text-lg leading-relaxed">
          Masjid Al-Ikhlash merupakan sebuah Masjid sederhana yang dibangun di atas lahan fasilitas umum (fasum)
          di Perumahan Vila Mutiara Cikarang Blok A. Bangunan Masjid seluas ± 210 m2 mulai dibangun pada tahun 2003
          melalui sumbangan tanah fasum dari pengembang dan dana swadaya masyarakat.
        </p>
      </div>
    </section>
  );
}
