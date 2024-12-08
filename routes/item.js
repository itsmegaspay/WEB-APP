const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// CRUD Routes
router.get('/', itemsController.getAllItems);
router.post('/', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.patch('/:id', itemsController.updatePartialItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
