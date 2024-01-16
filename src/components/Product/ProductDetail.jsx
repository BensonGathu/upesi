import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getProductDetails, updateProduct, deleteProduct } from '../Services/productsService';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again later.');
    }
  };

  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-200 h-auto overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="object-fill object-center w-full"
          />
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{product.category}</p>
          <p className="text-gray-800 text-lg mb-4">${product.price}</p>
          <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
          {!showUpdateForm ? (
            <div className="flex">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowUpdateForm(true)}
              >
                <FaEdit />              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={handleDelete}
              >
                <FaTrash />             </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Update Product
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
