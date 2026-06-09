const AppDataSource = require("../config/data-source");



const createUser = async (req, res) => {
  try {

    const {
      full_name,
      email,
      phone,
      dob,
      password
    } = req.body;

    const userRepository =
      AppDataSource.getRepository("User");

    const user = userRepository.create({
      full_name,
      email,
      phone,
      dob,
      password
    });

    await userRepository.save(user);

    res.status(201).json({
      success: true,
      message: "User Created",
      data: user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


const getUsers = async (req, res) => {
  try {

    const userRepository =
      AppDataSource.getRepository("User");

    const users =
      await userRepository.find();

    res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  getUsers,
  createUser
};