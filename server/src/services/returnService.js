const AppDataSource = require("../config/data-source");

const createReturn = async (returnData) => {

  const orderRepository =
    AppDataSource.getRepository("Order");

  const returnRepository =
    AppDataSource.getRepository("Return");

  
  const order = await orderRepository.findOneBy({
    id: returnData.order_id
  });

  if (!order) {
    throw new Error("Order not found");
  }

  
  if (order.user_id !== returnData.user_id) {
    throw new Error(
      "You are not allowed to return this order"
    );
  }

  
  if (order.status !== "DELIVERED") {
    throw new Error(
      "Only delivered orders can be returned"
    );
  }

  const newReturn =
    returnRepository.create({
      user_id: returnData.user_id,
      order_id: returnData.order_id,
      type: returnData.type,
      reason: returnData.reason,
      comment: returnData.comment,
      product_image: returnData.product_image
    });

  return await returnRepository.save(
    newReturn
  );
};

const getReturns = async (userId) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  return await returnRepository.find({
    where: {
      user_id: userId
    }
  });

};

const getReturnById = async (
  id,
  userId
) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  return await returnRepository.findOneBy({
    id,
    user_id: userId
  });

};

const updateReturnStatus = async (
  id,
  status
) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  const returnRequest =
    await returnRepository.findOneBy({
      id
    });

  if (!returnRequest) {
    throw new Error("Return request not found");
  }

  returnRequest.status = status;

  return await returnRepository.save(
    returnRequest
  );

};


const updatePickupAddress = async (
  returnId,
  addressId,
  userId
) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  const addressRepository =
    AppDataSource.getRepository("Address");

  const returnRequest =
  await returnRepository.findOneBy({
    id: returnId
  });

if (!returnRequest) {
  throw new Error("Return request not found");
}


if (returnRequest.user_id !== userId) {
  throw new Error(
    "You are not allowed to update this return request"
  );
}


if (returnRequest.status !== "APPROVED") {
  throw new Error(
    "Pickup address can only be selected for approved return requests"
  );
}

  const address =
    await addressRepository.findOneBy({
      id: addressId,
      user_id: userId
    });

  if (!address) {
    throw new Error(
      "Address not found"
    );
  }

  returnRequest.pickup_address_id =
    addressId;

  return await returnRepository.save(
    returnRequest
  );

};



const confirmReturn = async (
  returnId,
  userId
) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  const refundRepository =
    AppDataSource.getRepository("Refund");

  const returnRequest =
    await returnRepository.findOneBy({
      id: returnId
    });

  if (!returnRequest) {
    throw new Error(
      "Return request not found"
    );
  }

  
  if (
    returnRequest.user_id !== userId
  ) {
    throw new Error(
      "You are not allowed"
    );
  }

  
  if (
    returnRequest.status !==
    "APPROVED"
  ) {
    throw new Error(
      "Return request is not approved"
    );
  }

 
  if (
    !returnRequest.pickup_address_id
  ) {
    throw new Error(
      "Please select pickup address first"
    );
  }

  
  const refund =
    await refundRepository.findOneBy({

      return_id:
      returnRequest.id

    });

  if (!refund) {

    throw new Error(
      "Please submit refund details first"
    );

  }

  
  if (
    returnRequest.workflow_status !==
    "REQUESTED"
  ) {

    throw new Error(
      "Return already confirmed"
    );

  }

  returnRequest.workflow_status =
    "PICKUP_PENDING";

  return await returnRepository.save(
    returnRequest
  );

};



const getReturnStatus = async (
  returnId,
  userId
) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  const refundRepository =
    AppDataSource.getRepository("Refund");

  const addressRepository =
    AppDataSource.getRepository("Address");

  const returnRequest =
    await returnRepository.findOneBy({
      id: returnId
    });

  if (!returnRequest) {
    throw new Error(
      "Return request not found"
    );
  }

  if (
    returnRequest.user_id !== userId
  ) {
    throw new Error(
      "You are not allowed"
    );
  }

  let pickupAddress = null;

  if (returnRequest.pickup_address_id) {

    pickupAddress =
      await addressRepository.findOneBy({

        id:
        returnRequest.pickup_address_id

      });

  }

  const refund =
    await refundRepository.findOneBy({

      return_id: returnId

    });

  return {

    return_id: returnRequest.id,

    status: returnRequest.status,

    workflow_status:
      returnRequest.workflow_status,

    pickup_address:
      pickupAddress,

    refund

  };

};



const cancelReturn = async (
  returnId,
  userId
) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  const returnRequest =
    await returnRepository.findOneBy({
      id: returnId,
      user_id: userId
    });

  if (!returnRequest) {
    throw new Error(
      "Return request not found"
    );
  }

  if (
    returnRequest.workflow_status ===
    "CANCELLED"
  ) {
    throw new Error(
      "Return request is already cancelled"
    );
  }

  const allowedStatus = [
    "REQUESTED",
    "PICKUP_PENDING"
  ];

  if (
    !allowedStatus.includes(
      returnRequest.workflow_status
    )
  ) {
    throw new Error(
      "Return cannot be cancelled at this stage"
    );
  }

  returnRequest.workflow_status =
    "CANCELLED";

  return await returnRepository.save(
    returnRequest
  );

};




module.exports = {
  createReturn,
  getReturns,
  getReturnById,
  updateReturnStatus,
  updatePickupAddress,
  confirmReturn,
  getReturnStatus,
  cancelReturn
};