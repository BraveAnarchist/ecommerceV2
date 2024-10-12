/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function DisplayProducts({ products }) {
  return (
    <>
      {products.map((product, index) => {
        return (
          <div className="product w-1/5" key={index}>
            <Link to={`product/${product._id}`}>
              <img
                src={product.url ? product.url : "https://placehold.co/100"}
                className="w-full object-contain h-28"
                alt=""
              />
            </Link>
            <h3>
              <Link to={`product/${product._id}`}>{product.name}</Link>
            </h3>
            <p>{product.price}</p>
          </div>
        );
      })}
    </>
  );
}

export default DisplayProducts;
