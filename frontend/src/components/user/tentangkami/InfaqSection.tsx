// src/components/InfaqSection.tsx
import Image from "next/image";
import bsiLogo from "@/assets/images/bsilogo.jpg"; // Ganti dengan path gambar logo BSI

export default function InfaqSection() {
  return (
    <section className="bg-[#e7e0d1] px-6 py-10 lg:px-24 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
      <div>
        <p className="text-yellow-700 font-semibold text-lg mb-4">
          Tunaikan INFAQ terbaik anda, melalui transfer berikut
        </p>
        <h3 className="text-black font-bold text-xl">BANK SYARIAH INDONESIA</h3>
        <p className="font-semibold">No. Rekening : 27-272-2727</p>
        <p className="font-semibold">A/N : MASJID AL IMAM</p>
      </div>
      <div className="flex justify-center md:justify-end">
        <Image src={bsiLogo} alt="BSI" className="h-24 w-auto object-contain" />
      </div>
    </section>
  );
}
