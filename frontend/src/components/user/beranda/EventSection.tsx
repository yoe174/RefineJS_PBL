import Image from "next/image";

const eventsData = [
  {
    title: "Rapat pengurus masjid",
    description:
      "Karnaval tahun ini tidak hanya sekedar parade kostum indah tetapi juga sebuah perayaan keberagaman budaya dan kreativitas lokal.",
    image: "/image/rapatmasjid.jpg", // Ganti dengan path gambar
    link: "#",
  },
  {
    title: "Pengajian",
    description:
      "Kegiatan pengajian ini tidak hanya dilaksanakan di awal Ramadhan namun dilaksanakan secara berkesinambungan.",
    image: "/image/pengajian.jpg", // Ganti dengan path gambar
    link: "#",
  },
  {
    title: "Kerja Bakti",
    description:
      "Pada hari Sabtu pagi yang cerah, lebih dari 200 warga berkumpul di lapangan desa untuk mengambil bagian dalam kerja bakti.",
    image: "/image/kerjabakti.jpg", // Ganti dengan path gambar
    link: "#",
  },
  {
    title: "Galang Dana",
    description:
      "Kegiatan pengajian ini tidak hanya dilaksanakan di awal Ramadhan namun dilaksanakan secara berkesinambungan.",
    image: "/image/galangdana.jpg", // Ganti dengan path gambar
    link: "#",
  },
];

const EventsSection = () => {
  return (
    <section className="py-12 px-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-black">Berita Acara</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {eventsData.map((events, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={events.image}
              alt={events.title}
              width={300}
              height={200}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black">{events.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{events.description}</p>
              <a href={events.link} className="text-red-500 font-medium mt-4 block">
                Lihat Selengkapnya
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
