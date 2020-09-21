USE the_company_DB:

INSERT INTO department(name) VALUES('Production');
INSERT INTO department(name) VALUES('Sales');
INSERT INTO department(name) VALUES('Shipping');

INSERT INTO role (title, salary, department_id) VALUES('Master Distiller', 95000, 1);
INSERT INTO role (title, salary, department_id) VALUES('Production Manager', 125000, 1);
INSERT INTO role (title, salary, department_id) VALUES('Sales Manager', 75000, 2);
INSERT INTO role (title, salary, department_id) VALUES('Clerk', 35000, 2);
INSERT INTO role (title, salary, department_id) VALUES('Warehouse Manager', 82500, 3);
INSERT INTO role (title, salary, department_id) VALUES('Distribution Clerk', 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('Tony', 'Stark', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('Steve', 'Rogers', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('Natasha', 'Romanoff', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('Clint', 'Barton', 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('Bruce', 'Banner', 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('Thor', 'Odinson', 6, NULL);