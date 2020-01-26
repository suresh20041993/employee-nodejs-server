var express = require('express');
var router = express.Router();
var Employee = require('./model');
var constant = require("./constant.js");
router.get('/', function(req, res){
     Employee.getEmployees(function(err,employees){
         if(err) throw err;
         res.json(employees);
     });
 })

router.post('/', function(req, res){

    if (req.body.position===constant.Ceo) {
        req.body.Report_to=constant.Ceo;
    }else if (req.body.position===constant.Cto) {
        req.body.Report_to=constant.Ceo;
    }else if (req.body.position===constant.Manager) {
        req.body.Report_to=constant.Cto;
    }else{
        req.body.Report_to=constant.Manager;
    }

    var newEmployee = {
        Name: req.body.Name,
        Employee_ID:req.body.Employee_ID,
        position : req.body.position,
        dateOfBirth : req.body.dateOfBirth,
        Report_to: req.body.Report_to
    }
     Employee.addEmployee(newEmployee,function(err,employee){
        //  if(err) throw err;
        //  res.json(employee);
         var response = {};
         if (!err) {
             
            response.statusHttp = 200;
            response.statusBool = true;
            response.message = "Updated Sucessfully";
            response.employee=employee;
        }
        else {
            response.statusHttp = 400;
            response.statusBool = false;
            response.message = err;
            response.employee="";
        }
        //console.log(response);
       
        res.json(response);
     });
 })



 router.put('/:_id', function(req, res){
     var update = {
        Name: req.body.Name,
        Employee_ID:req.body.Employee_ID,
        position : req.body.position,
        dateOfBirth : req.body.dateOfBirth,
        Report_to: req.body.Report_to
    }
     Employee.updateEmployee(req.params._id , update, function(err,employee){
         if(err) throw err;
         res.json(employee);
     });
 })

 router.delete('/:_id', function(req, res){
    var response = {};
             
         Employee.getEmployee(req.params._id , function(err,employee){
            if (!err) {  
            if (employee) {
               
                if (employee.position===constant.Cto) {
                    var update = { 
                        Report_to: constant.Ceo
                    }
                    req.params.position= constant.Manager;
    
                    Employee.updatepositionEmployee( req.params, update, function(err,employee1){
                        if (!err) {
                            
                             Employee.deleteEmployee(req.params._id ,  function(err,employee2){
    
                                if (!err) { 
                                    response.statusHttp = 200;
                                    response.statusBool = true;
                                    response.message = "Deleted Sucessfully ";
                                    }else {
                                        response.statusHttp = 4001;
                                        response.statusBool = false;
                                        response.message = err;
                                    }
                                     res.json(response);
                              }); 
                           
                        }else {
                            response.statusHttp = 4002;
                            response.statusBool = false;
                            response.message = err;
                        }                      
                        res.json(response);
                    });
                }else{
                    Employee.deleteEmployee(req.params._id ,  function(err,employee2){
    
                        if (!err) { 
                            response.statusHttp = 200;
                            response.statusBool = true;
                            response.message = "Deleted Sucessfully";
                            }else {
                                response.statusHttp = 4001;
                                response.statusBool = false;
                                response.message = err;
                            }
                             res.json(response);
                      }); 
                }
                
               
            }else{
                response.statusHttp = 4003;
                response.statusBool = false;
                res.json(response);
            } 
           }else{
            response.statusHttp = 4003;
            response.statusBool = false;
            response.message = err;
            res.json(response);
        }
        });
   
   
 })

 router.get('/:_id', function(req, res){
    
     Employee.getEmployee(req.params._id , function(err,employee){
         if(err) throw err;
         res.json(employee);
     });
 })

module.exports = router;