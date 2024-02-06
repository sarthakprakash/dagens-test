import React, { useState } from 'react';
import axios from 'axios'; // Ensure you have axios installed for HTTP requests

const ProductForm = () => {
  // State to hold form data
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: 0,
  });

  // Update state on form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send a POST request to your server endpoint with the product data
      const response = await axios.post('http://localhost:3001/products', product);
      console.log('Product created:', response.data);
      // Optionally reset the form or provide some user feedback here
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle errors, possibly provide user feedback
    }
  };

  // Form JSX
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={product.category} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={product.price} onChange={handleChange} required min="0" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;

