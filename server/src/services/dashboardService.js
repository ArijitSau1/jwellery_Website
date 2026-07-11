const AppDataSource =
require("../config/data-source");

const getDashboard = async () => {

  const userRepository =
    AppDataSource.getRepository("User");

  const orderRepository =
    AppDataSource.getRepository("Order");

  const returnRepository =
    AppDataSource.getRepository("Return");

  const refundRepository =
    AppDataSource.getRepository("Refund");

  const totalUsers =
    await userRepository.count();

  const totalOrders =
    await orderRepository.count();

  const pendingOrders =
    await orderRepository.count({
      where: {
        status: "PENDING"
      }
    });

  const deliveredOrders =
    await orderRepository.count({
      where: {
        status: "DELIVERED"
      }
    });

  const cancelledOrders =
    await orderRepository.count({
      where: {
        status: "CANCELLED"
      }
    });

  const totalReturns =
    await returnRepository.count();

  const pendingReturns =
    await returnRepository.count({
      where: {
        status: "PENDING"
      }
    });

  const approvedReturns =
    await returnRepository.count({
      where: {
        status: "APPROVED"
      }
    });

  const pickupScheduled =
    await returnRepository.count({
      where: {
        workflow_status:
        "PICKUP_SCHEDULED"
      }
    });

  const pickupCompleted =
    await returnRepository.count({
      where: {
        workflow_status:
        "PICKUP_COMPLETED"
      }
    });

  const refundProcessing =
    await returnRepository.count({
      where: {
        workflow_status:
        "REFUND_PROCESSING"
      }
    });

  const refundCompleted =
    await returnRepository.count({
      where: {
        workflow_status:
        "REFUND_COMPLETED"
      }
    });

  const totalRefunds =
    await refundRepository.count();

  return {

    totalUsers,

    totalOrders,

    pendingOrders,

    deliveredOrders,

    cancelledOrders,

    totalReturns,

    pendingReturns,

    approvedReturns,

    pickupScheduled,

    pickupCompleted,

    refundProcessing,

    refundCompleted,

    totalRefunds

  };

};

module.exports = {
  getDashboard
};