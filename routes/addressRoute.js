import express from 'express';

const router = express.Router();

// get all addresses of a user
router.get('/user/:userId', (req, res) => {
    res.send(`Get all addresses for user with ID ${req.params.userId}`);
});

// create new address for a user
router.post('/user/:userId', (req, res) => {
    res.send(`Create new address for user with ID ${req.params.userId}`);
});

// update address by Id
router.put('/:id', (req, res) => {
    res.send(`Update address with ID ${req.params.id}`);
});

// delete address by Id
router.delete('/:id', (req, res) => {
    res.send(`Delete address with ID ${req.params.id}`);
});

// get address by Id
router.get('/:id', (req, res) => {
    res.send(`Get address with ID ${req.params.id}`);
});

export default router;