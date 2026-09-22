// reviews.routes.js
const express = require('express');
const router = express.Router();

// Controllers (you create these separately)
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews.controller');

// GET /reviews → list all reviews
router.get('/', getAllReviews);

// GET /reviews/:id → get one review
router.get('/:id', getReviewById);

// POST /reviews → create a new review
router.post('/', createReview);

// PUT /reviews/:id → update a review
router.put('/:id', updateReview);

// DELETE /reviews/:id → delete a review
router.delete('/:id', deleteReview);

module.exports = router;
