const AppDataSource = require("../config/data-source");

const getOrders = async(
    userId
) =>{
    const orderRepository = AppDataSource.getRepository(
        "Order"
    );

    return await orderRepository.find({
        where:{
            user_id:userId
        }
    });
};


module.exports ={
    getOrders
};