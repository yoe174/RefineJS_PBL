import Link from 'next/link';
import React from 'react';

const ReservasiSection = () => {
  return (
    <section className="bg-black text-white py-16 px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <div className="flex items-center gap-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-check-fill" viewBox="0 0 16 16">
            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
        </svg>
          <h2 className="text-xl font-bold">RESERVASI</h2>
        </div>
        <p>
          Kami menyediakan layanan reservasi Masjid untuk keperluan bersama dan tidak merugikan pihak manapun seperti acara akad, pengajian, buka bersama,
          dan lain-lain yang masih berkaitan dengan kegiatan keagamaan.
        </p>
      </div>
      <div className="text-center">
        <p className="mb-4 text-lg">Anda berminat untuk reservasi?</p>
        <Link
          href="/reservasi"
          className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-500 transition duration-300"
        >
          Klik disini untuk mengajukan
        </Link>
      </div>
    </section>
  );
};

export default ReservasiSection;
