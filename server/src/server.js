require("dotenv").config();

const AppDataSource =
require("./config/data-source");

const app = require("./app");

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {

    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(
        `Server Running On Port ${PORT}`
      );
    });

  })
  .catch((error) => {
    console.log(error);
  });