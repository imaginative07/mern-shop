import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router();
import Order from "../models/orderModel.js";
import { protectRoute, admin } from '../middleware/authMiddleware.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protectRoute, asyncHandler( async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice  
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);

    }

    }

));

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/mine', protectRoute, asyncHandler( async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
}));

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private/Admin
router.get('/:id', protectRoute, admin, asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}));

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
router.put('/:id/pay', protectRoute, admin, asyncHandler( async (req, res) => {
    res.send('Update order to paid');
    // res.status(200).json({ message: 'Logged out successfully' });

}));

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
router.put('/:id/deliver', protectRoute, admin, asyncHandler( async (req, res) => {
    res.send('Update order to delivered');
    // res.status(200).json({ message: 'Logged out successfully' });

}));

// @desc    Get all orders
// @route   GET /api/orders/
// @access  Private/Admin
router.get('/', protectRoute, admin, asyncHandler( async (req, res) => {
    res.send('Get all orders');
    // res.status(200).json({ message: 'Logged out successfully' });

}));

export default router;