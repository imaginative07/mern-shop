import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router();
import Product from "../models/productModel.js";
import { protectRoute, admin } from '../middleware/authMiddleware.js';

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

router.get('/:id', asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})
);

router.post('/', protectRoute, admin, asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createProduct = await product.save();
   
    res.status(201).json(createProduct);

}));

export default router;