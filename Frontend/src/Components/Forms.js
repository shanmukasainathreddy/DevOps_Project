import dayjs from 'dayjs';
import { MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



export function EmployeeForm({ formData, setFormData }) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevEmployee) => (
            {...prevEmployee, [name]: value}
        ));
    };

    const requiredDate = dayjs().subtract(18, 'year');

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
            <FormControl variant="outlined" required>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                    labelId="department-label"
                    label="Department"
                    name="department"
                    value={formData.department || ''}
                    onChange={handleChange}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Production">Production</MenuItem>
                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label="Birthday"
                    format='YYYY-MM-DD'
                    value={!formData.birthday ? requiredDate : dayjs(formData.birthday)}
                    maxDate={requiredDate}
                    onChange={(date) => handleChange({
                        target:{name: "birthday", value: date.format('YYYY-MM-DD')}}
                    )}
                />
            </LocalizationProvider>
        </> 
    );
}

