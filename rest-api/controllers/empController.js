import employee from "../models/employee.js";

//create employee
export async function createEmp(req, res){
    
    const {empId,empName,epf,department,gender,dob} = req.body;
    
    try {
        const existingEmployee = await employee.findOne({ empId });

        if (existingEmployee) {
          // Employee with the provided empId already exists
          return res.status(409).send('Employee already registered');
        }

        const newEmployee = new employee({
            empId,
            empName,
            epf,
            department,
            gender,
            dob
        });

        const savedEmployee = await newEmployee.save();
    
        res.status(201).send(savedEmployee);    

    } catch (error) {
        console.log(error)
    }
}

//get all employee details
export async function allEmp(req, res){
    try {
        const allEmp = await employee.find({})
        res.send(allEmp);
    } catch (error) {
        console.log(error)
    }
}

//get Employee details
export async function getEmp(req, res){

    const {empId} = req.params;

    try {
        const emp = await employee.findOne({empId : empId })
        res.send(emp);

    } catch (error) {
        res.status(404).send(error)
    }
}

//update update
export async function updateEmp(req, res){

    const { empId } = req.params;
    const updatedData = req.body;
    
    try {    
        const updatedEmployee = await employee.updateOne({ empId }, updatedData);

        if (updatedEmployee.n === 0) {
        return res.status(404).send({ message: 'Employee not found' });
        }

        res.send({ message: 'Employee updated successfully' })

    } catch (error) {
        return res.status(401).send(error)
    }
}

//delete emp
export async function deleteEmp(req, res) {
    const { empId } = req.params;

    try {
      const deletedEmployee = await employee.deleteOne({empId});
  
      if (!deletedEmployee) {
        return res.status(404).send({ message: 'Employee not found' });
      }
  
      res.send({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }