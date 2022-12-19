const express = require("express");
const tasksRouter = require("./routes/tasks");
const employeesRouter = require("./routes/employees");
const { sequelize } = require("./database");

const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);
app.use("/employees", employeesRouter);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
});
