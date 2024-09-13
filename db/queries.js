const client = require('./connection');

async function getDepartments() {
  return client.query('SELECT * FROM department');
}

async function getRoles() {
  return client.query('SELECT * FROM role');
}

async function getEmployees() {
  return client.query('SELECT * FROM employee');
}

async function addDepartment(name) {
  return client.query('INSERT INTO department (name) VALUES ($1)', [name]);
}

async function addRole(title, salary, departmentId) {
  return client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
}

async function addEmployee(firstName, lastName, roleId, managerId) {
  return client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
}

async function updateEmployeeRole(employeeId, newRoleId) {
  return client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
}

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
