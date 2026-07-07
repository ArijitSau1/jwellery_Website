const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Return",
  tableName: "returns",

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

    type: {
      type: "enum",
      enum: ["RETURN", "EXCHANGE"]
    },

    reason: {
      type: "text"
    },

    comment: {
      type: "text",
      nullable: true
    },

    product_image: {
      type: "varchar",
      length: 255,
      nullable: true
    },

    status: {
      type: "enum",
      enum: [
        "PENDING",
        "APPROVED",
        "REJECTED",
        "COMPLETED"
      ],
      default: "PENDING"
    },

    workflow_status: {
  type: "enum",
  enum: [
    "REQUESTED",
    "PICKUP_PENDING",
    "PICKUP_COMPLETED",
    "REFUND_PROCESSING",
    "REFUND_COMPLETED",
    "CANCELLED"
  ],
  default: "REQUESTED"
},

    pickup_address_id: {
    type: "int",
    nullable: true
},

    created_at: {
      type: "timestamp",
      createDate: true
    }

  }
});