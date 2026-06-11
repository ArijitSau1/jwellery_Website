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
            data: address
        });
    } catch(error) {

         console.log(error);
        res.status(500).json({
            success:false,
            message: error.message
        });
    }
};



const getAddresses = async(
    req,res
) =>{
    try{

        const address = await addressService.getAddresses(
            req.user.id
        );

        res.status(200).json({
            success:true,
            data: address
        });

    } catch (error){
        res.status(500).json({
            success:false,
            massage: error.message
        });
    }
};


module.exports = {
    createAddress,
    getAddresses
};