import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailReducer,
  productReducer,
  productsReducer,
} from "./Reducers/productReducers";
import {
  ProfileReducer,
  allUsersReducer,
  forgotPassReducer,
  userDetailsReducer,
  userReducer,
} from "./Reducers/userReducers";
import { cartReducer } from "./Reducers/cartReducer";
import {
  allOrderReducer,
  myOrderReducer,
  newOrderReducer,
  orderDetailReducer,
  orderReducer,
} from "./Reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailReducer,
  newReview: newReviewReducer,
  user: userReducer,
  profile: ProfileReducer,
  forgotPassword: forgotPassReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrderReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
