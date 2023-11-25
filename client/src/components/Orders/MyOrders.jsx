import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../Actions/orderAction";
const MyOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  const alert = useAlert();
  const column = [
    { field: "id", headerName: "Order ID" },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(myOrders());
  }, [error, alert, dispatch]);

  return (
    <>
      <MetaData title={`${user.name}`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            column={column}
            pageSize={10}
            disableSelectClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{`${user.name}'s Orders`}</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
