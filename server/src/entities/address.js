const{EntitySchema} = require("typeorm");
module.exports = new EntitySchema({
    name:"Address",
    tableName: "addresses",


    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
    
        },

        full_name: {
            type: "varchar",
        },


        phone: {
            type: "varchar",
        },

        address: {
            type:"text"
        },

        city: {
            type:"varchar",
        },

        state:{
            type:"varchar",
        },

        pincode: {
            type:"varchar",
        },

        is_default: {
            type:"boolean",
            default:false,
        },
    },

});