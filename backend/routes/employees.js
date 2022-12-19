const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

//!We'll do the following:
/**
 * * GET /employees: retrieves all employees from the database
 * * GET /employees/:id: retrieves a single employee based on their id, including their tasks
 * * POST /employees: adds a new employee to the database
 * * PUT /employees/:id: updates an existing employee in the database
 * * DELETE /employees/:id: deletes an employee from the database
 */

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [{ model: Task, as: "tasks" }],
    });
    if (!employee) {
      res.status(404).send("Employee not found");
      return;
    }
    res.json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new employee
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an existing employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      res.status(404).send("Employee not found");
      return;
    }
    await employee.update(req.body);
    res.json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      res.status(404).send("Employee not found");
      return;
    }
    await employee.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
