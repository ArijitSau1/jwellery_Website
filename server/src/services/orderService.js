const { search } = require("../app");
const { Like } = require("typeorm");
const AppDataSource = require("../config/data-source");


const createOrder = async (
  orderData
) => {

  const orderRepository =
    AppDataSource.getRepository(
      "Order"
    );

  const order =
    orderRepository.create(
      orderData
    );

  return await orderRepository.save(
    order
  );
};





const getOrders = async (
  userId,
  search = "",
  status = ""
) => {

  const orderRepository =
    AppDataSource.getRepository(
      "Order"
    );

  const where = {
    user_id: userId,
    product_name: Like(
      `%${search}%`
    )
  };

  if (status) {
    where.status = status;
  }

  return await orderRepository.find({
    where
  });

};


const getOrderById = async (
  userId,
  orderId
) => {

  const orderRepository =
    AppDataSource.getRepository(
      "Order"
    );

  const order =
    await orderRepository.findOneBy({
      id: parseInt(orderId),
      user_id: userId
    });

  if (!order) {
    throw new Error(
      "Order not found"
    );
  }

  return order;
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder
};