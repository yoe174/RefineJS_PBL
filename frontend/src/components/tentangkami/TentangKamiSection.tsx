import Image from "next/image";
import Masjid from "@/assets/images/masjidhero.jpg";
import Masjid1 from "@/assets/images/masjidhd2.jpg";

export const TentangKamiSection = () => (
  <div className="relative mb-20">
    {/* Background Blur */}
    <div className="absolute inset-0 z-0">
      <Image
        src={Masjid}
        alt="Background Masjid"
        layout="fill"
        objectFit="cover"
        className="blur-sm opacity-30"
      />
    </div>

    {/* Content */}
    <div className="relative z-10 grid md:grid-cols-2 gap-8 bg-white/80 backdrop-blur p-6 rounded-xl">
      <div className="flex justify-center items-center">
        <Image src={Masjid1} alt="Masjid" className="rounded-xl w-full h-auto" />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-black">Tentang Kami</h2>
        <p className="text-gray-700 leading-relaxed">
          Masjid Al-Ikhlash merupakan sebuah Masjid sederhana yang dibangun di atas
          lahan fasilitas umum (fasum) di Perumahan Vila Mutiara Cikarang Blok A.
          Bangunan Masjid seluas ± 210 m² mulai dibangun pada tahun 2003 melalui
          sumbangan tanah fasum dari pengembang dan dana swadaya masyarakat.
        </p>
      </div>
    </div>
  </div>
);
