import {useState, useEffect} from 'react';
import { useReq } from '../Hooks/useReq';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Dropdown({params}) {
    const { id, department, manager } = params.row;
    const [value, setValue] = useState(department || manager);
    const [options, setOptions] = useState([]);

    const field = department === undefined ? 'manager' : manager === undefined ? 'department' : 'department';
    const service = field === 'manager' ? 'employees' : 'departments';

    const { get } = useReq(() => {});  

    const setCellValue = () => {
      if(id){
        params.api.setEditCellValue({ id, field, value })
      }
    }

    useEffect(() => {
      const getOptions = async () => {
        const data = await get(service);
        const names = data.map((dep) => dep.name);
        setOptions(names);
        console.log(names);
      }

      getOptions();
    }, []);


    useEffect(() => {
      params.onChange && params.onChange({target:{
        name: field,
        value: value
      }});
    }, [value, field, params])


  
    return (
      <Select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={setCellValue}
        style={{width: "100%"}}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {options.map(name => <MenuItem key={name} value={name}>{name}</MenuItem> )}
      </Select>
    );
  }
