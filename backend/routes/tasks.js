const express = require("express");
const { Task, Employee } = require("../models/Task");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: Employee, as: "employee" }],
    });
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
