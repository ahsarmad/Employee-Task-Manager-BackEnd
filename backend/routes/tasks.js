const express = require("express");
const { Task, Employee } = require("../models/Task");

const router = express.Router();

//! We'll do the following:
/**
 * * GET /tasks: retrieves all tasks from the database, including the employee assigned to each task
 * * GET /tasks/:id: retrieves a single task based on its id, including the employee assigned to the task
 * * `POST /tasks
 */

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [{ model: Employee, as: "employee" }],
    });
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an existing task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    await task.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

//

// Return all tasks in the database
router.get("/", (req, res) => {
  Task.findAll()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error retrieving tasks." });
    });
});

// Return a single task based on its id
router.get("/:id", (req, res) => {
  Task.findByPk(req.params.id)
    .then((task) => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: "Task not found." });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error retrieving task." });
    });
});

// Create a new task
router.post("/", (req, res) => {
  Task.create(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error creating task." });
    });
});

// Update an existing task
router.put("/:id", (req, res) => {
  Task.findByPk(req.params.id)
    .then((task) => {
      if (task) {
        return task.update(req.body);
      } else {
        res.status(404).json({ message: "Task not found." });
      }
    })
    .then((task) => {
      res.json(task);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error updating task." });
    });
});

// Delete a task
router.delete("/:id", (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((numDeleted) => {
      if (numDeleted) {
        res.json({ message: "Task deleted." });
      } else {
        res.status(404).json({ message: "Task not found." });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error deleting task." });
    });
});

module.exports = router;
