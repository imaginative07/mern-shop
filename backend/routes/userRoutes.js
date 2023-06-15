import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router();

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', asyncHandler( async (req, res) => {
    
    res.send('Auth user');
}));

// @desc    Register user
// @route   POST /api/users
// @access  Public
router.post('/', asyncHandler( async (req, res) => {
    res.send('Register user');
}));

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
router.post('/logout', asyncHandler( async (req, res) => {
    res.send('Logout user');
}));

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Public
router.get('/profile', asyncHandler( async (req, res) => {
    res.send('Get user profile');
}));

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', asyncHandler( async (req, res) => {
    res.send('Update user profile');
}));

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', asyncHandler( async (req, res) => {
    res.send('Get users');
}));

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
router.get('/:id', asyncHandler( async (req, res) => {
    res.send('Get user by id');
}));

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', asyncHandler( async (req, res) => {
    res.send('Delete user');
}));

// @desc    Update user 
// @route   PUT /api/users/:id
// @access  Private/Admin
router.put('/:id', asyncHandler( async (req, res) => {
    res.send('Update user');
}));



export default router;