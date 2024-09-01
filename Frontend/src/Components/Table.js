import { DataGrid } from "@mui/x-data-grid";
import Dropdown from "./Dropdown";
import { DateInput } from "./Forms";

const empColumns = [
  {
    field: "id",
    headerName: "No",
    sortable: true,
    editable: false,
  },
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    editable: true,
    flex: 1,
  },
  {
    field: "position",
    headerName: "Position",
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
    align: "left",
    flex: 1,
  },
  {
    field: "birthday",
    headerName: "Birthday",
    sortable: true,
    editable: true,
    flex: 1,
    renderEditCell: (params) => {
      console.log(params)
      return <DateInput 
        value={params.value} 
        onChange={(value) => params.api.setEditCellValue({ 
          id: params.id, 
          field: 'birthday', 
          value 
        })} />
    }
  },
  {
    field: "email",
    headerName: "Email",
    sortable: true,
    editable: true,
    flex: 1,
  },
];

const depColumns = [
  {
    field: "id",
    headerName: "No",
    sortable: true,
    editable: false,
  },
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    editable: true,
    flex: 1,
  },
  {
    field: "location",
    headerName: "Location",
    sortable: true,
    editable: true,
    flex: 1,
  },
  {
    field: "manager",
    headerName: "Manager",
    sortable: true,
    editable: true,
    flex: 1,
    renderEditCell: (params) => <Dropdown params={params} />,
  },
  {
    field: "numberOfEmployees",
    headerName: "Number Of Employees",
    type: "number",
    sortable: true,
    editable: false,
    align: "center",
    flex: 1,
  },
];


export default function Table({ section, isLoading, tableData, setItemsToRemove, setEditData }) {

  const processRowUpdate = (params) => {
    console.log("Cell edit started:", params);

    const data = Object.keys(params).reduce((acc, key) => {
      if (key !== 'id' && key !== '_id' && key !== 'save' && key !== '__v') {
        acc[key] = params[key];
      }
      return acc;
    }, {});
    
    setEditData({id: "/" + params._id, data: data});
  };

  const handleProcessRowUpdateError = (error) => {
    // console.log('Error processing row update:', error);
  };



  return (
    <DataGrid
      rows={tableData}
      disableColumnMenu={true}
      hideFooterPagination={true}
      columns={section === 'employees' ? empColumns : depColumns}
      editMode="row"
      loading={isLoading}
      checkboxSelection
      sx={{ border: 0 }}
      onRowSelectionModelChange={(ids,opt) => setItemsToRemove(ids.map(id=> (opt.api.getRowParams(id)).row._id))}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      experimentalFeatures={{ newEditingApi: true }}
    />
  )
}
