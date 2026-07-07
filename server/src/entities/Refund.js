const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Refund",

  tableName: "refunds",

  columns: {

    id: {
      primary: true,
      type: "int",
      generated: true
    },

    return_id: {
      type: "int"
    },

    refund_method: {
      type: "enum",
      enum: [
        "UPI",
        "BANK",
        "ORIGINAL_PAYMENT"
      ]
    },

    upi_id: {
      type: "varchar",
      length: 100,
      nullable: true
    },

    bank_name: {
      type: "varchar",
      length: 100,
      nullable: true
    },

    account_holder: {
      type: "varchar",
      length: 100,
      nullable: true
    },

    account_number: {
      type: "varchar",
      length: 30,
      nullable: true
    },

    ifsc_code: {
      type: "varchar",
      length: 20,
      nullable: true
    },

    created_at: {
      type: "timestamp",
      createDate: true
    }

  }

});