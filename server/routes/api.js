const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql');

/***** Create database connection with MySQL *****/
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ngnodedb'
});

/***** Check database connection *****/
connection.connect(function(err) {
    if(err){
    	console.log("Server throws an error: ", err);
    }else{
    	console.log("Connected!");  
    }
});

/***** GET api listing. *****/
router.get('/', (req, res) => {
  res.send('api works');
});

/***** API post method to signup in mysql *****/
router.post('/signup', function(req, res){

    var sqlQuery = "CALL sp_setUser(" 
        + "'" + req.body.firstName + "'" + "," 
        + "'" + req.body.lastName + "'" + "," 
        + "'" + req.body.userName + "'" + "," 
        + "'" + req.body.userPassword + "'" + ");"

    connection.query(sqlQuery, function (err, result) {
        if (err) {
            res.send({
                "res_failed":"Some error occured. Please contact admin."
            })
        } else {
            if (result[0][0].totalRecords === 0) {
                res.send({
                    "status": true,
                    "res_success":"User registered successfully."
                })
            } else {
                res.send({
                    "status": false,
                    "res_error":"User already registered."
                })
            }
        }
    });
});

/***** API post method to authorize *****/
router.post('/login', function(req, res){
    let data = {
        username: req.body.userName,
        password: req.body.hashPassword
    };
    var userQuery = "CALL sp_login(" + "'" + data.username + "'" + "," + "'" + data.password + "'" + ")";
    connection.query(userQuery, function(err, result){
        if(err){
            return res.send({
                "error_msg": "Something went wrong. Please contact admin."
            });
        } else {
            if (result[0][0].resultCount === 1) {
                res.send({
                    "status":true, 
                    "success_msg": "Logged in successfully."
                });
            } else {
                res.send({
                    "status":false, 
                    "error_msg": "Username and Password not match."
                });
            }
        }
    })
});


/***** API post method to insert employee in mysql *****/
router.post('/empadd', function(req, res){

    var sqlQuery = "CALL sp_setEmployee(" 
	    + "'" + req.body.empName + "'" + "," + "'" + req.body.fatherName + "'" + "," 
	    + "'" + req.body.bloodGroup + "'" + "," + "'" + req.body.gender + "'" + "," 
	    + "'" + req.body.empOfficialId + "'" + "," + req.body.empContactNo + ","
	    + "'" + req.body.empDepartment + "'" + "," + "'" + req.body.empDesignation + "'" + ","
	    + "'" + req.body.empResAddress + "'" 
	+ ");"

    connection.query(sqlQuery, function (err, result) {
        if (err) {
            res.send({
                "res_failed":"Some error occured. Please contact admin."
            })
        } else {
            if (result[0][0].totalResults === 0) {
                res.send({
                    "status": true,
                    "res_success":"Employee registered successfully."
                })
            } else {
                res.send({
                    "status": false,
                    "res_error":"Employee official Id already registered."
                })
            }
        }
    });
});

/***** API method to get list of employees *****/
router.get('/empdata/page=:Page/page_size=:PageSize', function(req,res){
    var page = req.params.Page;
    var pageSize = req.params.PageSize;

    var getEmpQuery = "CALL sp_getEmployees("+ page +","+ pageSize +")";

    connection.query(getEmpQuery, function(err, result){
        if(err) throw err;
        res.json(result);
    });
});

/***** API method to delete employee record by their official Id *****/
router.delete('/empdelete/:empId', function(req,res){
    var empId = req.params.empId;
    var sqlDelQuery = "CALL sp_deleteEmployee(" + empId + ")";

    connection.query(sqlDelQuery, function(err, result){
        if(err) throw err;
        res.json(result);
    });
});

/***** API method to update employee record by their Id *****/
router.put('/empupdate', function(req,res){

    var sqlUpdateQuery = "CALL sp_updateEmployee(" 
                        + req.body.Id + "," 
                        + "'" + req.body.EmpName + "'" + "," 
                        + "'" + req.body.FatherName + "'" + "," 
                        + "'" + req.body.BloodGroup + "'" + "," 
                        + "'" + req.body.Gender + "'" + "," 
                        + "'" + req.body.EmpOfficialId + "'" + ","
                        + req.body.EmpContactNo + "," 
                        + "'" + req.body.EmpDepartment + "'" + ","
                        + "'" + req.body.EmpDesignation + "'" + ","
                        + "'" + req.body.EmpResAddress + "'" + ")";

    connection.query(sqlUpdateQuery, function(err, result){
        if(err) throw err;
        res.json(result);
    });
    
});

module.exports = router;