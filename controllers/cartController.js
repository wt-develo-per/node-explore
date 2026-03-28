import { Cart } from "../models/Cart.js";
import { CartItem } from "../models/CartItem";

// get all cart items for a user
export const getCartItemsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;  
        const cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const cartItems = await CartItem.findAll({ where: { cart_id: cart.id } });
        res.json(cartItems);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// add item to cart
export const addItemToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            cart = await Cart.create({ user_id: userId });
        }
        const newItem = await CartItem.create({ cart_id: cart.id, product_id: productId, quantity });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update cart item quantity
export const updateCartItem = async (req, res) => {
    try {   
        const { itemId } = req.params;
        const { quantity } = req.body;
        const [updated] = await CartItem.update({ quantity }, { where: { id: itemId } });
        if (updated) {
            const updatedItem = await CartItem.findByPk(itemId);
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: "Cart item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete cart item
export const deleteCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const deleted = await CartItem.destroy({ where: { id: itemId } });
        if (deleted) {
            res.json({ message: "Cart item deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Cart item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// clear cart for a user ( only use ) 
export const clearCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        await CartItem.destroy({ where: { cart_id: cart.id } });
        res.json({ message: "Cart cleared successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

