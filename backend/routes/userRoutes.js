import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
const router = express.Router();
import jwt from 'jsonwebtoken';
import { protectRoute, admin } from '../middleware/authMiddleware.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(user && (await user.checkPassword(password)) ) {

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '30d'});

        //Set JWT as HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

}));

// @desc    Register user
// @route   POST /api/users
// @access  Public
router.post('/', asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name, 
        email,
        password
    });

    if(user){

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '30d'});

        //Set JWT as HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

}));

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
router.post('/logout', asyncHandler( async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
}));

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Public
router.get('/profile', protectRoute, asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protectRoute, asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
        user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protectRoute, admin, asyncHandler( async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
}));

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
router.get('/:id', protectRoute, admin, asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protectRoute, admin, asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if(user) {
        if(user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({ _id: user._id });
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    
    }
}));

// @desc    Update user 
// @route   PUT /api/users/:id
// @access  Private/Admin
router.put('/:id', protectRoute, admin, asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if(user) {        
        user.name = req.body.name|| user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    
    }
}));



export default router;