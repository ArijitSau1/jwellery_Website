const AppDataSource =
require("../config/data-source");

const getProfile = async (id) => {

  const userRepository =
    AppDataSource.getRepository("User");

  return await userRepository.findOneBy({
    id
  });
};

const updateProfile = async (
  id,
  data
) => {

  const userRepository =
    AppDataSource.getRepository("User");

  const user =
    await userRepository.findOneBy({
      id
    });

  if (!user) {
    throw new Error("User not found");
  }

  user.full_name =
    data.full_name || user.full_name;

  user.phone =
    data.phone || user.phone;

  user.dob =
    data.dob || user.dob;

  return await userRepository.save(
    user
  );
};

module.exports = {
  getProfile,
  updateProfile
};