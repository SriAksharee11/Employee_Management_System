const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    f_Id: {
        type: Number,
        // required: true,
        //unique: true
    },
    f_Name: {
        type: String,
        required: true
    },
    f_Email: {
        type: String,
        required: true,
        unique: true
    },
    f_Mobile: {
        type: String,  
        // required: true
    },
    f_Designation: {
        type: String,  
        enum: ['HR', 'Manager', 'Sales'],  
        // required: true
    },
    f_Gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    f_Course: {
        type: [String],
        enum: ['MCA', 'BCA', 'BSC'],
        // required: true
    },
    f_CreateDate: {
        type: Date,
        default: Date.now,  
        // required: true
    }
});


const EmployeeModel = mongoose.model('t_employee', EmployeeSchema);
module.exports = EmployeeModel;


