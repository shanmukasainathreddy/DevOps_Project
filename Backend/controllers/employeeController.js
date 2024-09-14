const Employee = require('../models/Employee');
const Department = require('../models/Department');


const getDidByName = async (name) => {
  if(name === ''){
    return null;
  }
  
  const department = await Department.findOne({ name });

  // if (!department) {
  //   throw 'Department not found';
  // }

  return !department ? null : department._id;
}


exports.createEmployee = async (req, res) => {
  try {
    const employeeData = {
      ...req.body,
      department: await getDidByName(req.body.department),
    };

    const employee = new Employee(employeeData);
    await employee.save();

    res.status(201).json(await exports.getEmployees());
  } catch (error) {
    console.log("Error Adding Employee", error)
    res.status(400).json({ message: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department').lean();

    const data = employees.map((item, index) => ({
      ...item, 
      id: index + 1, 
      birthday: item.birthday && item.birthday.toISOString().split('T')[0],
      department: item.department ? item.department.name : ''
    }));

    return !res ? data : res.json(data);
  } catch (error) {
    console.log("Error Getting Data", error);
    res.status(500).json({ message: error.message });
  }
};


exports.updateEmployee = async (req, res) => {
  try {
    const employeeData = {
      ...req.body,
      department: await getDidByName(req.body.department),
    };

    const employee = await Employee.findByIdAndUpdate(req.params.id, employeeData, { new: true, runValidators: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(await exports.getEmployees());
  } catch (error) {
    console.log("Error Updating Employee", error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const ids = (req.params.ids.split('-'));
    await Employee.deleteMany({ _id: { $in: ids } });
    res.json(await exports.getEmployees());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
