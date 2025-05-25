-- Active: 1747413686708@@127.0.0.1@5432@ph


-- what is SubQuery: A subquery is a nested query within another sql statement.

DROP TABLE if EXISTS employees ;
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    salary DECIMAL(10, 2),
    hire_date DATE
);

INSERT INTO employees (employee_name, department_name, salary, hire_date) VALUES 
    ('John Doe', 'HR', 60000.00, '2022-01-10'),
    ('Jane Smith', 'Marketing', 75000.50, '2021-05-22'),
    ('Bob Johnson', 'Finance', 80000.75, '2020-11-15'),
    ('Alice Williams', 'IT', 90000.25, '2019-08-03'),
    ('David Lee', 'Sales', 65000.50, '2020-03-18'),
    ('Sara Brown', 'Engineering', 70000.00, '2021-09-28'),
    ('Mike Miller', 'Customer Support', 55000.75, '2022-02-05'),
    ('Emily Davis', 'Administration', 95000.00, '2018-12-12'),
    ('Chris Wilson', 'Research', 72000.50, '2020-06-30'),
    ('Amy White', 'Quality Assurance', 68000.25, '2021-11-09'),
    ('John Johnson', 'HR', 62000.00, '2022-01-15'),
    ('Jessica Thompson', 'Marketing', 78000.50, '2021-06-05'),
    ('Michael Harris', 'Finance', 85000.75, '2020-11-25'),
    ('Emma Martinez', 'IT', 92000.25, '2019-09-15'),
    ('James Taylor', 'Sales', 67000.50, '2020-04-08'),
    ('Sophia Anderson', 'Engineering', 72000.00, '2021-10-10'),
    ('William Jackson', 'Customer Support', 56000.75, '2022-02-10'),
    ('Olivia Nelson', 'Administration', 97000.00, '2018-12-20'),
    ('Daniel White', 'Research', 73000.50, '2020-07-05'),
    ('Ava Wilson', 'Quality Assurance', 69000.25, '2021-11-15'),
    ('Matthew Brown', 'HR', 63000.00, '2022-01-20'),
    ('Emily Garcia', 'Marketing', 76000.50, '2021-06-15'),
    ('Christopher Allen', 'Finance', 86000.75, '2020-12-05'),
    ('Madison Hall', 'IT', 93000.25, '2019-09-25'),
    ('Andrew Cook', 'Sales', 68000.50, '2020-04-18'),
    ('Abigail Torres', 'Engineering', 73000.00, '2021-10-20'),
    ('Ethan Murphy', 'Customer Support', 57000.75, '2022-02-15'),
    ('Ella King', 'Administration', 98000.00, '2018-12-28'),
    ('Nathan Rivera', 'Research', 74000.50, '2020-07-15'),
    ('Mia Roberts', 'Quality Assurance', 70000.25, '2021-11-20');


-- View all employees
SELECT * FROM employees;

-- Retrieve all employees whose salary is greater than the highest salary of the HR department

-- Get the highest salary in the HR department with employee name
SELECT employee_name, salary 
FROM employees
WHERE department_name='HR'
ORDER BY salary DESC
LIMIT 1;

-- Get the highest salary in the HR department
SELECT MAX(salary) AS highest_salary
FROM employees 
WHERE department_name = 'HR';


SELECT * FROM employees
WHERE salary > 63000

-- This query uses a SCALAR SUBQUERY which returns a single value
SELECT * 
FROM employees 
WHERE salary > (
    SELECT MAX(salary) 
    FROM employees 
    WHERE department_name = 'HR'
);


-- what is subQuery?
-- A subquery (also called a nested query or inner query) is a query inside another SQL query. It is used to compute a value or result that the outer query depends on.

-- What is a Scalar Subquery?
-- A scalar subquery is a subquery that returns exactly one value (one row and one column).

-- (SELECT MAX(salary) FROM employees WHERE department_name = 'HR')

-- sub Query
-- Can return a single value
-- Can return multiple rows
-- Can return a single column

SELECT employee_name, salary, department_name
FROM employees
WHERE department_name IN
(SELECT department_name FROM employees WHERE department_name LIKE '%R%');


| Clause                       | Can use Subquery? | Common Use                             |
| ---------------------------- | ----------------- | -------------------------------------- |
| `WHERE`                      | ✅                 | Filter based on single/multiple values |
| `FROM`                       | ✅                 | Create temporary tables (inline views) |
| `SELECT`                     | ✅                 | Add computed values                    |
| `HAVING`                     | ✅                 | Filter grouped data                    |
| `INSERT/UPDATE/DELETE`       | ✅                 | Use to change data conditionally       |
| `IN`, `EXISTS`, `ANY`, `ALL` | ✅                 | Flexible conditional filtering         |

-- In the WHERE clause
SELECT * 
FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);

SELECT employee_name, salary, department_name
FROM employees
WHERE department_name in 
(SELECT department_name FROM employees WHERE department_name LIKE '%R%');

SELECT department_name FROM employees WHERE department_name LIKE '%R%';
-- In the FROM clause

SELECT * FROM --min query/outer query
(SELECT department_name, sum(salary) FROM employees GROUP BY department_name ) --subquery
as sum_dept

SELECT dept_avg.department_name, dept_avg.avg_salary
FROM (
    SELECT department_name, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_name
) AS dept_avg
WHERE dept_avg.avg_salary > 70000;


--  In the SELECT clause
SELECT 
    employee_name, 
    salary, 
    (SELECT AVG(salary) FROM employees) AS avg_salary
FROM employees;

--  In the HAVING clause
SELECT department_name, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_name
HAVING AVG(salary) > (SELECT AVG(salary) FROM employees);

-- In an INSERT, UPDATE, or DELETE statement
UPDATE employees
SET salary = salary * 1.1
WHERE salary < (
    SELECT AVG(salary)
    FROM employees
    WHERE department_name = 'HR'
);

--  Using IN, EXISTS, ANY, ALL with subqueries

SELECT * 
FROM employees 
WHERE department_name IN (
    SELECT department_name 
    FROM employees 
    GROUP BY department_name 
    HAVING COUNT(*) > 3
);

