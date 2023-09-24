import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../Actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import ReactStars from "react-rating-stars-component"
import ReviewsCard from "./ReviewsCard"
import { useAlert } from "react-alert";

const ProductDetails = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const { id } = useParams();

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,alert,error]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 20,
    value: product.ratings,
    isHalf: true
  }

  return (
    <>
    {loading ? <Loader/> : 
    <>
    <div className="productDetails">
      <div>
        <Carousel>
          {product && product.image ? (
            product.image.map((item, i) => (
              <img
                className="CarouselImage"
                key={item.url}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))
          ) : (
            <Loader />
          )}
        </Carousel>
      </div>

      <div>
        <div className="detailsBlock-1">
          <h2>{product.name}</h2>
        </div>
        <div className="detailsBlock-2">
          <ReactStars {...options} />
          <span> ({product.numOfReviews} Reviews)</span>
        </div>
        <div className="detailsBlock-3">
          <h1> {product.price}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button>-</button>
              <input type="number" value="1" />
              <button>+</button>
            </div>
            <button>Add to Cart</button>
          </div>
        </div>
        <p>
          Status:
          <b className={product.stock <1 ? "redColor" : "greenColor"}>
            {product.stock <1 ? "OutOfStock" : "InStock"}
          </b>
        </p>
      </div>
      <div className="detailsBlock-4">
        Discription : <p>{product.description}</p>
      </div>
      <button className="submitReview">Submit Review</button>
    </div>
    <h3 className="reviewsHeading">Reviews</h3>
    {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewsCard key={review._id} review={review} />
              ))}
      </div>
    ):(
      <p className="noReviews">No Reviews yet</p>
    )}
  </>}
    </>
  );
};

export default ProductDetails;
