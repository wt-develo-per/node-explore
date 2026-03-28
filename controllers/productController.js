import { Product } from "../models/Product";
import Joi from "joi";
import { slugGeneratedFunction } from "../util/custom.js";

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// create new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId, brand, isActive } = req.body;

        const validateINput = Joi.object({
            name: Joi.string().min(3).max(150).required(),
            description: Joi.string().optional(),
            price: Joi.number().precision(2).required(),
            categoryId: Joi.number().required(),
            brand: Joi.string().optional(),
            isActive: Joi.boolean().optional()
        })

        const { error } = validateINput.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const GeneratedSlug = slugGeneratedFunction(name);
        const newProduct = await Product.create({ name, description, slug: GeneratedSlug, price, categoryId, brand, is_active: isActive });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// update product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId, brand, isActive } = req.body;

        const validateInput = Joi.object({
            name: Joi.string().min(3).max(150).required(),
            description: Joi.string().optional(),
            price: Joi.number().precision(2).required(),
            categoryId: Joi.number().required(),
            brand: Joi.string().optional(),
            isActive: Joi.boolean().optional()
        });

        const { error } = validateInput.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // check product existence
        const product = await Product.findByPk(id); 
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const GeneratedSlug = slugGeneratedFunction(name);
        const updatedProduct = await Product.update({ name, description, slug: GeneratedSlug, price, categoryId, brand, is_active: isActive }, { where: { id } });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({ where: { id } });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

// get product by Id
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// update status of product
export const toggleProductStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.is_active = !product.is_active;
        await product.save();
        res.json({ message: 'Product status updated successfully', isActive: product.is_active });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product status' });
    }
};