import React from "react";

const HeroSection = () => {
  return (
    <section className="top-0 left-0 w-full h-screen overflow-hidden z-0">
      {/* Gambar Latar Belakang */}
      <img
        src="/image/masjidhd2.jpg"
        alt="Masjid Background"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Overlay Gelap dan Konten */}
      <div className="absolute inset-0 bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-amber-400">
          ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-black">
          Selamat Datang di Masjid Al Ikhlas Vila Mutiara Cikarang. Masjid yang pertama
          dibangun tahun 2003 dan mengalami renovasi total pada tahun 2018 yang
          berlokasi di Jl. Anggrek Vila Mutiara Cikarang, Cikarang Selatan, Bekasi.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
