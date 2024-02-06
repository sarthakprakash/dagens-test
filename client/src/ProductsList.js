import React, { useState } from 'react';
import axios from 'axios';

const ProductSearch = () => {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProductDetails([]);

    try {
      const response = await axios.get(`http://localhost:3001/products/search?name=${encodeURIComponent(productName)}`);
      setProductDetails(response.data);
    } catch (err) {
      setError('No products found or an error occurred');
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}
      {productDetails.length > 0 && (
        <ul>
          {productDetails.map(product => (
            <li key={product.id}>
              <p>Name: {product.name}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;
