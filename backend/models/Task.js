const { sequelize } = require("../database");
const Sequelize = require("sequelize");
const Employee = require("./Employee");

const Task = sequelize.define("task", {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  priorityLevel: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  completionStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Task.belongsTo(Employee);
Employee.hasMany(Task);

module.exports = { Employee, Task };
