import express from 'express';

const router = express.Router();

// get all inventory items
router.get('/', (req, res) => {
    res.send('Get all inventory items');
});

// create new inventory item
router.post('/', (req, res) => {
    res.send('Create new inventory item');
});

// update inventory item
router.put('/:id', (req, res) => {
    res.send(`Update inventory item with ID ${req.params.id}`);
});

// delete inventory item    
router.delete('/:id', (req, res) => {
    res.send(`Delete inventory item with ID ${req.params.id}`);
}
);

// get inventory item by Id
router.get('/:id', (req, res) => {
    res.send(`Get inventory item with ID ${req.params.id}`);
});

export default router;