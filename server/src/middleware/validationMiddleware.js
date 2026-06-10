const validateRegister = (
  req,
  res,
  next
) => {

  const {
    full_name,
    email,
    password
  } = req.body;

  if (
    !full_name ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message:
      "All fields are required"
    });
  }

  next();
};

module.exports = {
  validateRegister
};