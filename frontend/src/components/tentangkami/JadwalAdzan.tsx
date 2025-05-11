export const JadwalAdzanSection = () => (
    <div className="bg-black text-white rounded-xl overflow-hidden shadow">
      <div className="bg-gray-100 text-black p-4 font-semibold text-center">
        JADWAL ADZAN
      </div>
      <table className="w-full text-center table-auto">
        <tbody className="text-white">
          <tr className="border-b border-gray-700"><td className="py-2">Subuh</td><td>04.15</td></tr>
          <tr className="border-b border-gray-700"><td className="py-2">Zuhur</td><td>11.30</td></tr>
          <tr className="border-b border-gray-700"><td className="py-2">Ashar</td><td>15.10</td></tr>
          <tr className="border-b border-gray-700"><td className="py-2">Maghrib</td><td>17.45</td></tr>
          <tr><td className="py-2">Isya</td><td>18.55</td></tr>
        </tbody>
      </table>
      <div className="text-center text-sm py-3 text-gray-400">
        © 2025 Tempat Ibadah
      </div>
    </div>
  );
  