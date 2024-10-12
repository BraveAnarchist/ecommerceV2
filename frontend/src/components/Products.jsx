import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import DisplayProducts from "./DisplayProducts";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/product");
        // console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {products.length > 0 && (
        <section id="products" className="w-3/4 py-4 px-12 flex flex-wrap gap-4">
          <DisplayProducts products={products} />
        </section>
      )}
    </>
  );
}

export default Products;
