const returnService = require("../services/returnService");

const createReturn = async (req, res) => {
  try {

    const returnRequest =
      await returnService.createReturn({

        user_id: req.user.id,

        order_id: req.body.order_id,

        type: req.body.type,

        reason: req.body.reason,

        comment: req.body.comment,

        product_image: req.body.product_image

      });

    res.status(201).json({
      success: true,
      data: returnRequest
    });

  } catch (error) {

  res.status(400).json({
    success: false,
    message: error.message
  });

}
};

const getReturns = async (req, res) => {
  try {

    const returns =
      await returnService.getReturns();

    res.status(200).json({
      success: true,
      data: returns
    });

  } catch (error) {

  res.status(400).json({
    success: false,
    message: error.message
  });

}
};

const getReturnById = async (req, res) => {
  try {

    const returnRequest =
      await returnService.getReturnById(
        parseInt(req.params.id)
      );

    if (!returnRequest) {
      return res.status(404).json({
        success: false,
        message: "Return request not found"
      });
    }

    res.status(200).json({
      success: true,
      data: returnRequest
    });

  } catch (error) {

  res.status(400).json({
    success: false,
    message: error.message
  });

}
};

const updateReturnStatus = async (req, res) => {
  try {

    const returnRequest =
      await returnService.updateReturnStatus(

        parseInt(req.params.id),

        req.body.status

      );

    res.status(200).json({
      success: true,
      message: "Return status updated successfully",
      data: returnRequest
    });

  } catch (error) {

  res.status(400).json({
    success: false,
    message: error.message
  });

}
};


const updatePickupAddress = async (
  req,
  res
) => {

  try {

    const data =
      await returnService.updatePickupAddress(

        parseInt(req.params.id),

        req.body.pickup_address_id,

        req.user.id

      );

    res.status(200).json({
      success: true,
      message: "Pickup address updated successfully",
      data
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



const confirmReturn =
async (req,res)=>{

try{

const data=
await returnService.confirmReturn(

parseInt(req.params.id),

req.user.id

);

res.status(200).json({

success:true,

message:
"Return confirmed successfully",

data

});

}

catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};


module.exports = {
  createReturn,
  getReturns,
  getReturnById,
  updateReturnStatus,
  updatePickupAddress,
  confirmReturn
};