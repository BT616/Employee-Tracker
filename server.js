const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const mysql = require('mysql2');

//1
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:"", // process.env.MYSQL_PASSWORD
    database:"company_db"
},
console.log('Connect to the the company_db database')
);
//2
connection.connect(err =>{
    if(err) throw err;
    afterConnection()
});
//3
afterConnection =()=>{
    promptUser();
}




//then . 4 
const promptUser = ()=> {
inquirer.prompt([
    {
        type: 'list',
        name: 'choices',
        message: "What would you like to do",
        choices: ["view departments?", "view roles?", "view all employess",""
    ]
    }

])

}


