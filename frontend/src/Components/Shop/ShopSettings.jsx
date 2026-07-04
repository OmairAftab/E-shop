import React from 'react'
import axios from 'axios'
import { server } from '../../server.js'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineCamera } from 'react-icons/ai'
import { backend_url } from '../../server.js'
import { loadSeller } from "../../redux/actions/user";
import { useDispatch } from 'react-redux'
import styles from "../../Styles/styles.js"
import { useEffect } from 'react'

const ShopSettings = () => {

    const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();







// Function to handle avatar change
  const handleAvatarChange = async (e) => {
    try{
      const file=e.target.files[0];
      setAvatar(file);

      const formData=new FormData();

      formData.append("image", file);

      await axios.put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
      },
        withCredentials: true,
      })
      .then((res)=>{
        window.location.reload();
        toast.success("Avatar updated successfully!");
        
      })
      .catch(err=>{
        toast.error(err.response.data.message);
      })
    }
    catch(err){
      toast.error(err.message);
    }
  }









const updateHandler = async (e) => {
    e.preventDefault();


    await axios
      .put(
        `${server}/shop/update-shop-info`,
        {
          name,
          description,
          address,
          phoneNumber,
          zipCode,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };






  return (
    <div>
         <div className="flex justify-center w-full">
                    <div className="relative mt-5">
                      <img
                        src={  
        // if the URL starts with "http" or "data:", use it directly; otherwise, prepend backend_url because it contains extra slash and then slice it off to avoid double slashes because baeckend_url = http:localhost:8000/ and user.avatar.url = /uploads/avatar.jpg, so we need to remove the leading slash from user.avatar.url to avoid double slashes in the final URL as `${backend_url}${user.avatar.url}` will become something like http://localhost:8000//uploads/avatar.jpg which is incorrect, so we use slice(1) to remove the leading slash from user.avatar.url to make it http://localhost:8000/uploads/avatar.jpg which is correct and will load the image properly.                 
                          seller && seller.avatar && seller.avatar.url
                            ? (seller.avatar.url.startsWith("http") || seller.avatar.url.startsWith("data:")
                                ? seller.avatar.url                                               
                                : `${backend_url}${seller.avatar.url.startsWith("/") ? seller.avatar.url.slice(1) : seller.avatar.url}`) 
                            : 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                        className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                        alt={seller && seller.name ? seller.name : 'Profile'}
                      />
        
                      <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                         
                          <input
                            type="file"
                            className="hidden"
                            id="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                          />
                          <label htmlFor="avatar">
        
                            <AiOutlineCamera />
                          </label>
                      </div>
                    </div>
                  </div>



                 {/* shop info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] cursor-pointer flex items-center flex-col 800px:w-[50%] mt-5 mb-5">
            <input
              type="submit"
              value="Update Shop"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              readOnly
              border-2
            
            />
          </div>
        </form>
        
    </div>
  )
}

export default ShopSettings