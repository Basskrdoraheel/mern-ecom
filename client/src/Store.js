import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailReducer,
  productReducer,
} from "./Reducers/productReducers";
import {
  ProfileReducer,
  forgotPassReducer,
  userReducer,
} from "./Reducers/userReducers";
import { cartReducer } from "./Reducers/cartReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailReducer,
  user: userReducer,
  profile: ProfileReducer,
  forgotPassword: forgotPassReducer,
  cart: cartReducer,
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
