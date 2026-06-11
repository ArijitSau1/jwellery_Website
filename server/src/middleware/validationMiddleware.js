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


const validateAddress = (
  req,res,next
) => {

  const {
    full_name,
    phone,
    address,
    city,
    state,
    pincode
  } = req.body;


  if(
    !full_name ||
    !phone ||
    !city ||
    !state ||
    !pincode
  ) {

     return res.status(400).json({
      success:false,
      message:"All fields are required"
     });

  }

  next();

};




module.exports = {
  validateRegister,
  validateAddress
};