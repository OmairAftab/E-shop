import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server, backend_url } from '../../server.js'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../Styles/styles.js'
import { logoutSeller } from '../../redux/actions/user.js'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useEffect , useState} from 'react'
import { getAllProductsShop } from '../../redux/actions/product.js'
import { getAllEventsShop } from '../../redux/actions/event.js'
import axios from 'axios'


const ShopInfo = ({isOwner}) => {
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({});

  const { id } = useParams();
    useEffect(() => {
    if (!id) return;

        axios.get(`${server}/shop/get-shop-info/${id}`, {
            withCredentials: true
        }).then((res) => {
          console.log(res);
          console.log("Fetched shop info:", res.data.shop);
            setData(res.data.shop);
        }).catch((error) => {
            console.error("Error fetching shop info:", error);
        });
  }, [id]);

  const shop = data?._id ? data : seller;

    const logoutHandler = async () => {
        try {
          const res = await dispatch(logoutSeller());
          navigate('/shop-login');
          toast.success(res?.message || 'Log out successful!');
        } catch (error) {
          toast.error(error.response?.data?.message || error.message || 'Logout failed');
        }
    }
    

    // THIS IS THE COMPONENT WHICH IS CALLED IN THE SHOP HOMEPAGE AND IT DISPLAYS THE SHOP INFO LIKE ITS AVATAR, NAME, DESCRIPTION,
    // ADDRESS, PHONE NUMBER, TOTAL PRODUCTS, RATINGS, JOINED DATE AND ALSO PROVIDES THE OPTION TO EDIT SHOP OR LOGOUT ONLY
    // IF THE USER IS THE OWNER OF THE SHOP.
    // THIS COMPONENT IS PRESENT ON THE LEFT SIDE OF THE SHOP HOMEPAGE
    return (
      <div>
        <div className="w-full py-5">

          <div className="w-full flex item-center justify-center">
            <img
              src={(() => {
                  const url = shop.avatar?.url;
                  if (!url) return "/logo192.png";
                  if (url.startsWith("http") || url.startsWith("data:")) return url;
                  return `${backend_url}${url.startsWith("/") ? url.slice(1) : url}`;
                  })()}
                  alt={shop.name || "Seller"}                
                  className="w-[150px] h-[150px] object-cover rounded-full"
            />
          </div>

          <h3 className="text-center py-2 text-[20px]">{shop.name}</h3>

          <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
            {shop.description}
          </p>

        </div>

        <div className="p-3">
          <h5 className="font-[600]">Address</h5>
          <h4 className="text-[#000000a6]">{shop.address}</h4>
        </div>

        <div className="p-3">
          <h5 className="font-[600]">Phone Number</h5>
          <h4 className="text-[#000000a6]">{shop.phoneNumber}</h4>
        </div>

        <div className="p-3">
          <h5 className="font-[600]">Total Products</h5>
          <h4 className="text-[#000000a6]"> 10 </h4>
        </div>

        <div className="p-3">
          <h5 className="font-[600]">Shop Ratings</h5>
          <h4 className="text-[#000000b0]">4/5</h4>
        </div>

        <div className="p-3">
          <h5 className="font-[600]">Joined On</h5>
          <h4 className="text-[#000000b0]">{shop?.createdAt?.slice(0, 10)}</h4>
        </div>

        {isOwner && (
          <div className="py-3 px-4">
             <Link to="/settings">
             <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
              <span className="text-white">Edit Shop</span>
            </div>
             </Link>
            <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            onClick={logoutHandler}
            >
              <span className="text-white">Log Out</span>
            </div>
          </div>
        )}

      </div>
    )
}

export default ShopInfo