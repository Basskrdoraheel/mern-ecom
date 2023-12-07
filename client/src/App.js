// components
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import MyOrders from "./components/Orders/MyOrders.jsx";

import store from "./Store";

// dependencies
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./Actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Payment from "./components/Cart/Payment.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import request from "./utils/requests.js";
import OrderDetails from "./components/Orders/OrderDetails.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import ProductList from "./components/Admin/ProductList.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
import ProcessOrder from "./components/Admin/ProcessOrder.jsx";
import UsersList from "./components/Admin/UsersList.jsx";
import UpdateUser from "./components/Admin/UpdateUser.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await request.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Driod Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
