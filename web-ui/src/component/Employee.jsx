import React,{useState, useEffect} from 'react'
import AddNew from './AddNew';

import {getAllEmp, deleteEmp, getEmp} from "./helper/helper"

//table
import DataTable from "react-data-table-component"

//swal alert
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const Employee = () => {
  //new popup 
  const [isOpen, setOpen] = useState(false);

 //set db data
  const [rows, setRows] = useState([]);

  // Data table
  const columns = [
    {
      name : 'Emp Id',
      selector :  row => row.empId,
      sortable : true
    },
    {
      name : 'Name',
      selector :  row => row.empName,
      sortable : true
    },
    {
      name : 'EPF',
      selector :  row => row.epf,
      sortable : true
    },
    {
      name : 'Department',
      selector :  row => row.department,
      sortable : true
    },
    {
        name : 'Gender',
        selector :  row => row.gender,
        sortable : true
    },
    {
        name : 'DOB',
        selector :  row => row.dob,
        sortable : true
    },
    {
        name : 'Action',
        cell: (row) => (
            <div>
              <button className='m-1 p-2 text-white bg-blue-700 rounded-xl' onClick={() => handleEdit(row)}>Edit</button>
              <button className='m-1 p-2 text-white bg-red-700 rounded-xl' onClick={() => handleDelete(row)}>Delete</button>
            </div>
          ),
    },

    
  ];

  useEffect(()=>{

    async function loadData(){
        const response = await getAllEmp();
        const data = response.data; // Extract the data array from the response
        console.log(data);
        setRows(data);
    }

    loadData()
},[])

// EMPLOYEE EDIT
  const handleEdit = (row) => {
    // Implement edit logic using the row data
    const id = row.empId
    const detEmp = getEmp(id);
    console.log('Edit:', detEmp);
    setOpen(true)
  };


  // EMPLOYEE DELETE
  const handleDelete = async (row) => {
    Swal.fire({
        title: 'Do you want to delete?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass:{
          popup:'my-popup-class'
        }
      }).then((result) => {
        if (result.isConfirmed) {
            try {
                deleteEmp(row.empId); 
                // Update the rows state after deletion
                setRows((prevRows) => prevRows.filter((r) => r.empId !== row.empId));
                console.log('Deleted:', row);
                
                //alsert fire
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Employee has been deleted.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                  });

              } catch (error) {
                console.error('Error deleting:', error);
              }
        }})
  };

  return (
    <div className='container '>

        {/* aplication popup */}
        <div className='mb-6 float-right'>
            <AddNew />
        </div>

        {/* data Table */}
        <>
        <DataTable
            columns={columns}
            data ={rows}
            // selectableRows
            //onSelectedRowsChange={handleSelectedRowsChange}
            fixedHeader
            pagination
            className='z-0' 
            customStyles={{
              table: {
                style: {
                  //backgroundColor: 'transparent', // Set the background color of the table to transparent
                 // font:'white',
                },
              },
              headRow: {
                style: {
                  //backgroundColor: '#1a202b', // Set the background color of the table header row to transparent
                  //color: 'white',
                  //fontWeight: 'bold',
                  fontSize:'18px',
                },
              },
              rows: {
                style: {
                  backgroundColor: 'transparent', // Set the background color of the table rows to transparent
                 // color: 'white',
                  fontSize:'16px',
                },
              },
              pagination:{
                style: {
                  backgroundColor: 'transparent', // Set the background color of the table rows to transparent
                 // color: 'white',
                  fontSize:'16px',
                  
                },
              },
            }}
        />
        </>
    </div>
  )
}

export default Employee