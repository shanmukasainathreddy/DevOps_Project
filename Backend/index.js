
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const departmentRoutes = require('./routes/departments');
const employeeRoutes = require('./routes/employees');

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);


connectDB();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});