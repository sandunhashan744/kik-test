import mongoose from "mongoose";

export const employeeSchema = new mongoose.Schema({
   
    empId : {
        type : Number,
        unique : true
    },
    empName : {
        type : String,
    },
    epf : {
        type : String,
    },
    department : {
        type : String,
    },
    gender : {
        type : String,
    },
    dob : {
        type : String,
    }
});

export default mongoose.model.employee || mongoose.model('employee', employeeSchema)
