const orderService =
require("../services/orderService");



const createOrder = async (
  req,
  res
) => {

  try {

    const order =
      await orderService.createOrder({
        user_id: req.user.id,
        product_name: req.body.product_name,
        product_image: req.body.product_image,
        price: req.body.price,
        quantity: req.body.quantity,
        order_date: new Date()
      });

    res.status(201).json({
      success: true,
      data: order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



const getOrders = async (
  req,
  res
) => {

  try {

    const search =
      req.query.search || "";

    const status =
      req.query.status || "";

    const days =
      parseInt(
        req.query.days
      ) || 0;

    const orders =
      await orderService.getOrders(
        req.user.id,
        search,
        status,
        days
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


const getOrderById = async (
  req,
  res
) => {

  try {

    const order =
      await orderService.getOrderById(
        req.user.id,
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



const updateOrderStatus = async (
  req,
  res
) => {

  try {

    const order =
      await orderService.updateOrderStatus(

        req.params.id,

        req.body.status

      );

    res.status(200).json({

      success: true,

      message:
        "Order status updated successfully",

      data: order

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};



module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
};