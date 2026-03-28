import { Category } from "../models/Category.js";
import Joi from "joi";
import { slugGeneratedFunction } from "../util/custom.js";

//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   parent_id INT NULL,
//   slug VARCHAR(150) NOT NULL,
//   is_active BOOLEAN DEFAULT TRUE,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (parent_id) REFERENCES categories(id)

// get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// create new category
export const createCategory = async (req, res) => {
    try {
        const { name, content } = req.body;
        const validateInput = Joi.object({
            name: Joi.string().min(3).max(100).required().pattern(new RegExp('^[a-zA-Z ]+$')),
            content: Joi.string().max(1000).optional()
        });

        const { error } = validateInput.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const GeneratedSlug = slugGeneratedFunction(name);
        const newCategory = await Category.create({ name, content, slug: GeneratedSlug });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });   
    }
};

// update category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, content } = req.body;

        const validateInput = Joi.object({
            name: Joi.string().min(3).max(100).required().pattern(new RegExp('^[a-zA-Z ]+$')),
            content: Joi.string().max(1000).optional()
        });

        const { error } = validateInput.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const slugGenerated = slugGeneratedFunction(name);

        const updatedCategory = await Category.update({ name, content, slug: slugGenerated }, { where: { id } });
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.destroy({ where: { id } });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

// get category by Id
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

// status toggle category
export const toggleCategoryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        category.is_active = !category.is_active;
        await category.save();
        res.json({ message: 'Category status updated successfully', is_active: category.is_active });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category status' });
    }
};