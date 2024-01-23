import React, { useEffect, useState } from 'react';
import ProductCard from '../components/Product/ProductCard';
import { Link } from 'react-router-dom';
import { getAllProducts, addProduct } from '../components/Services/productsService';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; 
import AddProductModal from '../components/Product/AddProductModal';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('price-asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const sortedProducts = [...currentProducts];
  sortedProducts.sort((a, b) => {
    const [criteria, order] = sortCriteria.split('-');
    if (criteria === 'price') {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (criteria === 'name') {
      return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    }
    return 0;
  });

 const handleSortBy = (criteria) => {
    setSortCriteria(criteria);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await addProduct(newProduct);
      setProducts([...products, newProduct]);
      setIsModalOpen(false);
      alert('Product updated Added!');

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="m-40">
      <div className="mb-4">
        <div className="flex justify-start mb-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
            onClick={toggleDropdown}
          >
            Sort
          </button>
          {isDropdownOpen && (
<div className="origin-top-left absolute left- mt-10 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">              <div className="py-1" role="none">
                <button
                  onClick={() => handleSortBy('price-asc')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-32"
                  role="menuitem"
                >
                  Price (Ascending)
                </button>
                <button
                  onClick={() => handleSortBy('price-desc')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-32"
                  role="menuitem"
                >
                  Price (Descending)
                </button>
                <button
                  onClick={() => handleSortBy('name-asc')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-32"
                  role="menuitem"
                >
                  Name (Ascending)
                </button>
                <button
                  onClick={() => handleSortBy('name-desc')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-32"
                  role="menuitem"
                >
                  Name (Descending)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-10 w-32"
      >
        Add Product
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard
              title={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
              category={product.category}
            />
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <ReactPaginate
          previousLabel={
            <span className='w-10 h-10 flex items-center justify-center rounded-md'>
              <AiFillLeftCircle size="30" className='text-green-400'  />
            </span> 
          }
          nextLabel={
            <span className='w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4'>
              <AiFillRightCircle size="30" className='text-green-400'  />
             </span>  
          }
          breakLabel={'...'}
          
          pageCount={pageCount}
          pageClassName='block border border-solid border-green-400  hover:bg-green-400 w-10 h-10 flex items-center justify-center rounded-md mx-2'
          onPageChange={handlePageChange}
          containerClassName= "flex items-center justify-center mt-8 mb-4"
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName="bg-green-500 text-white rounded-md" 
        />
      </div>

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddProduct={handleAddProduct} />
    </div>
  );
};

export default ProductsPage;
