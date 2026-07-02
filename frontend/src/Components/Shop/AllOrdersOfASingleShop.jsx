import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../redux/actions/product.js'
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from '../Layout/Loader.jsx';
import { toast } from 'react-toastify';
import { getAllOrdersOfShop } from '../../redux/actions/order.js';  
import { AiOutlineArrowRight } from "react-icons/ai";


const AllOrdersOfASingleShop = () => {

 const { ShopOrders=[], isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
  if (seller && seller._id) {
    dispatch(getAllOrdersOfShop(seller._id));
  }
}, [dispatch, seller]);







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

   ShopOrders &&
    ShopOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });


    
  return (
    <>
    {
      isLoading ? (
        <Loader />
      ) : (
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          autoheight
          disableSelectionOnClick
        />
      )
    }
    </>
  )
}

export default AllOrdersOfASingleShop