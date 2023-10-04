
// components
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home"
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";




// dependencies
import { useEffect } from "react";
import {Routes,Route} from "react-router-dom";
import webFont from "webfontloader";
import LoginSignUp from "./components/User/LoginSignUp";


function App() {
  useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Driod Sans","Chilanka"]
      }
    })
  },[])
  return (
    <>
      <Header/>
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
