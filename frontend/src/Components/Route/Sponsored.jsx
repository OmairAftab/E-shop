import React from "react";
import styles from "../../Styles/styles";

const Sponsored = () => {
  const sponsors = [
    {
      name: "Sony",
      logo: "https://images.seeklogo.com/logo-png/12/1/sony-logo-png_seeklogo-129420.png",
    },
    {
      name: "Dell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
    },
    {
      name: "LG",
      logo: "https://images.seeklogo.com/logo-png/8/1/lg-electronics-logo-png_seeklogo-83711.png",
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Samsung",
      logo: "https://images.seeklogo.com/logo-png/12/1/samsung-logo-png_seeklogo-122019.png",
    },
  ];

  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 mt-8 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full flex-wrap gap-6">
        {sponsors.map((sponsor, index) => (
          <div className="flex items-center" key={index}>
            <img
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              className="w-[120px] md:w-[150px] object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsored;