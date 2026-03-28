import express from 'express';

const router = express.Router();

// get all products
router.get('/', (req, res) => {
    res.send('Get all products');
});

// create new product
router.post('/', (req, res) => {
    res.send('Create new product');
});

// update product
router.put('/:id', (req, res) => {
    res.send(`Update product with ID ${req.params.id}`);
});

// delete product
router.delete('/:id', (req, res) => {
    res.send(`Delete product with ID ${req.params.id}`);
});

// get product by Id
router.get('/:id', (req, res) => {
    res.send(`Get product with ID ${req.params.id}`);
});

// update status of product
router.patch('/:id/status', (req, res) => {
    res.send(`Update status of product with ID ${req.params.id}`);
});

export default router;