
const express = require('express');
const router = express.Router();

const {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification
} = require('./Controllers/notifications.controller.js');

// GET all notifications
router.get('/', getAllNotifications);

// GET one notification
router.get('/:id', getNotificationById);

// CREATE notification
router.post('/', createNotification);

// UPDATE notification
router.put('/:id', updateNotification);

// DELETE notification
router.delete('/:id', deleteNotification);

module.exports = router;