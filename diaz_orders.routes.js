// order.routes.js
const express = require('express');
const router = express.Router();

// Example: Controller functions (could be in a separate file)
const ordersController = {
    // GET /orders - list all orders
    getAllOrders: (req, res) => {
        try {
            // Example data (replace with DB query)
            const orders = [
                { id: 1, item: 'Laptop', quantity: 2 },
                { id: 2, item: 'Phone', quantity: 1 }
            ];
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching orders', error: error.message });
        }
    },

    // GET /orders/:id - get a single order
    getOrderById: (req, res) => {
        try {
            const orderId = parseInt(req.params.id, 10);
            if (isNaN(orderId)) {
                return res.status(400).json({ message: 'Invalid order ID' });
            }
            // Example data (replace with DB query)
            const order = { id: orderId, item: 'Laptop', quantity: 2 };
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching order', error: error.message });
        }
    },

    // POST /orders - create a new order
    createOrder: (req, res) => {
        try {
            const { item, quantity } = req.body;
            if (!item || typeof quantity !== 'number') {
                return res.status(400).json({ message: 'Invalid order data' });
            }
            // Example: Save to DB here
            const newOrder = { id: Date.now(), item, quantity };
            res.status(201).json({ message: 'Order created', order: newOrder });
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error: error.message });
        }
    }
};

// Define routes
router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder);

module.exports = router;
