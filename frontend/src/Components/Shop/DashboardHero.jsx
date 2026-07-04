import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllEventsShop } from "../../redux/actions/event";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { ShopOrders } = useSelector((state) => state.order);
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
      dispatch(getAllOrdersOfShop(seller._id));
      dispatch(getAllEventsShop(seller._id));
    }
  }, [dispatch, seller]);

  // calculate total revenue from delivered orders only
  const totalRevenue =
    ShopOrders
      ?.filter((order) => order.status === "succeeded")
      .reduce((acc, order) => acc + order.totalPrice, 0)
      .toFixed(2) || "0.00";

  const totalOrders = ShopOrders?.length || 0;
  const totalProducts = products?.length || 0;
  const totalEvents = events?.length || 0;

  // recent 5 orders for the table
  const recentOrders = ShopOrders ? [...ShopOrders].slice(0, 5) : [];

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
      renderCell: (params) => (
        <span className="font-mono text-sm">#{params.value?.slice(0, 8)}</span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.6,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            params.value === "Delivered"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "items",
      headerName: "Items",
      type: "number",
      minWidth: 80,
      flex: 0.4,
    },
    {
      field: "total",
      headerName: "Total",
      minWidth: 120,
      flex: 0.6,
    },
    {
      field: "action",
      headerName: "",
      minWidth: 80,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <AiOutlineArrowRight size={18} className="text-gray-500 hover:text-black" />
        </Link>
      ),
    },
  ];

  const rows = recentOrders.map((order) => ({
    id: order._id,
    status: order.status,
    items: order.cart?.length ?? 0,
    total: "US$ " + order.totalPrice,
  }));

  return (
    <div className="w-full p-6 bg-[#f8f8f8] min-h-screen">

      {/* greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black tracking-tight">
          Welcome back, {seller?.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here's what's happening with your shop today.
        </p>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 800px:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue}`}
          sub="From delivered orders"
        />
        <StatCard
          label="Total Orders"
          value={totalOrders}
          sub="All time"
        />
        <StatCard
          label="Products"
          value={totalProducts}
          sub="Listed in your shop"
        />
        <StatCard
          label="Events"
          value={totalEvents}
          sub="Active events"
        />
      </div>

      {/* quick actions */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <QuickLink to="/dashboard-create-product" label="+ New Product" />
          <QuickLink to="/dashboard-create-event" label="+ New Event" />
          <QuickLink to="/dashboard-coupons" label="+ New Coupon" />
        </div>
      </div>

      {/* recent orders */}
      <div className="bg-white border border-gray-200 rounded-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-black">Recent Orders</h2>
          <Link
            to="/dashboard-orders"
            className="text-sm text-gray-500 hover:text-black flex items-center gap-1"
          >
            View all <AiOutlineArrowRight size={14} />
          </Link>
        </div>

        {rows.length === 0 ? (
          <div className="px-5 py-10 text-center text-gray-400 text-sm">
            No orders yet. Share your shop link to get started.
          </div>
        ) : (
          <div className="p-2">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              autoHeight
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f8f8f8",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #f0f0f0",
                  fontSize: "14px",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#fafafa",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};


// ── small reusable components ─────────────────────────────────────────

const StatCard = ({ label, value, sub }) => (
  <div className="bg-white border border-gray-200 rounded-md px-5 py-4">
    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-bold text-black leading-none">{value}</p>
    <p className="text-xs text-gray-400 mt-2">{sub}</p>
  </div>
);

const QuickLink = ({ to, label }) => (
  <Link
    to={to}
    className="px-4 py-2 border border-black text-sm font-medium text-black rounded hover:bg-black hover:text-white transition-colors duration-150"
  >
    {label}
  </Link>
);

export default DashboardHero;