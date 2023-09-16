import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Products from "./Products";
import MetaData from "../layout/MetaData";

const product={
  name: "Blue T-shirt",
  images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
  price:"$150",
  _id:"raheel"
}

const Home = () => {
  return (
    <>
    <MetaData title={"Ecommerce"}/>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Products products={product}/>
        <Products products={product}/>
        <Products products={product}/>
        <Products products={product}/>
        <Products products={product}/>
        <Products products={product}/>
        <Products products={product}/>
        <Products products={product}/>    
      </div>
    </>
  );
};

export default Home;
