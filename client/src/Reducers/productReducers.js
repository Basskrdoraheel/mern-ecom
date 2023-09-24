import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    CLEAR_ERROR,
  } from "../Constants/productConstants";
  
  export const productReducer = (state = { products: [] }, action) => { 
      switch (action.type) {
          case ALL_PRODUCT_REQUEST:
              return {
                  loading: true,
                  product: []
              };
  
          case ALL_PRODUCT_SUCCESS:
              return {
                  loading: false,
                  products: action.payload.products,
                  productsCount: action.payload.productsCount,
                  resultPerPage: action.payload.resultPerPage
              };
  
          case ALL_PRODUCT_FAIL:
              return {
                  loading: false, 
                  error: action.payload,
              };
  
          case CLEAR_ERROR:
              return {
                  ...state, 
                  error: null,
              };
  
          default:
              return state;
      }
  };
  
  // product detail reducer
  export const productDetailReducer = (state = { product: {} }, action) => { 
      switch (action.type) {
          case PRODUCT_DETAILS_REQUEST:
              return {
                  loading: true,
                  ...state
              };
  
          case PRODUCT_DETAILS_SUCCESS:
              return {
                  loading: false,
                  product: action.payload,
                 
              };
  
          case PRODUCT_DETAILS_FAIL:
              return {
                  loading: false, 
                  error: action.payload,
              };
  
          case CLEAR_ERROR:
              return {
                  ...state, 
                  error: null,
              };
  
          default:
              return state;
      }
  };
  