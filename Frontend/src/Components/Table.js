import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import Dropdown from "./Dropdown";
import { DateInput } from "./Forms";

const columns = [
  {
    field: "id",
    headerName: "ID",
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


export default function Table({ isLoading, tableData, setItemsToRemove, setEditData }) {

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
      columns={columns}
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
