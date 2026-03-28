import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, toggleCategoryStatus, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();

// get all categories
router.get('/', getAllCategories);

// create new category
router.post('/', createCategory);

// update category
router.put('/:id', updateCategory);

// delete category
router.delete('/:id', deleteCategory);

// get category by Id
router.get('/:id', getCategoryById);

// status toggle category
router.patch('/:id/status', toggleCategoryStatus);

export default router;