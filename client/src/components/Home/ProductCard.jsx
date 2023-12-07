import React from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // console.log("🚀 ~ file: ProductCard.jsx:6 ~ ProductCard ~ product:", product);
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`product/${product._id}`}>
      {/* <img src={product.image[0].url} alt={product.name} /> */}
      <p>{product.name}</p>

      <div>
        <Rating {...options} className="productCardSpan" />{" "}
        <span> ({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
