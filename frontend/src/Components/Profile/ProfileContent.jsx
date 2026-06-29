import React from 'react'
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { AiOutlineCamera } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../Styles/styles';
// import { getAllOrdersOfUser } from '../../redux/actions/order.js';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { AiOutlineArrowRight } from 'react-icons/ai';
import {DataGrid} from "@mui/x-data-grid";
// import { DataGrid } from "@material-ui/data-grid";
import { MdTrackChanges } from 'react-icons/md';
import { Country, State } from "country-state-city";
import { toast } from 'react-toastify';
import { updatUserAddress, deleteUserAddress } from '../../redux/actions/user.js';
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineDelete } from 'react-icons/ai';
import { updateUserInformation } from '../../redux/actions/user.js';
import { useEffect } from 'react';
import {server} from '../../server.js';
import axios from 'axios';



const ProfileContent = ({active}) => {

  const {user, error, success} = useSelector((state) => state.user);

  console.log(user);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();



  // Sync user data to local state when user changes or loads
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);





  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (success) {
      toast.success("Profile updated successfully!");
      setPassword(""); // Clear password field after successful update
      dispatch({ type: "clearErrors" });
    }
  }, [error, success, dispatch]);




  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  }



  const handleAvatarChange = async (e) => {
    try{
      const file=e.target.files[0];
      setAvatar(file);

      const formData=new FormData();

      formData.append("image", file);

      await axios.put(`${server}/user/update-avatar`, formData, {
        headers: {
        "Content-Type": "multipart/form-data",
      },
        withCredentials: true,
      })
      .then((res)=>{
        toast.success("Avatar updated successfully!");
        window.location.reload();
      })
      .catch(err=>{
        toast.error(err.response.data.message);
      })
    }
    catch(err){
      toast.error(err.message);
    }
  }


  return (
    <div className="w-full">
      {
 //WHEN ACTIVE IS 1, SHOW THE PROFILE CONTENT AS WE MADE IN PROFILE SIDEBAR THAT ACTIVE ===1 WHEN PROFILE TAB IS OPENED
        active ===1 && (
          
          <>
           <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={  
// if the URL starts with "http" or "data:", use it directly; otherwise, prepend backend_url because it contains extra slash and then slice it off to avoid double slashes because baeckend_url = http:localhost:8000/ and user.avatar.url = /uploads/avatar.jpg, so we need to remove the leading slash from user.avatar.url to avoid double slashes in the final URL as `${backend_url}${user.avatar.url}` will become something like http://localhost:8000//uploads/avatar.jpg which is incorrect, so we use slice(1) to remove the leading slash from user.avatar.url to make it http://localhost:8000/uploads/avatar.jpg which is correct and will load the image properly.                 
                  user && user.avatar && user.avatar.url
                    ? (user.avatar.url.startsWith("http") || user.avatar.url.startsWith("data:")
                        ? user.avatar.url                                               
                        : `${backend_url}${user.avatar.url.startsWith("/") ? user.avatar.url.slice(1) : user.avatar.url}`) 
                    : 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt={user && user.name ? user.name : 'Profile'}
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




                {/* NOW START THE FORM */}
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px]  h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>

          </>
        ) 
      }




 {/* WHEN ACTIVE IS 2, SHOW THE ORDERS TAB AS WE MADE IN PROFILE SECTION SIDEBAR THAT WHEN ACTIVE === 2 THEN SHOW ORDERS TAB */}

  {active === 2 && (
        <div>
          <AllOrders />   {/* This component is created below*/}
        </div>
      )}




  {/* WHEN ACTIVE IS 3, SHOW THE REFUND ORDERS TAB  */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}



  {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}


  {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    

  



    </div>
  )
}
















const AllOrders = () => {


   const { user } = useSelector((state) => state.user);
  // const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllOrdersOfUser(user._id));
  // }, []);


  //imagine we have orders in the backend and we are fetching them, but for now we will hardcode them to show how it works, we will replace this with actual orders from backend later on when we have the backend ready
  const orders=[
    {
      _id: "123456789",
      orderItems: [
        {
          name: "Iphone 11",
        },
      ],
        totalPrice: 50000,
        orderStatus: "Delivered",
    },
  ];

  const columns = [
    { field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7 
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row && params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <button>
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

   orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className='pl-8 pt-1'>
       <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />

    </div>
  )
}

















const AllRefundOrders = () => {


   const { user } = useSelector((state) => state.user);
  // const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllOrdersOfUser(user._id));
  // }, []);


  //imagine we have orders in the backend and we are fetching them, but for now we will hardcode them to show how it works, we will replace this with actual orders from backend later on when we have the backend ready
  const orders=[
    {
      _id: "123456789",
      orderItems: [
        {
          name: "Iphone 11",
        },
      ],
        totalPrice: 50000,
        orderStatus: "Delivered",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row && params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <button>
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

   orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
}








const TrackOrder = () => {

    const orders=[
    {
      _id: "123456789",
      orderItems: [
        {
          name: "Iphone 11",
        },
      ],
        totalPrice: 50000,
        orderStatus: "Delivered",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

     {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row && params.row.status === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div> 

      <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>

    </div>
  )

}









const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};


export default ProfileContent