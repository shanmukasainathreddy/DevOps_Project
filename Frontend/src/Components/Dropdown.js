import {useState} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Dropdown({params}) {
    const { id, department: current } = params.row;
    const [department, setDepartment] = useState(current);
  
    return (
      <Select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        onBlur={() => params.api.setEditCellValue({ id, field: 'department', value: department })}
        label="Department"
        style={{width: "100%"}}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        <MenuItem value="HR">HR</MenuItem>
        <MenuItem value="Sales">Sales</MenuItem>
        <MenuItem value="Marketing">Marketing</MenuItem>
        <MenuItem value="Production">Production</MenuItem>
      </Select>
    );
  }
