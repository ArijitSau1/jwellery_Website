const AppDataSource = require("../config/data-source");



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



const getProfile = async (req, res) => {

    try {

        const userRepository =
            AppDataSource.getRepository("User");

        const user =
            await userRepository.findOneBy({
                id: req.user.id
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getUsers,
    getProfile
};

