import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "../../Assets/loading.json"; // Make sure to import your loading animation JSON file

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation, 
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default Loader;