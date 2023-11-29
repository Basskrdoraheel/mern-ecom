import React from "react";
import Sidebar from "./SideBar";
import MetaData from "../layout/MetaData";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Dashboard = () => {
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
          </div>
          <div className="dashboardSummaryBox2">
            <Link to={"admin/prdoucts"}>
              <p>Products</p>
              <p>50</p>
            </Link>
            <Link to={"admin/orders"}>
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to={"admin/users"}>
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
