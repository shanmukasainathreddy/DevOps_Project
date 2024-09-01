const express = require('express');
const router = express.Router();
const controller = require('../controllers/departmentController');

// Create department
router.post('/', controller.createDepartment);

// Get all departments
router.get('/', controller.getDepartments);

// Update department
router.put('/:id', controller.updateDepartment);

// Delete department
router.delete('/:ids', controller.deleteDepartment);

module.exports = router;
