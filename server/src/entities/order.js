const { EntitySchema } =
require("typeorm");

module.exports =
new EntitySchema({

  name: "Order",

  tableName: "orders",

  columns: {

    id: {
      primary: true,
      type: "int",
      generated: true
    },

    user_id: {
      type: "int"
    },

    product_name: {
      type: "varchar"
    },

    product_image: {
      type: "varchar",
      nullable: true
    },

    price: {
      type: "decimal",
      precision: 10,
      scale: 2
    },

    quantity: {
      type: "int",
      default: 1
    },

    status: {
      type: "varchar",
      default: "PENDING"
    },

    order_date: {
      type: "date"
    }

  }

});