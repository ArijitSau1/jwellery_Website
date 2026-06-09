require("reflect-metadata");

const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "mysql",

  host: "localhost",
  port: 3306,

  username: "root",
  password: "",

  database: "jewellery_db",

  synchronize: true,

  logging: false,

  entities: [require("../entities/User")],
});

module.exports = AppDataSource;