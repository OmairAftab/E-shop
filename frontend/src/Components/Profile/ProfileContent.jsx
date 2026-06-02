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

const ProfileContent = ({active}) => {

  const {user} = useSelector((state) => state.user);

  console.log(user);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
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
                  user && user.avatar && user.avatar.url
                    ? `${backend_url}${user.avatar.url}`
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
                  <AiOutlineCamera/>
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

export default ProfileContent