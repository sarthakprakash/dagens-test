import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProductForm from './ProductForm'; // Import the ProductForm component
import ProductsList from './ProductsList'; // Adjust the path based on your file structure
import ProductsFilter from './ProductsFilter';
import ProductsDisplay from './ProductsDisplay'

const App = () => (
  <div className="app">
    <h3>Happy hacking!</h3>
    <ProductForm /> {/* Include the ProductForm component here */}
    <h1>ProductsList</h1>
    <ProductsList />
    <ProductsFilter />
    <ProductsDisplay />
  </div>
);

export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
