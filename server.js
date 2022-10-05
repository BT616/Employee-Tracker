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
afterConnect =()=>{
 //promptUser();
}




//then . 4 
const promptUser = ()=> {
inquirer.prompt([
    {
        type: 'list',
        name: 'choices',
        message: "What would you like to do",
        choices: ["View all departments?", "View all roles?", "---add new role?","View all employees","---add new employee?","Quit"]
    },
])
.then((answers) => {
    const { choices } = answers;

if (choices === "View all departments?"){
showdDepartment();
}

if (choices === "View all roles?"){
    showRoles();
}
if(choices === "---add new role?"){
   return addNewRole();
}
if (choices === "View all employees"){
    showEmployees();
}
if (choices === "---add new employee"){
    addNewEmployee();
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
    const sql = `SELECT employee.id as id, department.name as department, employee.first_name as name,last_name, role.title, role_id as role, manager_id as manager from employee inner join role on employee.id = role.id inner join department on department.id = role.department_id`;
    db.query(sql, (err,rows)=>{
        if (err) throw err;
        console.table(rows)
        promptUser();
    });
}; 


function addNewRole(){
    const sql = `select name, id from department` 
    db.query(sql, (err,rows) =>{
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'addTitle',
                message: 'what is your new role/job title? '
            },
            {
            type:'input',
            name: 'salary',
            message:"what is the salary range?"
            },
            {
                type:'list',
                name:'departmentid',
                message:'what department is this role a part of? ',
                choices: rows.map(department=>department.name)

            } 
        ]).then(res =>{
            const chosenDepartment = rows.find(department=>department.name === res.departmentid)
            db.query("insert into role set ?", { title: res.addTitle, salary: res.salary, department_id: chosenDepartment.id})
            showRoles();
        })
    })
}

//salary: res.salary, 

function addNewEmployee(){
    const sql = `select role.id, role.title from role` 
    db.query(sql, (err,rows) =>{
        if (err) throw err;
        inquirer.prompt([
        {
                type: 'input',
                name: 'firstName',
                message: "Input First Name of new Employee",
                
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Input Last Name of new Employee",
                },
                {
                    type: 'input',
                    name: 'rollie',
                    message: "Whats their role?",
                                           
                },
                {
                    type: 'input',
                    name: 'managerID',
                    message: "whats their manager id",
                    },
            
        ])
        .then(res =>{
            
            db.query("insert into employee set ?", { first_name: res.firstName,last_name: res.lastName, role_id ,manager_id })
           

            
            

            
        showEmployees();
})})};
addNewEmployee()