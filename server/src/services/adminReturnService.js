const AppDataSource =
require("../config/data-source");

const updateWorkflowStatus = async (
  returnId,
  currentStatus,
  newStatus
) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

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
    returnRequest.status !== "APPROVED"
  ) {
    throw new Error(
      "Return request is not approved"
    );
  }

  if (
    returnRequest.workflow_status !== currentStatus
  ) {
    throw new Error(
      `Return must be in ${currentStatus} status`
    );
  }

  returnRequest.workflow_status =
    newStatus;

  return await returnRepository.save(
    returnRequest
  );

};

module.exports = {
  updateWorkflowStatus
};