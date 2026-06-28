import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Components/Layout/Loader";

const SellerRedirectRoute = ({ children }) => {
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);

  if (isLoading === true) {
    return <Loader />;
  }

  if (isSeller) {
    return <Navigate to={`/shop/${seller?._id}`} replace />;
  }

  return children;
};

export default SellerRedirectRoute;
