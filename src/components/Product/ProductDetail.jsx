import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getProductDetails, updateProduct, deleteProduct } from '../Services/productsService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditProductForm from './EditProductForm';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    category: '',
    description: '',
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const data = await getProductDetails(id);
        setProduct(data);
        setFormData({
          title: data.title,
          price: data.price,
          category: data.category,
          description: data.description,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    fetchProductDetails();
  }, [id]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateProduct(id, formData);
     if (updatedData.image) {
      setProduct(updatedData);
    } else {
      setProduct({ ...updatedData, image: product.image });
    }
      alert('Product updated successfully!');
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again later.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      alert('Product deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again later.');
    }
  };

  if (!product) {
    return <section className="h-screen text-center justify-center">Loading...</section>;
  }

  return (
    <div className=" pt-30 pb-12 lg:py-32 h-screen flex items-center">

      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-h-[400px] lg:max-w-sm hover:scale-110 transition duration-300' src={product.image} alt={product.title} />
          </div>

          <div className='flex-1 text-center lg:text-left'>
            <h1 className='uppercase font-bold text-green-400'>{product.category}</h1>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{product.title}</h1>
            <div className='text-xl text-amber-800 font-medium mb-6'>${product.price}</div>
            <div className='max-w-[500px]'>
              <p className='mb-5'>{product.description}</p>
            </div>

            {!showUpdateForm ? (
            <div className="flex">
              <button
                className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowUpdateForm(true)}><FaEdit /></button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={handleDelete}>
                <FaTrash />
              </button>
            </div>
          ) : (

            <EditProductForm
                product={product}
                formData={formData}
                showUpdateForm={showUpdateForm}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            // <form onSubmit={handleSubmit}>
            //   <div className="mb-4">
            //     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            //       Title
            //     </label>
            //     <input
            //       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[500px]"
            //       id="title"
            //       type="text"
            //       name="title"
            //       value={formData.title}
            //       onChange={handleInputChange}
            //       required
            //     />
            //   </div>
            //   <div className="mb-4">
            //     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            //       Price
            //     </label>
            //     <input
            //       className=" max-w-[500px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            //       id="price"
            //       type="number"
            //       name="price"
            //       value={formData.price}
            //       onChange={handleInputChange}
            //       required
            //     />
            //   </div>
            //   <div className="mb-4">
            //     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            //       Category
            //     </label>
            //     <input
            //       className="max-w-[500px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            //       id="category"
            //       type="text"
            //       name="category"
            //       value={formData.category}
            //       onChange={handleInputChange}
            //       required
            //     />
            //   </div>
            //   <div className="mb-4 max-h-[200px]">
            //     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            //       Description
            //     </label>
            //     <textarea
            //       className="max-w-[500px] h-44 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            //       id="description"
            //       name="description"
            //       value={formData.description}
            //       onChange={handleInputChange}
            //       required
            //     />
            //   </div>
            //   <button
            //     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            //     type="submit"
            //   >
            //     Update Product
            //   </button>
            // </form>
          )}
            
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;