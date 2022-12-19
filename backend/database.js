const Sequelize = require("sequelize");
const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

module.exports = { sequelize };
