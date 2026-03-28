import { User } from '../models/User.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Fetch all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }   
};

// User registration
export const registerUser = async (req, res) => {
 try {
    const { name, email, password, phone } = req.body;
    // validate user input using Joi
    const ValidateUser = Joi.object({
        name: Joi.string().min(3).max(100).required().pattern(new RegExp('^[a-zA-Z ]+$')),
        email: Joi.string().email().max(150).required(),
        password: Joi.string().min(6).max(255).required(),
        phone: Joi.string().min(8).max(10).required()
    });

    const { error } = ValidateUser.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    // check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, phone });
    if(newUser){
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } else {
        res.status(400).json({ error: 'User registration failed' });
    }

 } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
 }
};

export const loginUser = async (req, res) => {
    // Login logic here
    const { email, password } = req.body;
    const ValidateInputs = Joi.object({
        email: Joi.string().email().max(150).required(),
        password: Joi.string().min(6).max(255).required()
    });

    const { error } = ValidateInputs.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
console.log("validation passed!");
    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

     const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', userDetails : user, token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}

// get profile by Id
export const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
}

// delete user
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deleted = await User.destroy({ where: { id: userId } });
        if (!deleted) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

// make active or inactive user
export const updateUserStatus = async (req, res) => {
    const userId = req.params.id;
    const userDetail = await User.findByPk(userId, { attributes: ['is_active'] });
    if (!userDetail) {
        return res.status(404).json({ error: 'User not found' });
    }
    const newStatus = !userDetail.is_active;
    try {
        await User.update({ is_active: newStatus }, { where: { id: userId } });
        res.json({ message: 'User status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user status' });
    }
}

// refresh token
export const refreshToken = (req, res) => {
    // Logic for refreshing token
    res.json({ message: 'Token refreshed' });
}