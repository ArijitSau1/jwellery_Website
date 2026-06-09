const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    full_name: {
      type: "varchar",
      length: 100,
    },

    email: {
      type: "varchar",
      unique: true,
    },

    phone: {
      type: "varchar",
      nullable: true,
    },

    dob: {
      type: "date",
      nullable: true,
    },

    password: {
      type: "varchar",
    },
  },
});