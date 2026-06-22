import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Components/Layout/Loader";

const SellerAuthRoute = ({ children }) => {
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);

  if (isLoading === true) {
    return <Loader />;
  }

  // If seller is logged in, redirect them away from the login page
  if (isSeller) {
    
    return <Navigate to={`/dashboard`} replace />;
  }

  return children;
};

export default SellerAuthRoute;
