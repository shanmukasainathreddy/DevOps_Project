const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  position: {
    type: String,
  },
  salary: {
    type: Number,
  },
  birthday: {
    type: Date,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
