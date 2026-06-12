const orderService =
require("../services/orderService");

const getOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await orderService.getOrders(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  getOrders
};