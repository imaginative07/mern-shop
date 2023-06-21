import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router();
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protectRoute, asyncHandler( async (req, res) => {
    res.send('Add order items');
    // res.status(200).json({ message: 'Logged out successfully' });

}));

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get('/mine', protectRoute, asyncHandler( async (req, res) => {
    res.send('Get my orders');
    // res.status(200).json({ message: 'Logged out successfully' });

}));

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private/Admin
router.get('/:id', protectRoute, admin, asyncHandler( async (req, res) => {
    res.send('Get order by id');
    // res.status(200).json({ message: 'Logged out successfully' });

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