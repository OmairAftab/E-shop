import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../Static/data";
import styles from "../../../Styles/styles";

const Categories = () => {
     const navigate = useNavigate();
  return (
    <>

         {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className="branding my-12 flex justify-between w-full bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-xl shadow-lg text-white"
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start space-x-3" key={index}>
                <div >{i.icon}</div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">{i.title}</h3>
                  <p className="text-xs md:text-sm opacity-90">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>




  {/* Categories Grid */}
      <div
        className={`${styles.section} bg-white p-6 rounded-xl mb-12 shadow-md`}
        id="categories"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Shop by Categories
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = () => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  key={i.id}
                  onClick={handleSubmit}
                  className="w-full h-[140px] flex flex-col items-center justify-center cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-100 hover:border-blue-500 group"
                >
                  <img
                    src={i.image_Url}
                    className="w-[90px] h-[70px] object-contain mb-3 group-hover:scale-105 transition"
                    alt={i.title}
                  />
                  <h5 className="text-base font-medium text-gray-800 group-hover:text-blue-600">
                    {i.title}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;