var mongoose = require('mongoose');
var empSchema = new mongoose.Schema({
    Name: String,
    Employee_ID: Number,
    position : Number,
    dateOfBirth : Date,
    Report_to:Number,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    },
})

// Name
// Employee ID
// Date of Birth
// Created Timestamp
// Updated Timestamp 
var Employee = module.exports = mongoose.model('Employee', empSchema);

module.exports.getEmployees = function(callback){
    Employee.find(callback);
}
module.exports.addEmployee = function(newEmployee, callback){
    Employee.create(newEmployee, callback);
}
module.exports.updateEmployee = function(id, newEmployee, callback){
    Employee.findByIdAndUpdate(id, newEmployee, callback);
}
module.exports.deleteEmployee = function(id, callback){
    Employee.findByIdAndRemove(id, callback);
}
module.exports.getEmployee = function(id, callback){
    Employee.findById(id, callback);
}

module.exports.updatepositionEmployee = function(req, newEmployee, callback){
    console.log(req.position);
    console.log(newEmployee);
    
   // Employee.findByIdAndUpdate({position:3}, newEmployee, callback);
    Employee.update({ position: req.position }, { $set: newEmployee }, callback)
}