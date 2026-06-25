import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsShop } from '../../redux/actions/product.js'
import { deleteProduct } from '../../redux/actions/product.js'
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from '../Layout/Loader.jsx';
import { toast } from 'react-toastify';


const AllProductsOfASingleShop = () => {

 const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
  if (seller && seller._id) {
    dispatch(getAllProductsShop(seller._id));
  }
}, [dispatch, seller]);




const handleDeleteProduct = async (id) => {
  try {
    await dispatch(deleteProduct(id));    // Dispatch the deleteProduct action to delete the product with the given id. This will trigger the corresponding reducer to update the state and remove the product from the list.
   
    if (seller && seller._id) {
      dispatch(getAllProductsShop(seller._id));  // Refresh the product list after deletion so that the deleted product is removed from the UI. This ensures that the user sees the updated list of products without needing to manually refresh the page.
    }

    toast.success("Product deleted successfully");  

  } catch (error) {
    console.error("Failed to delete product:", error);
    toast.error("Failed to delete product");
  }
}






  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDeleteProduct(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US $" + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
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

export default AllProductsOfASingleShop