const inquirer = require('inquirer');
const db = require('./db/queries');

async function mainMenu() {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role'
    ],
  });

  switch (action) {
    case 'View all departments':
      const departments = await db.getDepartments();
      console.table(departments.rows);
      break;
    case 'View all roles':
      const roles = await db.getRoles();
      console.table(roles.rows);
      break;
    case 'View all employees':
      const employees = await db.getEmployees();
      console.table(employees.rows);
      break;
    case 'Add a department':
      const { deptName } = await inquirer.prompt({
        type: 'input',
        name: 'deptName',
        message: 'Enter the name of the department:',
      });
      await db.addDepartment(deptName);
      console.log('Department added!');
      break;
    case 'Add a role':
      const { title, salary, deptId } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the salary:' },
        { type: 'input', name: 'deptId', message: 'Enter the department ID:' },
      ]);
      await db.addRole(title, salary, deptId);
      console.log('Role added!');
      break;
    case 'Add an employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter the employee\'s first name:' },
        { type: 'input', name: 'lastName', message: 'Enter the employee\'s last name:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID:' },
        { type: 'input', name: 'managerId', message: 'Enter the manager ID (optional):', default: null },
      ]);
      await db.addEmployee(firstName, lastName, roleId, managerId);
      console.log('Employee added!');
      break;
    case 'Update an employee role':
      const { employeeId, newRoleId } = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter the employee ID:' },
        { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' },
      ]);
      await db.updateEmployeeRole(employeeId, newRoleId);
      console.log('Employee role updated!');
      break;
  }
}

mainMenu();
