import { Address } from "../models/Address.js";
import Joi from "joi";

// get all addresses of a user
export const getAddressesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await Address.findAll({ where: { user_id: userId } });
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

// create new address for a user
export const createAddressForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { street, city, state, zipCode, country } = req.body;
        const validateInput = Joi.object({
            street: Joi.string().max(200).required(),
            city: Joi.string().max(100).required(),
            state: Joi.string().max(100).required(),
            zipCode: Joi.string().max(20).required(),
            country: Joi.string().max(100).required()
        });

        const { error } = validateInput.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const newAddress = await Address.create({ user_id: userId, street, city, state, zip_code: zipCode, country });
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update address of a user
export const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const { street, city, state, zipCode, country } = req.body;
        const validateInput = Joi.object({
            street: Joi.string().max(200).required(),
            city: Joi.string().max(100).required(),
            state: Joi.string().max(100).required(),
            zipCode: Joi.string().max(20).required(),
            country: Joi.string().max(100).required()
        });

        const { error } = validateInput.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const [updated] = await Address.update(
            { street, city, state, zip_code: zipCode, country },
            { where: { id: addressId } }
        );

        if (updated) {
            const updatedAddress = await Address.findByPk(addressId);
            res.json(updatedAddress);
        } else {
            res.status(404).json({ message: "Address not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete address of a user
export const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const deleted = await Address.destroy({ where: { id: addressId } });
        if (deleted) {
            res.json({ message: "Address deleted successfully" });
        } else {
            res.status(404).json({ message: "Address not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get address by Id
export const getAddressById = async (req, res) => {
    try {
        const { addressId } = req.params;
        const address = await Address.findByPk(addressId);
        if (address) {
            res.json(address);
        } else {
            res.status(404).json({ message: "Address not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Everything below this line is for other use
// Node.js related interview plus practical coding questions.

// 1. Explain the event-driven architecture of Node.js and how it handles asynchronous operations.

// 2. Write a simple Express.js middleware that logs the request method and URL for each incoming request.
// 3. How does the Node.js event loop work? Describe its phases.

// 4. Create a RESTful API endpoint using Express.js that allows users to perform CRUD operations on a "products" resource. Include validation for the product data using Joi.
// 5. What are Promises in Node.js, and how do they differ from callbacks? Provide an example of using Promises to handle asynchronous operations.

// 6. Write a function in Node.js that reads a JSON file asynchronously and returns the parsed data. Use Promises or async/await for handling the asynchronous operation.

// Below is the answers of above questions