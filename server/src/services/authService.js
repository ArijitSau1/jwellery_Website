const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppDataSource = require("../config/data-source");

const registerUser = async (userData) => {

  const userRepository =
    AppDataSource.getRepository("User");

  const existingUser =
    await userRepository.findOneBy({
      email: userData.email
    });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword =
    await bcrypt.hash(
      userData.password,
      10
    );

  const user =
    userRepository.create({
      ...userData,
      password: hashedPassword
    });

  return await userRepository.save(user);
};

const loginUser = async (
  email,
  password
) => {

  const userRepository =
    AppDataSource.getRepository("User");

  const user =
    await userRepository.findOneBy({
      email
    });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );
};

module.exports = {
  registerUser,
  loginUser
};