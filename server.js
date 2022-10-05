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
    const sql = `SELECT employee.id as id, department.name as department, employee.first_name as name, role.title, role_id as role, last_name, manager_id as manager from employee inner join role on employee.id = role.id inner join department on department.id = role.department_id`;
    db.query(sql, (err,rows)=>{
        if (err) throw err;
        console.table(rows)
        promptUser();
    });
}; 


function addNewRole(){
    const sql = `select * from department` 
    db.query(sql, (err,rows) =>{
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'addTitle',
                message: 'do you want add new role'
            },{
                type:'list',
                name:'departmentid',
                message:'what department is this role a part of? ',
                choices: rows.map(department=>department.name)

            }
        ]).then(res =>{
            const chosenDepartment = rows.find(department=>department.name === res.departmentid)
            db.query("insert into role set ?", { title: res.addTitle, department_id: chosenDepartment.id})

        })
    })
}
//addNewRole();





function addNewEmployee(){
    const promptUser = ()=> {
        inquirer.prompt([
            {
                type: 'input',
                name: 'choices',
                message: "Name of new Employee",
                
            }
        ])
        .then((answers) => {
            const { choices } = answers;
        
})}
addNewEmployee();
showEmployees();
};