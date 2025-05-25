-- Active: 1747413686708@@127.0.0.1@5432@ph
CREATE TABLE employees(
    emp_id INT,
    emp_name VARCHAR(50),
    dept_id INT
);

CREATE TABLE departments (
    dept_id INT,
    dept_name VARCHAR(50)
);

INSERT INTO employees VALUES(1, 'john doe', 101);
INSERT INTO employees VALUES(2, 'Jane Smith', 102)

SELECT * FROM employees;

INSERT INTO departments VALUES(101, 'Human Reacherch');
INSERT INTO departments VALUES(102, 'Marketing');

SELECT * FROM departments;

-- ===================
-- cross join
-- ===================

SELECT * FROM employees
    CROSS JOIN departments;


-- ===================
-- natural join
-- ===================.

SELECT * FROM employees
    NATURAL JOIN departments;

