import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProductForm from './ProductForm';
import ProductsList from './ProductsList';
import ProductsFilter from './ProductsFilter';
import ProductsDisplay from './ProductsDisplay';

const App = () => (
  <div className="app">
    <h3>Happy hacking!</h3>
    <ProductForm />
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
