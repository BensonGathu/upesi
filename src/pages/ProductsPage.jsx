import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { getAllProducts, addProduct } from '../components/Services/productsService';

const ProductCard = lazy(() => import('../components/Product/ProductCard'));
const AddProductModal = lazy(() => import('../components/Product/AddProductModal'));

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('price-asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const productsPerPage = 8;
  const filteredProductsPerPage = 8; 

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

  const sortedProducts = [...products];
  sortedProducts.sort((a, b) => {
    const [criteria, order] = sortCriteria.split('-');
    if (criteria === 'price') {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (criteria === 'name') {
      return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    }
    return 0;
  });

  const filterProductsByCategory = (category) => {
    if (category === 'all') {
      return sortedProducts;
    } else {
      return sortedProducts.filter((product) => product.category === category);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * productsPerPage;
  const filteredProducts = filterProductsByCategory(selectedCategory);
  const pageCount = Math.ceil(filteredProducts.length / filteredProductsPerPage);

  const currentFilteredProducts = filteredProducts.slice(
    offset,
    offset + filteredProductsPerPage
  );

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
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const categories = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing"
  ];

  return (
    <div className="mx-4 md:mx-8 lg:mx-12 xl:mx-16">
      <div className="mb-4 flex flex-wrap items-start">
        <div className="relative w-full md:w-40 xl:w-48 mr-3">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={toggleDropdown}
          >
            Sort
          </button>
          {isDropdownOpen && (
            <div className="origin-top-left absolute left-0 mt-2 w-full md:w-40 xl:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1" role="none">
                <button
                  onClick={() => handleSortBy('price-asc')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                  role="menuitem"
                >
                  Price (Ascending)
                </button>
                <button
                  onClick={() => handleSortBy('price-desc')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                  role="menuitem"
                >
                  Price (Descending)
                </button>
                <button
                  onClick={() => handleSortBy('name-asc')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                  role="menuitem"
                >
                  Name (Ascending)
                </button>
                <button
                  onClick={() => handleSortBy('name-desc')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                  role="menuitem"
                >
                  Name (Descending)
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative w-full md:w-40 xl:w-48 mr-3">
          <select
            className="relative w-full md:w-40 xl:w-48 mr-3 block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-grow"></div> 

        <div className="w-full md:w-40 xl:w-48">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentFilteredProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductCard
                title={product.title}
                price={product.price}
                description={product.description}
                image={product.image}
                category={product.category}
              />
            </Suspense>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <ReactPaginate
          previousLabel={
            <span className="w-10 h-10 flex items-center justify-center rounded-md">
              <AiFillLeftCircle size="30" className="text-green-400" />
            </span>
          }
          nextLabel={
            <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4">
              <AiFillRightCircle size="30" className="text-green-400" />
            </span>
          }
          breakLabel={'...'}
          pageCount={pageCount}
          pageClassName="block border border-solid border-green-400 hover:bg-green-400 w-10 h-10 flex items-center justify-center rounded-md mx-2"
          onPageChange={handlePageChange}
          containerClassName="flex items-center justify-center mt-8 mb-4"
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName="bg-green-500 text-white rounded-md"
        />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddProduct={handleAddProduct} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
