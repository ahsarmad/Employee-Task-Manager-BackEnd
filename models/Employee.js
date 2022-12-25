const { sequelize } = require("../database");
const Sequelize = require("sequelize");

const Employee = sequelize.define("employee", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Employee;
