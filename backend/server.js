import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import ConnectDB from './config/db.js';
import products from './data/products.js';
const port = process.env.PORT || 5000;

ConnectDB(); // Connect to Database

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product._id === req.params.id);
    res.json(product);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
