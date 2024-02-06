import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NearestPriceProducts = () => {
  const [inputProductId, setInputProductId] = useState('');
  const [productId, setProductId] = useState(null);
  const [nearestProducts, setNearestProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNearestProducts = async () => {
      if (!productId) return;
      setError('');
      try {
        const response = await axios.get(`http://localhost:3001/products/${productId}/nearest`);
        setNearestProducts(response.data);
      } catch (error) {
        console.error('Error fetching nearest price products:', error);
        setError('Failed to fetch nearest price products');
      }
    };

    fetchNearestProducts();
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductId(inputProductId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productInput">Enter Product ID:</label>
        <input
          id="productInput"
          type="text"
          value={inputProductId}
          onChange={(e) => setInputProductId(e.target.value)}
          required
        />
        <button type="submit">Find Nearest Products</button>
      </form>

      {error && <p>{error}</p>}

      {nearestProducts.length > 0 && (
        <ul>
          {nearestProducts.map((product) => (
            <li key={product.id}>
              {product.name} - {product.category} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NearestPriceProducts;
