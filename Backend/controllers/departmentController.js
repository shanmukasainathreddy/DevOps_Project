const Employee = require('../models/Employee');
const Department = require('../models/Department');


const getEmpIdByName = async (name) => {
  if(name === ''){
    return null;
  }

  const employee = await Employee.findOne({ name });

  if (!employee) {
    throw 'Employee not found';
  }

  return employee._id;
}

exports.createDepartment = async (req, res) => {
  try {
    const departmentData = {
      ...req.body,
      manager: await getEmpIdByName(req.body.manager),
    };

    const department = new Department(departmentData);
    await department.save();
    res.status(201).json(await exports.getDepartments());
  } catch (error) {
    console.log("Error Adding Department", error)
    res.status(400).json({ message: error.message });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('manager').lean();
    const employeeCountByDepartment = await Department.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "department",
          as: "employees"
        }
      },
      {
        $addFields: {
          numberOfEmployees: { $size: "$employees" }
        }
      },
      {
        $lookup: {
          from: "employees",
          localField: "manager",
          foreignField: "_id",
          as: "managerDetails"
        }
      },
      {
        $unwind: {
          path: "$managerDetails",
          preserveNullAndEmptyArrays: true 
        }
      },
      {
        $project: {
          _id: 1,
          name: "$name",
          location: "$location",
          manager: "$managerDetails.name",
          numberOfEmployees: 1
        }
      }
    ]);
    

    const data = employeeCountByDepartment.map((item, index) => ({
      ...item, 
      id: index + 1,
    }));

    return !res ? data : res.json(data);
  } catch (error) {
    console.log("Error Getting Department Data", error);
    res.status(500).json({ message: error.message });
  }
};


exports.updateDepartment = async (req, res) => {
  try {
    const departmentData = {
      ...req.body,
      manager: await getEmpIdByName(req.body.manager),
    };

    const department = await Department.findByIdAndUpdate(req.params.id, departmentData, { new: true, runValidators: true });
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(await exports.getDepartments());
  } catch (error) {
    console.log("Error Updating Department", error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    console.log("params", req.params)
    const ids = req.params.ids.split('-');
    await Department.deleteMany({ _id: { $in: ids } });
    res.json(await exports.getDepartments());
  } catch (error) {
    console.log("Error Deleting Departments", error);
    res.status(500).json({ message: error.message });
  }
};
