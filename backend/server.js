const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");
const employeesRouter = require("./routes/employees");
const { sequelize } = require("./database");
const port = process.env.PORT || 3000;
const app = express();

{
  /**
   * * added cors to prevent server blocking for the front end. I have been
   * * deploying the frontend on localhost:3001 and the
   * * backend on localhost:3000. You can adjust these based on the
   * * configurations you prefer. For production purposes and global server
   * * deployment, I would probably take a more sophisticated approach, and have
   * * these deployed on a cloud system
   */
}

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.use(express.json());

app.use("/tasks", tasksRouter);
app.use("/employees", employeesRouter);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
