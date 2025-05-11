import Image from "next/image";
import BSI from "@/assets/images/masjid1.jpg";

export const InfaqSection = () => (
  <div className="bg-gray-100 rounded-lg p-6 mb-16 flex flex-col md:flex-row justify-between items-center gap-8 shadow">
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-yellow-700 mb-2">
        Tunaikan INFAQ terbaik anda, melalui transfer berikut
      </h3>
      <p className="font-bold text-black">
        BANK SYARIAH INDONESIA<br />
        No. Rekening : 27-272-2727<br />
        A/N : MASJID AL IMAM
      </p>
    </div>
    <div className="w-40">
      <Image src={BSI} alt="BSI Logo" />
    </div>
  </div>
);
