const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync")
const {validateReview, isLoggedIn, isAuthor} = require('../middleware.js')
const reviewControllers = require('../controllers/reviews.controllers.js')

// REVIEW ROUTE
router.post(
  "/",
  validateReview,isLoggedIn,
  wrapAsync(reviewControllers.createReview)
);
// DELETE REVIEW ROUTE
router.delete(
  "/:reviewId",isLoggedIn,isAuthor,
  wrapAsync(reviewControllers.deleteReview)
);

module.exports = router;
