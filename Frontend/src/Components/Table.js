import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import Dropdown from "./Dropdown";


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
    renderEditCell: (params) => <Dropdown params={params} />,
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



export default function Table({ isLoading, tableData, setDeleteActive }) {

  const handleCellEditStart = (params) => {
    console.log("Cell edit started:", params);
  };

  const handleProcessRowUpdateError = (error) => {
    // console.log('Error processing row update:', error);
  };


  return (
    <DataGrid
      rows={tableData}
      disableColumnMenu={true}
      hideFooterPagination={true}
      columns={columns}
      editMode="row"
      loading={isLoading}
      checkboxSelection
      sx={{ border: 0 }}
      onRowSelectionModelChange={(a) => setDeleteActive(a.length === 0)}
      processRowUpdate={handleCellEditStart}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      experimentalFeatures={{ newEditingApi: true }}
    />
  )
}
