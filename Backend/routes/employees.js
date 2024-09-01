const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');

// Create employee
router.post('/', controller.createEmployee);

// Get all employees
router.get('/', controller.getEmployees);

// Update employee
router.put('/:id', controller.updateEmployee);

// Delete employee
router.delete('/:ids', controller.deleteEmployee);

module.exports = router;
