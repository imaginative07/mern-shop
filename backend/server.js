import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import ConnectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import router from './routes/productRoutes.js';

const port = process.env.PORT || 5000;

ConnectDB(); // Connect to Database

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');    
});

app.use('/api/products', router);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
