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

import store from "./Store";

// dependencies
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./Actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Driod Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
