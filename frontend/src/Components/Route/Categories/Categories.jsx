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
                <div className="text-white text-2xl">{i.icon}</div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">{i.title}</h3>
                  <p className="text-xs md:text-sm opacity-90">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      
    </>
  )
}

export default Categories