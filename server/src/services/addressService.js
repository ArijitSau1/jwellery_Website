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


const updateAddress = async (
  userId,
  addressId,
  addressData
) => {

  const addressRepository = 
       AppDataSource.getRepository(
        "Address"
       );


  const address = await addressRepository.findOneBy({
    id:parseInt(addressId),
    user_id: userId
  });

  if(!address){
    throw new Error(
      "Address not found"
    );
  }

  Object.assign(
    address,
    addressData
  );

  return await addressRepository.save(
    address
  );

};





module.exports = {
  createAddress,
  getAddresses,
  updateAddress
};