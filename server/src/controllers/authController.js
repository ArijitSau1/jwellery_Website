const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppDataSource = require("../config/data-source");

const register = async (req, res) => {
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

    const existingUser =
      await userRepository.findOneBy({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = userRepository.create({
      full_name,
      email,
      phone,
      dob,
      password: hashedPassword
    });

    await userRepository.save(user);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};





const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const userRepository =
      AppDataSource.getRepository("User");

    const user =
      await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }



    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d"
      }
    );

    res.status(200).json({
      success: true,
      token
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


module.exports = {
  register,
  login
};