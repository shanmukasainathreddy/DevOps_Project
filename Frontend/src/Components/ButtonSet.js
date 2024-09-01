import { useState, useEffect } from 'react';
import { Box, ButtonGroup, Button, Modal } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { DepartmentForm, EmployeeForm } from './Forms';


export default function ButtonSet(props) {
    const { add, section, setSection, isLoading, setLoading, setTableData, itemsToRemove, editData, editItem, removeItems } = props;
    const [isModalOpen, setModelOpen] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({});
    }, [section])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#FFFFFF',
        border: '2px solid #000',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    const closeModel = () => setModelOpen(false);

    const switchSection = (value) => {
        setSection(value);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModel();
        const updatedData = await add(section, formData);
        setTableData(updatedData);
    };

    

    return (
        <Box sx={{ margin: "30px 0", position: "relative", display: "flex", justifyContent: "center"}}>
            <Box>
                <ButtonGroup aria-label="button group">
                    <LoadingButton
                        onClick={() => switchSection("employees")}
                        variant={section === "employees" ? "contained" : "outlined"}
                        loading={section === "employees" && isLoading}
                        loadingPosition="end"
                        size="large"
                        endIcon={<Diversity3Icon />}
                    >
                        Employees
                    </LoadingButton>

                    <LoadingButton
                        onClick={() => switchSection("departments")}
                        variant={section === "departments" ? "contained" : "outlined"}
                        loading={section === "departments" && isLoading}
                        loadingPosition="end"
                        size="large"
                        endIcon={<ApartmentIcon />}
                    >
                        Departments
                    </LoadingButton>
                </ButtonGroup>
            </Box>

            <Box sx={{ position: "absolute", right: "10px", width: "250px", display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" onClick={() => setModelOpen(true)}>ADD</Button>
                <Button variant="contained" onClick={editItem} disabled={typeof(editData) !== 'object'}>Edit</Button>
                <Button variant="contained" onClick={removeItems} color='error' disabled={itemsToRemove.length === 0}>Delete</Button>
            </Box>

            <Modal open={isModalOpen} onClose={closeModel}>
                <Box sx={style}>
                    <h2 style={{ textAlign: "center" }}>
                        {'Add a '}
                        {section.charAt(0).toUpperCase()}
                        {section.slice(1, -1)}
                    </h2>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& .MuiFormControl-root': { m: 1, width: '40ch' },
                        }}
                    >
                        {   
                            section === 'employees' ?
                            <EmployeeForm {...{formData, setFormData}} />   :
                            <DepartmentForm {...{formData, setFormData}} />
                        }
                        

                        <Box sx={{ mt: "25px", mb: "5px", display: "flex", justifyContent: "space-between", width: "85%" }}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                sx={{ width: "150px" }} 
                            > Add </Button>

                            <Button 
                                type="button" 
                                variant="contained" 
                                color='error' 
                                sx={{ width: "150px" }} 
                                onClick={closeModel} 
                            > Cancel </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

