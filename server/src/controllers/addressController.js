const addressService = require("../services/addressService");

const createAddress = async (
    req,res
) => {

    try{
        const address = await addressService.createAddress(
    req.user.id,
    req.body
  );
        

        res.status(201).json({
            success: true,
            date: address
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message: error.message
        });
    }
};



module.exports = {
    createAddress
};