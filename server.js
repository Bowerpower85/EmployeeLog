const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'HappyLittleTrees',
    database: 'the_company_DB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    runPrompt();
});

function runPrompt() {
    inquirer
    .prompt({
      name: "create",
      type: "list",
      message: "Create a [Department], a [Role], an [Employee] or [View] the following:",
            choices: ["Department", "Role", "Employee", "View"]
        })
        .then(function(promptOptions){
            if (promptOptions.create === "Department") {
                addDepartment();
            }
            else if(promptOptions.create === "Role") {
                addRole();
            }
            else if(promptOptions.create === "Employee") {
                addEmployee();
            }
            else if(promptOptions.create === "View") {
                viewData();
            }
            else{
                connection.end();
            }
        });
}

