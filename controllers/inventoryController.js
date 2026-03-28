import { Inventory } from "../models/Inventory.js";

// get all inventory items
export const getAllInventory = async (req, res) => {
    try {
        const inventories = await Inventory.findAll();
        res.json(inventories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// create new inventory item
export const createInventory = async (req, res) => {
    try {
        const inventory = await Inventory.create(req.body);
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update inventory item
export const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Inventory.update(req.body, { where: { product_id: id } });
        if (updated) {
            const updatedInventory = await Inventory.findByPk(id);
            res.json(updatedInventory);
        } else {
            res.status(404).json({ message: "Inventory not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete inventory item
export const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Inventory.destroy({ where: { product_id: id } });
        if (deleted) {
            res.json({ message: "Inventory deleted successfully" });
        } else {
            res.status(404).json({ message: "Inventory not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get inventory item by Id
export const getInventoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const inventory = await Inventory.findByPk(id);
        if (!inventory) return res.status(404).json({ message: "Inventory not found" });
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};