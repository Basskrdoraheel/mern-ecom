import React from "react";
import CartItemCard from "./CartItemCard";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../../Actions/cartAction";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  console.log("🚀 ~ file: Cart.jsx:9 ~ Cart ~ cartItems:", cartItems);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const descreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartItems &&
          cartItems.map((item) => (
            <div className="cartContainer">
              <CartItemCard item={item} />
              <div className="cartInput">
                <button>-</button>
                <input readOnly type="number" value={item.quantity} />
                <button
                  onClick={() =>
                    increaseQty(item.product, item.quantity, item.stock)
                  }
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`$ ${
                item.price * item.quantity
              }`}</p>
            </div>
          ))}

        <div className="cartGrossTotal">
          <div></div>
          <div>
            <div className="cartGrossTotalBox">
              <p>Grass Total</p>
              <p>{`$ 600`}</p>
            </div>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkOutHandler}>Check Out</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
