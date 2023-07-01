import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import ConnectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import router from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import e from 'express';

const port = process.env.PORT || 5000;

ConnectDB(); // Connect to Database

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');    
});

app.use('/api/products', router);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}));

const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, '/frontend/build')));

    app.get('*', (req, res) => res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('Hello World!');    
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
