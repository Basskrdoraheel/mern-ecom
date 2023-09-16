import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  size: window.innerWidth > 600 ? 20 : 25,
  activeColor: "tomato",
  value: 2.5,
  isHalf: true,
};

const Products = ({ products }) => {
  return (
    <Link className="productCard" to={products._id}>
      <img src={products.images[0].url} alt={products.name} />
      <p>{products.name}</p>

      <div>
        <ReactStars {...options} /> <span> (256 Reviews)</span>
      </div>
      <span>{products.price}</span>
    </Link>
  );
};

export default Products;
