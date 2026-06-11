const AppDataSource =
require("../config/data-source");

const createAddress = async (
  userId,
  addressData
) => {

  const addressRepository =
    AppDataSource.getRepository(
      "Address"
    );

  const address =
    addressRepository.create({
      ...addressData,
      user_id: userId
    });

  return await addressRepository.save(
    address
  );
};



const getAddresses = async (
  userId
) => {

  const addressRepository =
    AppDataSource.getRepository(
      "Address"
    );

  return await addressRepository.find({
    where: {
      user_id: userId
    }
  });
};







module.exports = {
  createAddress,
  getAddresses
};