const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const departmentRoutes = require('./routes/departments');
const employeeRoutes = require('./routes/employees');


dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);

app.use((req, res) => {
  console.log(`${req.originalUrl} Endpoint Not found`);
  res.status(404).json({
      message: `${req.originalUrl} Endpoint Not found`
  });
});

app.use((error, req, res) => {
  console.log("Error :", error);
  res.status(500).json({
      message: error.message
  });
});


connectDB();


app.listen(5000, () => {
  console.log(`Server is running on port ${port}`);
});