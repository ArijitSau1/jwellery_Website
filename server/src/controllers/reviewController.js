const reviewService =
require("../services/reviewService");

const createReview =
async (req, res) => {

  try {

    const review =
      await reviewService.createReview(

        req.body,

        req.user.id

      );

    res.status(201).json({

      success: true,

      message:
      "Review added successfully",

      data: review

    });

  } catch (error) {

    res.status(400).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {
  createReview
};