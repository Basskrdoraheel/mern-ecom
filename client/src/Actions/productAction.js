import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERROR,
  } from "../Constants/productConstants";
  import axios from "axios";

  export const allProductRequest = () => ({
    type: ALL_PRODUCT_REQUEST,
  });
  
  export const getProducts = async (dispatch) => {
    try {
      dispatch({
        type: dispatch(allProductRequest()),
      });
  
      const { data } = await axios.get("/api/v1/products");
  
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Clear Errors
  export const clearErrors = (dispatch) =>{
    dispatch({
        type :CLEAR_ERROR
    })
  }