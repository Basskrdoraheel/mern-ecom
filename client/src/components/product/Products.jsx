import React, { useEffect, useState } from 'react';
import "./Products.css";
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../Actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"

const Products = () => {

  const [currentPage, setCurrentPage] =useState(1);
    const {loading,error,productsCount,products,resultPerPage} = useSelector((state)=>state.products)
    const dispatch = useDispatch()
    const {keyword} = useParams();

    useEffect(()=>{
      dispatch(getProducts(keyword,currentPage))
    },[dispatch,keyword,currentPage])

  const setCurrentPageNo =(e)=>{
    setCurrentPage(e);
  }
  
  return (
    <>
    {loading ? <Loader/> : 
    <>
    <h2 className="productsHeading">Products</h2>
    <div className="products">
        {products && products.map((product)=>(
            <ProductCard key={product._id} product={product} />
        ))}
    </div>

    <div className="paginationBox">
      <Pagination 
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="First"
          lastPageText="Last"
          itemClass='page-item'
          linkClass='page-link'
          activeClass='pageItemActive'
          activeLinkClass='pageLinkActive'


          />
    </div>
    </>}
    
    </>
  )
}

export default Products