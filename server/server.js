const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const products = require('./db');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

http.createServer(app).listen(3001, () => {
  console.log('Listen on 0.0.0.0:3001');
});

app.get('/', (_, res) => {
  res.send({ status: 200 });
});

process.on('SIGINT', function () {
  process.exit();
});

app.post('/products', (req, res) => {
  const { name, category, price } = req.body;
  const newProduct = {
    id: uuidv4(), // Use a UUID library to generate unique IDs
    name,
    category,
    price,
  };
  products.push(newProduct);
  res.status(201).send(newProduct);
});

app.get('/products', (req, res) => {
  const { category, minPrice, maxPrice, page = 1 } = req.query;
  const pageSize = 24;
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= Number(maxPrice)
    );
  }

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  res.send(paginatedProducts);
});

app.get('/products/:id/nearest', (req, res) => {
  const { id } = req.params;
  const N = 5; // For example, find 5 nearest priced products
  const targetProduct = products.find((p) => p.id === id);

  if (!targetProduct) {
    return res.status(404).send({ message: 'Product not found' });
  }

  const nearestProducts = products
    .filter((p) => p.category === targetProduct.category && p.id !== id)
    .sort(
      (a, b) =>
        Math.abs(a.price - targetProduct.price) -
        Math.abs(b.price - targetProduct.price)
    )
    .slice(0, N);

  res.send(nearestProducts);
});
app.get('/products/search', (req, res) => {
  const { name } = req.query;
  const matchedProducts = products.filter(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (matchedProducts.length > 0) {
    res.json(matchedProducts);
  } else {
    res.status(404).json({ message: 'No products found' });
  }
});
