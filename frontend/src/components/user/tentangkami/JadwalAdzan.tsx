// src/components/JadwalAdzan.tsx

const jadwal = [
  { waktu: "Subuh", jam: "04.15" },
  { waktu: "Zuhur", jam: "11.30" },
  { waktu: "Ashar", jam: "15.10" },
  { waktu: "Maghrib", jam: "17.45" },
  { waktu: "Isya", jam: "18.55" },
];

export default function JadwalAdzan() {
  return (
    <section className="bg-black text-white py-10 px-6 lg:px-24 flex flex-col items-center">
      <div className="w-full max-w-md bg-[#e7e0d1] text-black rounded-lg shadow-lg overflow-hidden">
        <div className="text-center font-bold py-3 border-b border-gray-300 text-orange-600">
          JADWAL ADZAN
        </div>
        <table className="w-full">
          <tbody>
            {jadwal.map((item) => (
              <tr key={item.waktu} className="border-b border-gray-200">
                <td className="py-2 px-4">{item.waktu}</td>
                <td className="py-2 px-4 text-right">{item.jam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
