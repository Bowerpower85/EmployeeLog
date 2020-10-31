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
      name: 'create',
      type: 'list',
      message: 'Create a [Department], a [Role], an [Employee] or [View] the following:',
            choices: ['Department', 'Role', 'Employee', 'View']
        })
        .then(function(promptOptions){
            if (promptOptions.create === 'Department') {
                addDepartment();
            }
            else if(promptOptions.create === 'Role') {
                addRole();
            }
            else if(promptOptions.create === 'Employee') {
                addEmployee();
            }
            else if(promptOptions.create === 'View') {
                viewLog();
            }
            else{
                connection.end();
            }
        });
}

function addRole() {
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What role are you adding?',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary for this role?',
        },
        {
          name: 'departmentId',
          type: 'input',
          message: 'What departmentID belongs to this role?',
        }
      ])
      .then(function(answer) {

        connection.query(
          'INSERT INTO role SET ?',
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
          },
          function(err) {
            if (err) throw err;
            console.log('Role Added!');
            runPrompt();
          }
        );
      });
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          name: 'department',
          type: 'input',
          message: 'What department are you adding?',
        }
      ])
      .then(function(answer) {
        connection.query(
          'INSERT INTO department SET ?',
          {
            name: answer.department
          },
          function(err) {
            if (err) throw err;
            console.log('Your department was added!');
            runPrompt();
          }
        );
      });
  }

  function addEmployee() {
    inquirer
      .prompt([
        {
          name: 'first',
          type: 'input',
          message: 'What is the first name of the employee?',
        },
        {
          name: 'last',
          type: 'input',
          message: 'What is the last name of the employee?',
        },
        {
          name: 'roleId',
          type: 'input',
          message: 'What role Id number does the employee have?'
        },
        {
          name: 'managerId',
          type: 'input',
          message: 'What is the manager ID number for the employee? If none write 0.',
        }
      ])
      .then(function(answer) {
        connection.query(
          'INSERT INTO employee SET ?',
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: answer.roleId,
            manager_id: answer.managerId
          },
          function(err) {
            if (err) throw err;
            console.log('Employee Added!');
            runPrompt();
          }
        );
      });
  }

  function viewLog() {
    inquirer
      .prompt({
        name: 'table',
        type: 'list',
        message: 'What would you like to review?',
        choices: ['Department', 'Role', 'Employee']
      })
      .then(function(answer) {
        if (answer.table === 'Department') {
          viewDepartment();
        }
        else if(answer.table === 'Role') {
          viewRole();
        } 
        else if(answer.table === 'Employee') {
          viewEmployee();
        }
        else{
          connection.end();
        }
      });
  }

  function viewRole() {
    connection.query('SELECT * FROM role', function(err, res) {
      if (err) throw err;
      console.table(res);
      runPrompt();
    })
  };

  function viewDepartment() {
    connection.query('SELECT * FROM department', function(err, res) {
      if (err) throw err;
      console.table(res);
      runPrompt();
    })
  };

  function viewEmployee() {
    connection.query('SELECT * FROM employee', function(err, res) {
      if (err) throw err;
      console.table(res);
      runPrompt();
    })
  }; 
  