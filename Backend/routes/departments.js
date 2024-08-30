const express = require('express');
const router = express.Router();
const controller = require('../controllers/departmentController');

// Create department
router.post('/', controller.createDepartment);

// Get all departments
router.get('/', controller.getDepartments);

// Get department by ID
router.get('/:id', controller.getDepartmentById);

// Update department
router.put('/:id', controller.updateDepartment);

// Delete department
router.delete('/:id', controller.deleteDepartment);

module.exports = router;
