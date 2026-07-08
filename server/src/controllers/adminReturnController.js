const adminReturnService =
require("../services/adminReturnService");

const schedulePickup =
async (req,res)=>{

try{

const data =
await adminReturnService.updateWorkflowStatus(

parseInt(req.params.id),

"PICKUP_PENDING",

"PICKUP_SCHEDULED"

);

res.status(200).json({

success:true,

message:"Pickup scheduled successfully",

data

});

}catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};

const pickupCompleted =
async(req,res)=>{

try{

const data =
await adminReturnService.updateWorkflowStatus(

parseInt(req.params.id),

"PICKUP_SCHEDULED",

"PICKUP_COMPLETED"

);

res.status(200).json({

success:true,

message:"Pickup completed",

data

});

}catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};

const refundProcessing =
async(req,res)=>{

try{

const data =
await adminReturnService.updateWorkflowStatus(

parseInt(req.params.id),

"PICKUP_COMPLETED",

"REFUND_PROCESSING"

);

res.status(200).json({

success:true,

message:"Refund processing started",

data

});

}catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};

const refundCompleted =
async(req,res)=>{

try{

const data =
await adminReturnService.updateWorkflowStatus(

parseInt(req.params.id),

"REFUND_PROCESSING",

"REFUND_COMPLETED"

);

res.status(200).json({

success:true,

message:"Refund completed",

data

});

}catch(error){

res.status(400).json({

success:false,

message:error.message

});

}

};

module.exports={

schedulePickup,

pickupCompleted,

refundProcessing,

refundCompleted

};