import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailReducer, productReducer } from "./Reducers/productReducers";

const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailReducer,
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