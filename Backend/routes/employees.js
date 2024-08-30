const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');

// Create employee
router.post('/', controller.createEmployee);

// Get all employees
router.get('/', controller.getEmployees);

// Get employee by ID
router.get('/:id', controller.getEmployeeById);

// Update employee
router.put('/:id', controller.updateEmployee);

// Delete employee
router.delete('/:id', controller.deleteEmployee);

module.exports = router;
