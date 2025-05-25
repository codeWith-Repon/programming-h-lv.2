-- Active: 1747413686708@@127.0.0.1@5432@ph

-- views are virtual tables genetated from the result of a sql query
-- what is the purpose of SQL views?
-- 1. Simplifying complex queries
-- 2. Improved security
-- 3. Enhanced data abstraction

SELECT * FROM employees;

CREATE View dept_avg_salary
AS
SELECT department_name, avg(salary) FROM employees 
GROUP BY department_name;

SELECT * FROM dept_avg_salary;

DROP VIEW test_view;

CREATE View test_view
AS
SELECT employee_name, salary, department_name
FROM employees
WHERE department_name IN
(SELECT department_name FROM employees WHERE department_name LIKE '%R%');

SELECT * FROM test_view