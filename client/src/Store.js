import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailReducer, productReducer } from "./Reducers/productReducers";
import { userReducer } from "./Reducers/userReducers";

const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailReducer,
    user: userReducer
});

const middleware = [thunk];
let initialState = {

};
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store;