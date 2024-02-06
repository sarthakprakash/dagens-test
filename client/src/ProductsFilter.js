import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilteredProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { category, minPrice, maxPrice, page } = filters;
      const response = await axios.get(`http://localhost:3001/products`, {
        params: { category, minPrice, maxPrice, page }
      });
      setProducts(response.data);
    };

    fetchProducts();
  }, [filters]);

  // Handlers to change filters and page
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <div>
      {/* Filters Form */}
      <div>
        <input name="category" value={filters.category} onChange={handleChange} placeholder="Category" />
        <input name="minPrice" type="number" value={filters.minPrice} onChange={handleChange} placeholder="Min Price" />
        <input name="maxPrice" type="number" value={filters.maxPrice} onChange={handleChange} placeholder="Max Price" />
        <button onClick={() => handlePageChange(1)}>Search</button>
      </div>

      {/* Products List */}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.category} - ${product.price}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <button onClick={() => handlePageChange(Math.max(1, filters.page - 1))}>Previous</button>
      <button onClick={() => handlePageChange(filters.page + 1)}>Next</button>
    </div>
  );
};

export default FilteredProducts;
