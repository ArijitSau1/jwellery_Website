const AppDataSource =
require("../config/data-source");

const createRefund = async (
  refundData,
  userId
) => {

  const refundRepository =
    AppDataSource.getRepository("Refund");

  const returnRepository =
    AppDataSource.getRepository("Return");

  const returnRequest =
    await returnRepository.findOneBy({
      id: refundData.return_id
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

  const existingRefund =
    await refundRepository.findOneBy({
      return_id:
      refundData.return_id
    });

  if (existingRefund) {
    throw new Error(
      "Refund details already submitted"
    );
  }

  if (
    refundData.refund_method ===
    "UPI"
  ) {

    if (!refundData.upi_id) {
      throw new Error(
        "UPI ID is required"
      );
    }

  }

  if (
    refundData.refund_method ===
    "BANK"
  ) {

    if (
      !refundData.bank_name ||
      !refundData.account_holder ||
      !refundData.account_number ||
      !refundData.ifsc_code
    ) {

      throw new Error(
        "Please provide complete bank details"
      );

    }

  }

  const refund =
    refundRepository.create(
      refundData
    );

  return await refundRepository.save(
    refund
  );

};

const getRefundByReturnId =
async (
  returnId,
  userId
) => {

  const refundRepository =
    AppDataSource.getRepository(
      "Refund"
    );

  const returnRepository =
    AppDataSource.getRepository(
      "Return"
    );

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

  const refund =
    await refundRepository.findOneBy({

      return_id: returnId

    });

  if (!refund) {

    throw new Error(
      "Refund details not found"
    );

  }

  return refund;

};

module.exports = {

  createRefund,

  getRefundByReturnId

};