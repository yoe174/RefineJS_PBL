import React from "react";

const MapSection = () => {
  return (
    <div className="w-full h-[450px]">
      <iframe
        title="Masjid Raya An-Nur Polinema"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4882329125844!2d112.61358807476778!3d-7.94839199207592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827469d7df27%3A0xc32a10655201d6b4!2sMasjid%20Raya%20An-Nur%20Politeknik%20Negeri%20Malang!5e0!3m2!1sen!2sid!4v1744613385538!5m2!1sen!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapSection;

