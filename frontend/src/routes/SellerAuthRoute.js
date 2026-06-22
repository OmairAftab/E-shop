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
    // navigate to the seller's shop home if we have an id, otherwise to a generic shop route
    const shopId = seller?._id || seller?.id;
    return <Navigate to={shopId ? `/shop/${shopId}` : `/shop`} replace />;
  }

  return children;
};

export default SellerAuthRoute;
