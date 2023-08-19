import axiosInstance from './axios-url'

//Rename the axiosInstance As axios
const axios = axiosInstance;

//all Emp
export async function getAllEmp(){
    try {
        const { data } = await axios.get(`/api/employee/`);
        return {data};

    } catch (error) {
        return {error:"Email not matched", status:404}
    }
}

//emp by id
export async function getEmp(empId){
    try {
        const { data } = await axios.get(`/api/employee/${empId}`);
        return {data};

    } catch (error) {
        return {error:"Email not matched", status:404}
    }
}

//create Emp
export async function createEmp(credentials){
    //console.log(credentials)
    try {
        const {data : { msg }, status} = await axios.post(`/api/create`, credentials);

        return Promise.resolve(msg ,status);
        
    } catch (error) {
        return Promise.reject(error)
    }
}

//update Emp
export async function updateEmp(credentials, empId){
    //console.log(credentials)
    try {
        const {data : { msg }, status} = await axios.put(`/api/employee/${empId}`, credentials);

        return Promise.resolve(msg ,status);
        
    } catch (error) {
        return Promise.reject(error)
    }
}

//delete Emp
export async function deleteEmp(empId){

    try {
        
        const { data, status } = await axios.delete(`/api/delete/${empId}`);
        
        return {data, status};
        
    } catch (error) {
        return {error, status: 404}
    }
}