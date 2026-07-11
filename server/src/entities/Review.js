const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({

  name: "Review",

  tableName: "reviews",

  columns: {

    id: {
      primary: true,
      type: "int",
      generated: true
    },

    user_id: {
      type: "int"
    },

    order_id: {
      type: "int"
    },

    rating: {
      type: "int"
    },

    review: {
      type: "text"
    },

    created_at: {
      type: "timestamp",
      createDate: true
    }

  }

});