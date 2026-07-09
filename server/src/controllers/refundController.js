const refundService =
require("../services/refundService");

const createRefund =
async (req, res) => {

  try {

    const refund =
      await refundService.createRefund(

        req.body,

        req.user.id

      );

    res.status(201).json({

      success: true,

      data: refund

    });

  }

  catch (error) {

    res.status(400).json({

      success: false,

      message: error.message

    });

  }

};

const getRefund =
async (req, res) => {

  try {

    const refund =
      await refundService.getRefundByReturnId(

        parseInt(req.params.returnId),

        req.user.id

      );

    res.status(200).json({

      success: true,

      data: refund

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  createRefund,

  getRefund

};