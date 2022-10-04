const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const mysql = require('mysql2');

//1
const db= mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:"", // process.env.MYSQL_PASSWORD
    database:"company_db"
},
console.log('Connect to the the company_db database')
);
//2
db.connect(err =>{
    if(err) throw err;
    afterConnect()
});
//3
afterConnect =()=>{
    promptUser();
}




//then . 4 
const promptUser = ()=> {
inquirer.prompt([
    {
        type: 'list',
        name: 'choices',
        message: "What would you like to do",
        choices: ["View all departments?", "View all roles?", "View all employees","Quit"]
    }
])
.then((answers) => {
    const { choices } = answers;


if (choices === "View all departments?"){
showdDepartment();
}

if (choices === "View all roles?"){
    showRoles();
}
if (choices === "View all employees"){
    showEmployees();
}
if (choices === "Quit"){
 db.end()
}

})
}



showdDepartment =()=>{
const sql = `SELECT department.id AS id, department.name AS department FROM department`;
db.query(sql, (err,rows)=> {
    if (err) throw err;
    console.table(rows);
    promptUser();
});
};

showRoles = () =>{
    const sql = `SELECT role.id as id, role.title as role, role.salary as salary from role`;
    db.query(sql, (err,rows)=>{
        if (err) throw err;
        console.table(rows)
        promptUser();
    });
};

showEmployees = () =>{
    const sql = `SELECT employee.id as id, employee.first_name as name, last_name, role.title , manager_id as manager from employee`;
    db.query(sql, (err,rows)=>{
        if (err) throw err;
        console.table(rows)
        promptUser();
    });
}; 




function addNewEmployee(){

}