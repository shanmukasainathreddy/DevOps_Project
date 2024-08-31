import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { DataGrid } from "@mui/x-data-grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Dropdown from "./Components/Dropdown";
import "./App.css";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [section, setSection] = useState("employees");
  

  const handleClick = (value) => {
    setSection(value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const handleCellEditStart = (params) => {
    console.log("Cell edit started:", params);
  };

  const handleProcessRowUpdateError = (error) => {
    // console.log('Error processing row update:', error);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      sortable: true,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "First name",
      sortable: true,
      editable: true,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      sortable: true,
      editable: true,
      flex: 1,
    },
    {
      field: "department",
      headerName: "Depertment",
      sortable: true,
      editable: true,
      flex: 1,
      renderEditCell: (params) => <Dropdown params={params} />
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      sortable: true,
      editable: true,
      flex: 1,
    },
    {
      field: "birthday",
      headerName: "Birthday",
      sortable: true,
      editable: true,
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      sortable: true,
      editable: false,
      flex: 1,
      valueGetter: (value, row) => {
        const birthYear = new Date(row.birthday).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
      },
    },
    {
      field: "save",
      headerName: "",
      sortable: false,
      width: 70,
      editable: true,
      flex: 1,
      align: "center",
      renderEditCell: () => <Button variant="contained">Save</Button>,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", birthday: "1996-05-13", department: "HR" },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      birthday: "1996-05-13",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      birthday: "1996-05-13",
    },
    { id: 4, lastName: "Stark", firstName: "Arya", birthday: "1996-05-13" },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      birthday: "1996-05-13",
    },
    { id: 6, lastName: "Melisandre", firstName: null, birthday: "1996-05-13" },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      birthday: "1996-05-13",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      birthday: "1996-05-13",
    },
    { id: 9, lastName: "Roxie", firstName: "Harvey", birthday: "1996-05-13" },
  ];

  return (
    <div className="App">
      <AppBar position="static">
        <h1>Employee Management System</h1>
      </AppBar>

      <ButtonGroup aria-label="button group" sx={{ margin: "30px 0" }}>
        <LoadingButton
          onClick={() => handleClick("employees")}
          variant={section === "employees" ? "contained" : "outlined"}
          loading={section === "employees" && isLoading}
          loadingPosition="end"
          endIcon={<Diversity3Icon />}
        >
          Employees
        </LoadingButton>

        <LoadingButton
          onClick={() => handleClick("departments")}
          variant={section === "departments" ? "contained" : "outlined"}
          loading={section === "departments" && isLoading}
          loadingPosition="end"
          endIcon={<ApartmentIcon />}
        >
          Departments
        </LoadingButton>
      </ButtonGroup>

      <DataGrid
        rows={rows}
        disableColumnMenu={true}
        hideFooterPagination={true}
        columns={columns}
        editMode="row"
        loading={isLoading}
        checkboxSelection
        sx={{ border: 0 }}
        onRowSelectionModelChange={(a) => console.log("log", a)}
        processRowUpdate={handleCellEditStart}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}

export default App;
