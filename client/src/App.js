
// components
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home"
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import store from "./Store"



// dependencies
import { useEffect } from "react";
import {Routes,Route} from "react-router-dom";
import webFont from "webfontloader";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./Actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";


function App() {

  const {isAuthenticated, user} = useSelector((state)=>state.user);

  useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Driod Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser());
  },[])
  return (
    <>
      <Header/>

      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path="/products/product/:id" element={<ProductDetails/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/products/:keyword" element={<Products/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/login" element={<LoginSignUp/>} />
      
      </Routes>
      <Footer/>
      </> 
   
     
      
    
  );
}

export default App;
