import express from 'express';
import { getAllUsers, registerUser, loginUser, getUserProfile, deleteUser, updateUserStatus } from '../controllers/userController.js';

const router = express.Router();

// Fetch all users
router.get('/', getAllUsers);

// user registration
router.post('/register', registerUser);

// user login
router.post('/login', loginUser);

// get user profile by Id
router.get('/profile/:id',getUserProfile);

// delete user
router.delete('/:id', deleteUser);

// make active or inactive user
router.patch('/:id/status', updateUserStatus);

// refresh token route
router.post('/refresh-token', (req, res) => {
    // Logic for refreshing token
    res.json({ message: 'Token refreshed' });
});

export default router;