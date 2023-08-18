import React from 'react'
// import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';

import { createEmp } from "./helper/helper"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Input from '@mui/material/Input';

// import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//swal alert
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const AddNew = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const departments = [
        { label: 'IT' },
        { label: 'Finance' },
        { label: 'Production' },
        { label: 'Manufacturing' },
    ]


    const {values, handleSubmit, handleChange} = useFormik({
      initialValues : {
        empId: '',
        empName: '',
        epf: '',
        department: 'IT',
        gender: 'female',
        dob: '',
      },
      onSubmit : async values => {  
          // //console.log(values)
          // createEmp(values)

          try {
            // Call the createEmp function to insert data
            const createEmpPromise = createEmp(values);
      
            createEmpPromise.then(() => {
              setOpen(false);

              Swal.fire({
                title: 'Register Successfully',
                text: 'You have been registered successfully.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
              });
              //navigate('/login');
            }).catch((error) => {
              const errMsg = JSON.stringify(error.error.error);
              Swal.fire({
                title: 'Registration Failed',
                text: errMsg,
                icon: 'error',
              });
            });

          } catch (error) {
            // Handle errors if needed
            console.error('Error:', error);
          }
      }
  })

  return (
    <div>
      <Button 
      variant="contained"
      onClick={handleClickOpen}>
        Add Employee
      </Button>

    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Create New Employee"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <>
            <form onSubmit={handleSubmit}>
                <TextField
                  name="empId"
                  value={values.empId}
                  onChange={handleChange}
                  label="Employee Id"
                  sx={{ width: '100%', marginTop:'15px' }}
                />
                <TextField
                  name="empName"
                  value={values.empName}
                  onChange={handleChange}
                  label="Employee Name"
                  sx={{ width: '100%', marginTop:'15px' }}
                />
                <TextField
                  name="epf"
                  label="EPF No"
                  value={values.epf}
                  onChange={handleChange}
                  sx={{ width: '100%' , marginTop:'15px' }} 
                />
                {/* <Autocomplete
                  name="department"
                  //disablePortal
                  value={values.department}
                  onChange={handleChange}
                  id="combo-box-demo"
                  style={{ marginTop: '15px', marginBottom: '15px' }}
                  options={departments}
                  renderInput={(params) => <TextField {...params} label="Department" />}
                /> */}

                <Autocomplete
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  // onChange={(event, newValue) => {
                  //   setFieldValue('department', newValue); // Update the formik field value
                  // }}
                  id="combo-box-demo"
                  style={{ marginTop: '15px', marginBottom: '15px' }}
                  options={departments}
                  renderInput={(params) => <TextField {...params} label="Department" />}
                />

                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  value={values.gender}
                  onChange={(event) => {
                    handleChange(event); // Handle change for formik
                  }}
                  name="gender"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>

                <TextField
                  name="dob"
                  label="Date of Birth"
                  value={values.dob}
                  onChange={handleChange}
                  sx={{ width: '100%', marginTop:'10px' }}
                />
                <DialogActions>
                  <Button variant='contained' type='submit'>Create</Button>
                  <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                </DialogActions>
              </form>
          </>
        </DialogContentText>
      </DialogContent>
    </Dialog>

    </div>
  )
}

export default AddNew