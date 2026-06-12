const validateRegister = (
  req,
  res,
  next
) => {

  const {
    full_name,
    email,
    phone,
    dob,
    password
  } = req.body;

  const errors = [];

  
  if (!full_name) {
    errors.push(
      "Full name is required"
    );
  } else if (
    !/^[A-Za-z ]+$/.test(
      full_name
    )
  ) {
    errors.push(
      "Full name should contain only letters"
    );
  }

  
  if (!email) {
    errors.push(
      "Email is required"
    );
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    )
  ) {
    errors.push(
      "Invalid email format"
    );
  }

  
  if (!phone) {
    errors.push(
      "Phone number is required"
    );
  } else if (
    !/^[0-9]{10}$/.test(
      phone
    )
  ) {
    errors.push(
      "Phone number must be 10 digits"
    );
  }

  
  if (!dob) {
    errors.push(
      "Date of birth is required"
    );
  }

  
  if (!password) {
    errors.push(
      "Password is required"
    );
  } else if (
    password.length < 6
  ) {
    errors.push(
      "Password must be at least 6 characters"
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};



const validateLogin = (
  req,
  res,
  next
) => {

  const {
    email,
    password
  } = req.body;

  const errors = [];

  
  if (!email) {
    errors.push(
      "Email is required"
    );
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    )
  ) {
    errors.push(
      "Invalid email format"
    );
  }

 
  if (!password) {
    errors.push(
      "Password is required"
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};





const validateAddress = (
  req,
  res,
  next
) => {

  const {
    full_name,
    phone,
    address,
    city,
    state,
    pincode
  } = req.body;

  const errors = [];

  
  if (!full_name) {
    errors.push(
      "Full name is required"
    );
  } else if (
    !/^[A-Za-z ]+$/.test(full_name)
  ) {
    errors.push(
      "Full name should contain only letters"
    );
  }

  
  if (!phone) {
    errors.push(
      "Phone number is required"
    );
  } else if (
    !/^[0-9]{10}$/.test(phone)
  ) {
    errors.push(
      "Phone number must be 10 digits"
    );
  }

  
  if (!address) {
    errors.push(
      "Address is required"
    );
  }

  
  if (!city) {
    errors.push(
      "City is required"
    );
  }

 
  if (!state) {
    errors.push(
      "State is required"
    );
  }

  
  if (!pincode) {
    errors.push(
      "Pincode is required"
    );
  } else if (
    !/^[0-9]{6}$/.test(pincode)
  ) {
    errors.push(
      "Pincode must be 6 digits"
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};




module.exports = {
  validateRegister,
  validateLogin,
  validateAddress
};