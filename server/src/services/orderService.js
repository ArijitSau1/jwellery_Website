const { search } = require("../app");
const { Like, MoreThanOrEqual } = require("typeorm");
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
  status = "",
  days = 0
) => {

  const orderRepository =
    AppDataSource.getRepository(
      "Order"
    );

  const where = {
    user_id: userId
  };

  if (search) {
    where.product_name = Like(
      `%${search}%`
    );
  }

  if (status) {
    where.status = status;
  }

  if (days > 0) {

    const fromDate =
      new Date();

    fromDate.setDate(
      fromDate.getDate() - days
    );

    where.order_date =
      MoreThanOrEqual(
        fromDate
          .toISOString()
          .split("T")[0]
      );   

  }

  return await orderRepository.find({
    where,
    order: {
      order_date: "DESC"
    }
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



const updateOrderStatus = async (
  orderId,
  status
) => {

  const orderRepository =
    AppDataSource.getRepository(
      "Order"
    );

  const order =
    await orderRepository.findOneBy({
      id: parseInt(orderId)
    });

  if (!order) {
    throw new Error(
      "Order not found"
    );
  }

  order.status = status;

  return await orderRepository.save(
    order
  );

};


module.exports = {
  getOrders,
  getOrderById,
  createOrder,
 updateOrderStatus
};