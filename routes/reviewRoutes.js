const express = require('express');

const reviewController = require('./../controllers/reviewController');

const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

//POST /tour/332422r4ewtf4/reviews

//GET/tour/24209342342342/reviews

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
