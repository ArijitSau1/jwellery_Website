const AppDataSource = require("../config/data-source");

const createReturn = async (returnData) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  const newReturn =
    returnRepository.create(returnData);

  return await returnRepository.save(newReturn);

};

const getReturns = async () => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  return await returnRepository.find();

};

const getReturnById = async (id) => {

  const returnRepository =
    AppDataSource.getRepository("Return");

  return await returnRepository.findOneBy({
    id
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

module.exports = {
  createReturn,
  getReturns,
  getReturnById,
  updateReturnStatus
};