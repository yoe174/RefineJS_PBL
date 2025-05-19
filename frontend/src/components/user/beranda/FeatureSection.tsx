import { FaMosque } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { AiOutlineCalendar } from "react-icons/ai";

const FeatureSection = () => {
  return (
    <section className="bg-black-600 text-white py-12">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Ikon Tempat Ibadah */}
        <div>
          <FaMosque className="mx-auto text-6xl text-yellow-500" />
          <h3 className="text-lg font-bold mt-4 text-yellow-500">TEMPAT IBADAH</h3>
          <p className="mt-2 text-sm">
            Tempat Ibadah Layanan shalat berjamaah wajib dibuka selama waktu-waktu shalat. 
            Adapun pelaksanaan shalat sunat berjamaah semisal shalat tarawih, shalat Id, shalat gerhana dan juga shalat jenazah.
          </p>
        </div>

        {/* Ikon Pendidikan */}
        <div>
          <IoBookOutline className="mx-auto text-6xl text-yellow-500" />
          <h3 className="text-lg font-bold mt-4 text-yellow-500">PENDIDIKAN</h3>
          <p className="mt-2 text-sm">
            Kajian dan pendidikan agama tersedia untuk anak-anak dan dewasa, termasuk kelas mengaji dan ceramah rutin.
          </p>
        </div>

        {/* Ikon Kegiatan Sosial */}
        <div>
          <AiOutlineCalendar className="mx-auto text-6xl text-yellow-500" />
          <h3 className="text-lg font-bold mt-4 text-yellow-500">KEGIATAN SOSIAL</h3>
          <p className="mt-2 text-sm">
            Kegiatan sosial dan bantuan kemanusiaan seperti zakat, infak, sedekah, dan bakti sosial untuk masyarakat sekitar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
