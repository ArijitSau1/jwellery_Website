const AppDataSource =
require("../config/data-source");

const createReview = async (
  reviewData,
  userId
) => {

  const reviewRepository =
    AppDataSource.getRepository("Review");

  const orderRepository =
    AppDataSource.getRepository("Order");

  

  const order =
    await orderRepository.findOneBy({

      id: reviewData.order_id

    });

  if (!order) {

    throw new Error(
      "Order not found"
    );

  }

  

  if (order.user_id !== userId) {

    throw new Error(
      "You are not allowed to review this order"
    );

  }

 

  if (order.status !== "DELIVERED") {

    throw new Error(
      "Only delivered orders can be reviewed"
    );

  }

  

  const existingReview =
    await reviewRepository.findOneBy({

      order_id:
      reviewData.order_id

    });

  if (existingReview) {

    throw new Error(
      "You have already reviewed this order"
    );

  }

  

  if (

    reviewData.rating < 1 ||

    reviewData.rating > 5

  ) {

    throw new Error(
      "Rating must be between 1 and 5"
    );

  }

  const review =
    reviewRepository.create({

      user_id: userId,

      ...reviewData

    });

  return await reviewRepository.save(
    review
  );

};



const getMyReviews = async (
  userId
) => {

  const reviewRepository =
    AppDataSource.getRepository(
      "Review"
    );

  return await reviewRepository.find({

    where: {
      user_id: userId
    },

    order: {
      created_at: "DESC"
    }

  });

};


module.exports = {
  createReview,
   getMyReviews
};