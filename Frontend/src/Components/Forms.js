import dayjs from 'dayjs';
import { InputLabel, FormControl, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Dropdown from './Dropdown';



export function EmployeeForm({ formData, setFormData }) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevEmployee) => (
            {...prevEmployee, [name]: value}
        ));
    };


    return (
        <>
            <TextField
                label="Name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                variant="outlined"
                required
            />
            <TextField
                label="Position"
                name="position"
                value={formData.position || ''}
                onChange={handleChange}
                variant="outlined"
                required
            />
            <TextField
                label="Email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                variant="outlined"
                required
                type="email"
            />
            <TextField
                label="Salary"
                name="salary"
                value={formData.salary || ''}
                onChange={handleChange}
                variant="outlined"
                required
                type="number"
            />
            <FormControl variant="outlined">
                <InputLabel id="department-label">Department</InputLabel>
                <Dropdown params={{row:{department: formData.department || ''}, onChange: handleChange, }}/>
            </FormControl>

            <DateInput value={formData.birthday} onChange={(date) => handleChange({
                target:{name: "birthday", value: date}}
            )} />
        </> 
    );
}


export function DepartmentForm({ formData, setFormData, }) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevEmployee) => (
            {...prevEmployee, [name]: value}
        ));
    };


    return (
        <>
            <TextField
                label="Name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                variant="outlined"
                required
            />
            <TextField
                label="Location"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                variant="outlined"
                required
            />
            <FormControl variant="outlined" required>
                <InputLabel id="Manager-label">Manager</InputLabel>
                <Dropdown params={{row:{manager: formData.manager || ''}, onChange: handleChange }}/>
            </FormControl>
        </> 
    );
}




export function DateInput({value, onChange}){
    const requiredDate = dayjs().subtract(18, 'year');

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
                label="Birthday"
                format='YYYY-MM-DD'
                value={!value ? requiredDate : dayjs(value)}
                maxDate={requiredDate}
                onChange={(date) => onChange(date.format('YYYY-MM-DD'))}
            />
        </LocalizationProvider>
    )

}

