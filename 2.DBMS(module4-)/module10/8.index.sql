-- Active: 1747413686708@@127.0.0.1@5432@ph

-- indexing
-- A database index is a strategically designed data structure that enhances the speed of data retrieval activities in a database table.

DROP Table if EXISTS employee;
DROP TYPE if EXISTS gender;
CREATE TYPE gender as ENUM('F','M');

CREATE Table employee(
    emp_no SERIAL NOT NULL,
    birth_date DATE NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    gender gender NOT NULL,
    hire_date DATE
)
