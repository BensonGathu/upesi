import React, { useEffect, useState } from 'react';
import ProductCard from '../components/Product/ProductCard';
import { Link } from 'react-router-dom'; 
import { getAllProducts } from '../components/Services/productsService';
import ReactPaginate from 'react-paginate'; 

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 

  const productsPerPage = 8; 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);

  return (
    <div className="mt-40">
       <Link
        to="/add-product"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Product
      </Link>
      <div className="grid">
        {currentProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}> 
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            ratings={product.ratings}
          />
           </Link>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
        />
      </div>
    </div>





  );

};

export default ProductsPage;
