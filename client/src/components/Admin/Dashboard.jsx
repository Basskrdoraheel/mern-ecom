import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import MetaData from "../layout/MetaData";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../Actions/productAction";
import { getAllOrders } from "../../Actions/orderAction";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);
  let outOfStock = 0;
  products &&
    products.forEach((i) => {
      if (i.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <>
      <MetaData title="Dashboard" />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">DashBoard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> $215
              </p>
            </div>

            <div className="dashboardSummaryBox2">
              <Link to={"admin/prdoucts"}>
                <p>Products</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to={"admin/orders"}>
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to={"admin/users"}>
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            {/* <Line data={lineData} options={options} /> */}
          </div>
          <div className="doughnutChart">
            {/* <Doughnut data={doughnutData} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
