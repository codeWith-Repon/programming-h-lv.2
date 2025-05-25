-- Active: 1747413686708@@127.0.0.1@5432@ph

DROP TABLE if EXISTS students;
DROP TYPE if EXISTS student_status;

CREATE TYPE student_status As ENUM('passed', 'failed');

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    roll INT UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    age INT NOT NULL CHECK (age BETWEEN 15 AND 100),
    department VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    status student_status NOT NULL DEFAULT 'passed',
    last_login TIMESTAMP DEFAULT now() 
)

-- Add a column email (VARCHAR) to the existing students table.
ALTER TABLE students
    ADD COLUMN email VARCHAR(255) NOT NULL

-- Rename the column email to student_email.
ALTER TABLE students
    RENAME COLUMN email to user_email;

ALTER TABLE students
    ADD constraint  user_email_unique UNIQUE (user_email);

-- Drop a column from any existing table.
ALTER TABLE students
DROP COLUMN user_email;

INSERT INTO students (roll, name, age, department, score, status)
VALUES
(101, 'Akash Khan', 21, 'CSE', 92, 'passed'),
(102, 'Nodi Akter', 22, 'EEE', 85, 'passed'),
(103, 'Sajid Hossain', 19, 'CSE', 78, 'passed'),
(104, 'Tania Sultana', 23, 'BBA', 88, 'passed'),
(105, 'Mahin Islam', 25, 'CSE', 66, 'failed'),
(106, 'Tanvir Hasan', 20, 'EEE', 81, 'passed'),
(107, 'Rumi Chowdhury', 27, 'BBA', 95, 'passed'),
(108, 'Mishu Rahman', 24, 'CSE', 49, 'failed'),
(109, 'Samiya Zaman', 21, 'CSE', 87, 'passed'),
(110, 'Shakib Rahman', 30, 'EEE', 55, 'failed');


SELECT * FROM students;

-- Write a query to find all students who have a score greater than 80 and not null.
SELECT * FROM students
WHERE score > 80
    AND score IS NOT NULL;

-- Use the NOT operator to exclude students from a specific department.
SELECT * FROM students
WHERE NOT department='CSE'

-- Fetch students whose names start with ‘A’ using LIKE and ILIKE.
SELECT * FROM students
    WHERE name LIKE 'A%'

SELECT * FROM students
    WHERE name ILIKE 'a%'

-- Select all students whose age is between 18 and 25
SELECT * FROM students
    WHERE age BETWEEN 18 AND 25

-- Retrieve rows using IN for a specific set of roll numbers.
SELECT * FROM students
    WHERE roll IN(101,104,109)

-- Count how many students exist in the students table.
SELECT count(*) as total_student FROM students
    
-- Find the average score of students in a specific department.
SELECT * FROM students;

SELECT department, round(AVG(score)) as avg_age FROM students
 GROUP BY department;

--  Get the maximum and minimum age of all students.
SELECT 
    max(age) as max_age,
    min(age) as min_age
FROM students;

-- Update the status of students who scored less than 70 to 'failed'.

SELECT * FROM students
    WHERE score<70;

UPDATE students
SET status = 'failed'
WHERE score < 70

SELECT * FROM students;

-- Delete students who have not logged in since last year.
DELETE FROM students
WHERE last_login < date_trunc('year', CURRENT_DATE)

-- Use LIMIT and OFFSET to fetch the second page of results (5 per page).
SELECT * FROM students
ORDER BY id
LIMIT 5
OFFSET 0

