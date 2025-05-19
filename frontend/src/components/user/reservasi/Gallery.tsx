'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const images = [
  { src: '/image/masjidhd.jpg', title: 'Masjid Raya' },
  { src: '/image/masjidhd2.jpg', title: 'Musola Al-Falah' },
  { src: '/image/masjid1.jpg', title: 'Mimbar Utama' }
];

const Gallery = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden m-0 p-0">
      <Image
        src={images[current].src}
        alt={images[current].title}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded">
        <h2 className="text-xl font-semibold">{images[current].title}</h2>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2"
      >
        →
      </button>
    </div>
  );
};

export default Gallery;
